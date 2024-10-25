"use client";
import React from "react";
import { CustomModal } from "@/components/modal/modal";
import { createCartStore } from "@/stores/cart";
import OrderSummary from "./order-summary";

export default function WebModal() {
  const { openWebModal, setOpenWebModal } = createCartStore();
  return (
    <CustomModal
      open={openWebModal}
      okText="Start New Order"
      handleCancel={() => setOpenWebModal(false)}
    >
      <OrderSummary />
    </CustomModal>
  );
}
