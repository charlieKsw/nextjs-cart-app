"use client";
import React from "react";
import MobileModal from "@/components/modal/mobile-modal";
import WebModal from "@/components/modal/web-modal";
import { createCartStore } from "@/stores/cart";

export default function OrderConfirmaModal() {
  const { isMobile } = createCartStore();
  if (!isMobile) return <WebModal />;
  return <MobileModal />;
}
