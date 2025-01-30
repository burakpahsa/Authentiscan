import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import {
  Plus,
  AlertCircle,
  Loader2,
  CheckCircle,
  XCircle,
  Flag,
} from "lucide-react";
import { AddProduct } from "./AddProduct";

export const AdminPanel: React.FC = () => {
  const {
    authenticProducts,
    scans,
    fetchProducts,
    fetchScans,
    isLoading,
    error,
  } = useAuthStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchScans();
  }, [fetchProducts, fetchScans]);

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Product Authentication Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and verify authentic products
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {showForm && (
         <AddProduct setShowForm={setShowForm}/>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <div>
                <p className="text-sm text-red-700">Error loading products</p>
                <p className="text-xs text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
        {authenticProducts.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No products added yet
            </h3>
            <p className="text-gray-600 mt-1">
              Add your first product to start managing authentications
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {authenticProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: product.description }}
                      className="text-gray-600 text-sm mb-2"
                    />
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">
                        QR Code:
                      </span>{" "}
                      <code
                        className="bg-gray-100 px-2 py-1 rounded"
                        style={{ wordBreak: "break-word" }}
                      >
                        {product.qrCode}
                      </code>
                    </div>
                    {product.isFlagged && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 20,
                        }}
                      >
                        <Flag className="w-5 h-5 text-red-500" />
                        <p className="text-red-500">3+ Unique Scans</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Scan Log</h1>
            <p className="text-gray-600 mt-1">View latest 10 scans</p>
          </div>
        </div>
        <div className="grid gap-4">
          {scans.map((scanLog) => {
            const time = new Date(scanLog.timestamp);
            return (
              <div
                key={scanLog.id}
                className={`${
                  scanLog.isVerified ? "bg-green-50" : "bg-red-50"
                } p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
              >
                <div style={{ display: "flex", gap: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      gap: 10,
                    }}
                  >
                    <div
                      className="flex"
                      style={{ alignItems: "center", gap: 10 }}
                    >
                      {scanLog.isVerified ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-500" />
                      )}
                      <p> {scanLog.id}</p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <p style={{ fontWeight: 600 }}>IP Address: </p>
                      <p>{scanLog.ipAddress}</p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <p style={{ fontWeight: 600 }}>QR Code: </p>
                      <p
                        style={{
                          wordBreak: "break-word",
                          flex: 1,
                          marginRight: 20,
                        }}
                      >
                        {scanLog.qrCode}
                      </p>
                    </div>
                    <p style={{ marginTop: 10, alignSelf: "flex-end" }}>
                      {time.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
