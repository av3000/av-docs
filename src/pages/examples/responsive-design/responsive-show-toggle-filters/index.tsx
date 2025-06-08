import React from "react";
import Layout from "@theme/Layout";
import FiltersList from "./FiltersList";

export default function BasketPage() {
  return (
    <Layout
      title="Filters list demo"
      description="Responsive filters list demonstration"
    >
      <FiltersList />
    </Layout>
  );
}
