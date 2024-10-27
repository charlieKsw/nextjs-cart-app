"use client";
import React from "react";
import { createCartStore } from "@/stores/cart";
import ImageContainer from "../image";
import OrderTotals from "./order-total";
import Discount from "./discount";

export default function FullCarts() {
  const { carts, appliedDiscountCodes } = createCartStore();
  return (
    <div className="mt-m px-m pb-xs bg-[#FBF7F4] rounded-s">
      <div className="max-h-[175px] overflow-y-auto scrollbar-hide">
        {Object.keys(carts).length > 0 &&
          Object.values(carts).map((cart, key) => (
            <div
              key={key}
              className="flex justify-between py-m border border-t-transparent border-l-transparent border-r-transparent"
            >
              <div className="flex flex-1 items-center">
                <ImageContainer
                  className="rounded-s"
                  src={cart.image.thumbnail}
                  alt={cart.name}
                  width={45}
                  height={45}
                />
                <div className="flex-1 ml-s">
                  <p className="label !text-[#716A67]">{cart.name}</p>
                  {/* Quantity */}
                  <div className="flex items-center">
                    <p className="txt text-warmBrown">
                      {cart.qty > 0 && cart.qty}x
                    </p>
                    <div className="ml-[15px] flex items-center">
                      <p className="text-xs font-light text-warmBrown">@</p>
                      <p className="ml-[3px] text-xxs text-[#bbb2ae]">
                        ${cart.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <p className="title text-right">${cart.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
      </div>

      {appliedDiscountCodes.length > 0 && (
        <div className="pt-s pb-s w-full border border-t-transparent border-l-transparent border-r-transparent">
          <Discount showApplyDiscount={false} allowEdit={false} />
        </div>
      )}
      <div className="mt-xs">
        <OrderTotals smallTitle={true} />
      </div>
    </div>
  );
}
