"use client";
import React from "react";
import ImageContainer from "../image";
import { createCartStore, ICart } from "@/stores/cart";

interface ICartItem {
  cart: ICart;
}

export default function CartItem(props: ICartItem) {
  const { cart } = props;
  const { removeProductFromCart } = createCartStore();

  return (
    <div className="mt-[15px] flex items-center border border-t-transparent border-l-transparent border-r-transparent">
      <div className="flex-1">
        <p className="label !text-[#716A67]">{cart.name}</p>

        {/* Quantity & Total */}
        <div className="flex pt-s py-s justify-start items-start w-[100%] md:w-[30%]">
          <p className="txt text-warmBrown">{cart.qty > 0 && cart.qty}x</p>
          <p className="label ml-[15px]">@{cart.price}</p>
          <p className="label ml-xxs">${cart.price * cart.qty}</p>
        </div>
      </div>

      <ImageContainer
        className="cursor-pointer"
        src="/assets/delete.png"
        alt="delete-icon"
        onClickFunc={() => removeProductFromCart(cart.id)}
      />
    </div>
  );
}
