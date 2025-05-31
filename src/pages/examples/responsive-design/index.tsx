import React from "react";
import Layout from "@theme/Layout";
import ProductList from "@site/src/pages/examples/responsive-design/responsive-product-list/ProductList";

export default function ResponsiveDesignExamplesPage() {
  return (
    <Layout
      title="Product List Demo"
      description="Responsive product grid demonstration"
    >
      <ProductList />
    </Layout>
  );
}
