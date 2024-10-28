"use client";
import { createCartStore } from "@/stores/cart";
import React from "react";
import { CustomButton } from "../button";
import ImageContainer from "../image";

interface IDiscount {
  showApplyDiscount?: boolean;
  allowEdit?: boolean;
}

export default function Discount(props: IDiscount) {
  const { showApplyDiscount = true, allowEdit = true } = props;
  const {
    discountCode,
    setDiscountCode,
    addDiscountCode,
    appliedDiscountCodes,
    removeDiscountCode,
  } = createCartStore();

  return (
    <>
      {showApplyDiscount && (
        <div className="flex flex-row items-center mt-m mb-s">
          <input
            className="border flex flex-1 border-secondary rounded-s px-xs py-xxs text-darkBrown focus-visible:outline-primary"
            value={discountCode}
            placeholder="Enter discount code"
            onChange={(e) => setDiscountCode(e.target.value)}
          />

          <CustomButton
            buttonText="Apply"
            fullWidth={false}
            disabled={discountCode === ""}
            customStyle="p-0 !h-[32px] ml-s h-[35px] w-[32%] !rounded-none"
            onClickFunc={addDiscountCode}
          />
        </div>
      )}

      {appliedDiscountCodes.length > 0 && (
        <div className="flex flex-col">
          <p className="text-xxs text-darkBrown">Applied Code</p>
          <div className="flex flex-wrap gap-4 mt-s">
            {appliedDiscountCodes.map((code, index) => {
              return (
                <div
                  key={`${index}-applied-discount-code`}
                  className="flex flex-row items-center border py-s p-s w-fit rounded-m bg-primary cursor-default"
                >
                  <ImageContainer
                    src="/assets/label_white.png"
                    alt="label-icon"
                  />
                  <p className="text-white text-xxs mx-xs">{code}</p>

                  {allowEdit && (
                    <div className="ml-xs">
                      <ImageContainer
                        className="cursor-pointer"
                        src="/assets/delete_white.png"
                        alt="delete-icon"
                        onClickFunc={() => removeDiscountCode(index)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
