"use client";
import React from "react";
import ImageContainer from "../image";

export default function EmptyList() {
  return (
    <div className="flex flex-col items-center">
      <ImageContainer
        src="/assets/empty_list.png"
        width={120}
        height={120}
        alt="empty-list-icon"
      />
      <p className="mt-s">
        No products are available at the moment. Please check back later.
      </p>
    </div>
  );
}
