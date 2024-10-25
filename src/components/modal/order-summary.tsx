"use client";
import React from "react";
import ImageContainer from "../image";
import FullCarts from "../cart/full-carts";
import { CustomButton } from "../button";
import { createCartStore } from "@/stores/cart";

export default function OrderSummary() {
  const { isLoadingOrder, createOrder } = createCartStore();
  return (
    <div>
      <ImageContainer
        className="mt-s"
        src="/assets/success.png"
        height={30}
        width={30}
        alt="success-icon"
      />
      <p className="mt-m modalTitle w-[50%] md:w-[100%] leading-tight">
        Order Confirmed
      </p>
      <p className="label mt-xs">We hope you enjoy your food!</p>

      {/* Full Carts */}
      <FullCarts />

      <div className="mt-l mb-s">
        <CustomButton
          buttonText="Start New Order"
          onClickFunc={createOrder}
          isLoading={isLoadingOrder}
        />
      </div>
    </div>
  );
}
