"use client";
import React, { useCallback } from "react";
import CartItem from "./cart-item";
import { createCartStore } from "@/stores/cart";
import ImageContainer from "../image";
import OrderTotals from "./order-total";
import Discount from "./discount";
import { CustomButton } from "../button";

export default function Carts() {
  const { carts, isMobile, setOpenWebModal, setOpenMobileModal } =
    createCartStore();

  const handleConfirmOrder = useCallback(() => {
    if (!carts) return;

    if (!isMobile) {
      setOpenWebModal(true);
      return;
    } else {
      setOpenMobileModal(true);
    }
  }, [carts, isMobile, setOpenWebModal, setOpenMobileModal]);

  return (
    <>
      <h2>{`Your Cart (${Object.keys(carts).length})`}</h2>
      {/* Empty Cart */}
      {Object.keys(carts).length === 0 && (
        <div className="mt-l flex flex-col items-center">
          <ImageContainer
            src="/assets/empty.png"
            height={100}
            width={120}
            alt="empty-cart-icon"
          />
          <p className="pt-l text-xs text-[#988A87]">
            Your added items will appear here
          </p>
        </div>
      )}

      <div className="mt-s overflow-y-auto max-h-[300px] scrollbar-hide">
        {Object.keys(carts).length > 0 &&
          Object.values(carts).map((cart, key) => (
            <div key={key}>
              <CartItem cart={cart} />
            </div>
          ))}
      </div>

      <div className="mt-l">
        <OrderTotals />
      </div>

      {/* Message & Confirm Button */}
      {Object.keys(carts).length > 0 && (
        <>
          <div className="mt-l flex justify-center items-center bg-grayBg">
            <ImageContainer src="/assets/tree.png" alt="tree-icon" />
            <div className="ml-xs py-xs">
              <p className="txt">
                This is a
                <span className="text-[#837975] px-[3px]">carbon-neutral</span>
                delivery
              </p>
            </div>
          </div>

          <div className="mt-s w-full">
            <Discount />
          </div>

          <div className="mt-l">
            <CustomButton
              buttonText="Confirm Order"
              onClickFunc={handleConfirmOrder}
            />
          </div>
        </>
      )}
    </>
  );
}
