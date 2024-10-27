import { create } from "zustand";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import { apiKey } from "../config";
import { setHeader } from "./api";

interface IProductImg {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface IProduct {
  id: string;
  image: IProductImg;
  name: string;
  price: number;
  category: string;
}

export interface ICart {
  id: string;
  image: any;
  name: string;
  price: number;
  qty: number;
}

interface CartState {
  products: IProduct[];
  carts: { [key: string]: ICart };
  //Discount Code
  discountCode: string;
  appliedDiscountCodes: string[];
  setDiscountCode: (discountCode: string) => void;
  addDiscountCode: (discountCode: string) => void;
  removeDiscountCode: (index: number) => void;
  addToCart: (product: IProduct) => void;
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
  // Modal
  openWebModal: boolean;
  setOpenWebModal: (value: boolean) => void;
  openMobileModal: boolean;
  setOpenMobileModal: (value: boolean) => void;
  // Loading
  isLoadingOrder: boolean;
  setIsLoadingOrder: (value: boolean) => void;
  isLoadingProduct: boolean;
  setIsLoadingProduct: (value: boolean) => void;
  // Carts Func
  getTotalAmount: () => number;
  getSavedAmount: () => number;
  incrementQty: (id: string) => void;
  decrementQty: (id: string) => void;
  removeProductFromCart: (id: string) => void;
  // Api
  getProducts: () => void;
  createOrder: () => void;
}

const validDiscountCode = ["HAPPYHOURS", "BUYGETONE"];

export const createCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      carts: {},
      isMobile: false,
      discountCode: "",
      appliedDiscountCodes: [],
      addDiscountCode: () => {
        const { appliedDiscountCodes, discountCode } = get();
        const trimCodeSpace = discountCode.trim();

        if (!validDiscountCode.includes(trimCodeSpace)) {
          toast.error("invalid discount code");
          return;
        }

        if (
          appliedDiscountCodes.findIndex((code) => trimCodeSpace === code) > -1
        ) {
          toast.warn("discount code have already applied");
          return;
        }

        appliedDiscountCodes.push(trimCodeSpace);

        set({
          appliedDiscountCodes,
        });

        // Clear input
        set({ discountCode: "" });
      },
      removeDiscountCode: (index: number) => {
        if (index < 0) {
          toast.error("discount code index not found");
          return;
        }

        const { appliedDiscountCodes } = get();

        // Remove the discount code by index
        appliedDiscountCodes.splice(index, 1);

        set({
          appliedDiscountCodes,
        });
      },

      setDiscountCode: (discountCode: string) => set({ discountCode }),
      setIsMobile: (isMobile) => {
        set({ isMobile });
      },
      openWebModal: false,
      setOpenWebModal: (openWebModal: boolean) => {
        set({ openWebModal });
      },
      openMobileModal: false,
      setOpenMobileModal: (openMobileModal: boolean) => {
        set({ openMobileModal });
      },
      isLoadingOrder: false,
      setIsLoadingOrder: (isLoadingOrder: boolean) => {
        set({ isLoadingOrder });
      },
      isLoadingProduct: true,
      setIsLoadingProduct: (isLoadingProduct: boolean) => {
        set({ isLoadingProduct });
      },
      addToCart: (product: IProduct) => {
        const { carts } = get();
        if (carts[product.id]) return;

        carts[product.id] = {
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          qty: 1,
        };

        set({ carts: { ...carts } });
      },
      getTotalAmount: () => {
        const { carts, appliedDiscountCodes } = get();

        let total = Object.values(carts).reduce((total, cart) => {
          return total + cart.price * cart.qty;
        }, 0);

        if (appliedDiscountCodes.includes("HAPPYHOURS")) {
          total = total * 0.82; // Apply 18% discount
        }

        if (appliedDiscountCodes.includes("BUYGETONE")) {
          // Free lowest price item
          const lowestPricedItem = Math.min(
            ...Object.values(carts).map((cart) => cart.price)
          );

          total = total - lowestPricedItem;
        }

        if (total <= 0) return 0;

        return parseFloat(total.toFixed(2));
      },

      getSavedAmount: () => {
        const { carts, getTotalAmount } = get();

        const originalTotal = Object.values(carts).reduce((total, cart) => {
          return total + cart.price * cart.qty;
        }, 0);

        // Calculate the saved amount
        const savedAmount = originalTotal - getTotalAmount();

        return parseFloat(savedAmount.toFixed(2));
      },

      incrementQty: (id: string) => {
        const { carts } = get();
        const cartItem = carts[id];

        if (cartItem) {
          set({
            carts: {
              ...carts,
              [id]: {
                ...cartItem,
                qty: cartItem.qty + 1,
              },
            },
          });
        }
      },

      decrementQty: (id: string) => {
        const { carts } = get();
        const cartItem = carts[id];
        if (cartItem && cartItem.qty > 1) {
          set({
            carts: {
              ...carts,
              [id]: {
                ...cartItem,
                qty: cartItem.qty - 1,
              },
            },
          });
        } else if (cartItem && cartItem.qty === 1) {
          const updatedCarts = { ...carts };
          delete updatedCarts[id]; // Remove item if qty reaches 0
          set({ carts: updatedCarts });
        }
      },
      removeProductFromCart: (id: string) => {
        const { carts } = get();

        if (carts[id]) {
          delete carts[id];
        }

        set({
          carts,
        });
      },

      getProducts: async () => {
        try {
          const response = await axios.get("/api/product");

          set({ isLoadingProduct: false });

          if (response.data && response.data.length > 0) {
            set({ products: response.data });
          }
        } catch (e) {
          set({ isLoadingProduct: false });
          toast.error("failed to get product list");
        }
      },

      createOrder: async () => {
        try {
          if (!apiKey) {
            toast.warn("apikey not found");
            return;
          }
          set({ isLoadingOrder: true });
          const { carts, isMobile } = get();

          if (!carts) return;

          const formateData = (carts: { [key: string]: ICart }) => {
            const items = Object.values(carts).map((cartItem) => ({
              productId: cartItem.id,
              quantity: cartItem.qty,
            }));

            const data = {
              items,
            };

            return data;
          };

          const body = formateData(carts);
          const response = await axios.post(
            `/api/order`,
            {
              ...body,
            },
            {
              ...setHeader(apiKey),
            }
          );
          set({ isLoadingOrder: false });

          if (response.data) {
            if (!response.data.id) {
              const message =
                response.data?.message || "failed to create order";
              toast.error(message);
              return;
            }

            toast.success("order created successfully");

            // Empty cart and remove storage
            set({ carts: {} });

            // Remove Discount code
            set({ appliedDiscountCodes: [] });

            // Close Modal
            if (!isMobile) {
              set({ openWebModal: false });
            }
            set({ openMobileModal: false });
          }
        } catch (e) {
          set({ isLoadingOrder: false });
          toast.error("failed to create order");
        }
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        carts: state.carts,
        appliedDiscountCodes: state.appliedDiscountCodes,
      }),
    }
  )
);
