"use client";
import { createCartStore } from "@/stores/cart";
import React from "react";

interface IOrderTotals {
  smallTitle?: boolean;
}

export default function OrderTotals(props: IOrderTotals) {
  const { smallTitle = false } = props;
  const { carts, getTotalAmount, getSavedAmount, appliedDiscountCodes } =
    createCartStore();

  const originalTotal = getSavedAmount() + getTotalAmount();

  return (
    Object.keys(carts).length > 0 && (
      <div className="flex justify-between items-center">
        <p className={`${smallTitle ? "label" : ""} text-[#928D8B]`}>
          Order Total
          {appliedDiscountCodes.length > 0 && (
            <>
              <span className="px-[4px] text-primary text-xxs">
                (saved ${getSavedAmount().toFixed(2)})
              </span>
              <span className="text-[8px] text-secondary line-through">
                ${originalTotal.toFixed(2)}
              </span>
            </>
          )}
        </p>
        <p className="total">${getTotalAmount().toFixed(2)}</p>
      </div>
    )
  );
}
