import React from "react";
import Layout from "@theme/Layout";
import ShoppingBasket from "./Basket";

export default function BasketPage() {
  return (
    <Layout
      title="Product List Demo"
      description="Responsive product grid demonstration"
    >
      <ShoppingBasket />
    </Layout>
  );
}
