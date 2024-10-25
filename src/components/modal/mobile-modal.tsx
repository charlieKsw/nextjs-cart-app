"use client";
import { BottomModal } from "@/components/modal/bottom-modal";
import { createCartStore } from "@/stores/cart";
import React from "react";
import OrderSummary from "./order-summary";

export default function MobileModal() {
  const { openMobileModal, setOpenMobileModal } = createCartStore();

  return (
    <BottomModal
      setOpen={setOpenMobileModal}
      open={openMobileModal}
      onCloseAction={() => setOpenMobileModal(false)}
    >
      <div className="px-m py-m">
        <OrderSummary />
      </div>
    </BottomModal>
  );
}
