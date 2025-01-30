import React from "react";
import { ManageProducts } from "./ManageProducts";
import { ScanLog } from "./ScanLog";

export const AdminPanel: React.FC = () => {

  return (
    <>
      <ManageProducts />
      <ScanLog />
    </>
  );
};
