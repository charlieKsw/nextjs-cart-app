"use client";
import React, { useEffect, useState } from "react";
import { Container } from "@components/container";
import { createCartStore } from "@/stores/cart";
import Carts from "@/components/cart/carts";
import Products from "@/components/product/products";
import OrderConfirmModal from "../components/modal/order-confirm-modal";
import EmptyCart from "@/components/cart/empty-cart";
import { headers } from "next/headers";

function Home() {
  const { products, setIsMobile } = createCartStore();
  const [newProducts, setNewProducts] = useState([]);
  const [iframeSize, setIframeSize] = useState({ width: 395, height: 103 }); // Default size

  //TODO add redirect url params and add the existing cart (hard code require itemsObject e.g. product_name)
  // Varies from client
  const numberOfPeople = 3;
  const storeId = "food-store-001";

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

  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      // Verify the origin for security
      if (event.origin !== "http://localhost:3001") return;

      console.log("Received message:", event.data); // For debugging

      if (event.data?.type === "UPDATE_PRODUCTS") {
        setNewProducts(event.data.products);
      }

      if (event.data?.dimensions) {
        setIframeSize({
          width: event.data.dimensions.width,
          height: event.data.dimensions.height,
        });
      }
    };

    window.addEventListener("message", handleIframeMessage);
    return () => window.removeEventListener("message", handleIframeMessage);
  }, [setNewProducts]);

  useEffect(() => {
    // Notify iframe of product updates
    const iframe = document.querySelector("iframe");
    iframe?.contentWindow?.postMessage(
      { type: "UPDATE_PRODUCTS", products },
      "http://localhost:3001/sign-up/?number_of_people=3&store_id=abcd"
    );
  }, [products]);

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

      <div className="fixed bottom-4 right-4 z-50">
        <iframe
          src="http://localhost:3001/?number_of_people=6&store_id=1323123"
          className="rounded-[14px]"
          loading="lazy"
          sandbox="allow-same-origin allow-scripts"
          style={{
            width: `${iframeSize.width}px`,
            height: `${iframeSize.height}px`,
            border: "none",
          }}
        />
      </div>

      {/* Confirmation Modal */}
      <OrderConfirmModal />
    </Container>
  );
}
export default Home;
