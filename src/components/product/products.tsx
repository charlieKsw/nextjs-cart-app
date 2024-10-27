"use client";
import React, { useEffect } from "react";
import ProductItem from "./product-item";
import { LoadingIcon } from "../loading-icon";
import { createCartStore } from "@/stores/cart";
import ImageContainer from "../image";
import EmptyList from "./empty-list";

export default function Products() {
  const { products, getProducts, isLoadingProduct } = createCartStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      {isLoadingProduct && (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <LoadingIcon size="50" color="#EAB096" />
        </div>
      )}

      {!isLoadingProduct && products.length === 0 && (
        <div className="flex flex-col justify-center w-full m-l">
          <EmptyList />
        </div>
      )}

      {!isLoadingProduct && (
        <div className="mt-l grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product.id}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
