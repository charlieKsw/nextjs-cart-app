"use client";
import React, { useEffect } from "react";
import { Container } from "@components/container";
import { createCartStore } from "@/stores/cart";
import Carts from "@/components/cart/carts";
import Products from "@/components/product/products";
import OrderConfirmModal from "../components/modal/order-confirm-modal";
import EmptyCart from "@/components/cart/empty-cart";

function Home() {
  const { products, setIsMobile } = createCartStore();

  // Detect Mobile or web mode
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window?.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <div className="lg:flex xl:flex flex-none lg:flex-nowrap flex-wrap">
        <div className="flex flex-[0.7] flex-col">
          <h1>Dessert</h1>
          {/* Product Section */}
          <Products />
        </div>

        {/* Carts Section */}
        <div className="flex flex-col flex-[0.3] h-fit lg:w-[385px] xl:w-[385px] w-auto bg-white px-m py-l">
          {products.length > 0 ? <Carts /> : <EmptyCart />}
        </div>
      </div>

      {/* Confirmation Modal */}
      <OrderConfirmModal />
    </Container>
  );
}
export default Home;
