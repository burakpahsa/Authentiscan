import React from "react";
import { Routes, Route } from "react-router-dom";
import { ManageProducts } from "./ManageProducts";
import { ScanLog } from "./ScanLog";
import { AdminTabs } from "./AdminTabs";
import { CodeTokenGenerator } from "./CodeTokenGenerator";

export const AdminPanel: React.FC = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto mb-5 px-4">
        <AdminTabs />
      </div>
      <Routes>
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/scan-log" element={<ScanLog />} />
        <Route path="/code-generator" element={<CodeTokenGenerator />} />
      </Routes>
    </>
  );
};
