"use client";
import React from "react";
import { CustomButton } from "../button";

export default function EmptyCart() {
  const handleRefresh = () => window.location.reload();
  return (
    <div className="flex flex-col w-full h-[300px]">
      <h2>Your Cart</h2>

      <div className="flex flex-col justify-center items-center h-full">
        <p className="block">No products available to add to the cart.</p>
        <div className="w-full mt-l">
          <CustomButton
            buttonText="Refresh"
            onClickFunc={() => handleRefresh()}
          />
        </div>
      </div>
    </div>
  );
}
