import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { Product } from "../../types";
import {
  Plus,
  Package,
  AlertCircle,
  QrCode,
  Loader2,
  CheckCircle,
  XCircle,
  Flag,
} from "lucide-react";
import { AdminQRScanner } from "./AdminQRScanner";
import { useCamera } from "../../hooks/useCamera";

export const AdminPanel: React.FC = () => {
  const {
    authenticProducts,
    scans,
    addProduct,
    fetchProducts,
    fetchScans,
    isLoading,
    error,
  } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  // const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetchProducts();
    fetchScans();
  }, [fetchProducts, fetchScans]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.qrCode) {
      addProduct({
        name: newProduct.name,
        description: newProduct.description || "",
        manufacturer: newProduct.manufacturer || "",
        manufactureDate:
          newProduct.manufactureDate || new Date().toISOString().split("T")[0],
        qrCode: newProduct.qrCode,
        imageUrl:
          newProduct.imageUrl ||
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        bestBefore:
          newProduct.bestBefore || new Date().toISOString().split("T")[0],
        isFlagged: false,
      });
      setNewProduct({});
      setShowForm(false);
    }
  };

  // const handleDelete = (id: string) => {
  //   removeProduct(id);
  //   setShowConfirm(null);
  // };

  const handleScan = (qrCode: string) => {
    setNewProduct((prev) => ({ ...prev, qrCode }));
    setShowScanner(false);
  };

  const { hasPermission, requestPermission } = useCamera();

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
          <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 bg-white rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">New Product Details</h2>
            </div>
            <div
              className={
                windowWidth > 700 ? "grid grid-cols-2 gap-4" : undefined
              }
              style={
                windowWidth <= 700
                  ? { display: "flex", flexDirection: "column", gap: 10 }
                  : undefined
              }
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newProduct.name || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  QR Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newProduct.qrCode || ""}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, qrCode: e.target.value })
                    }
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowScanner(true)}
                    className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <QrCode className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturer
                </label>
                <input
                  type="text"
                  value={newProduct.manufacturer || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      manufacturer: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacture Date
                </label>
                <input
                  type="date"
                  value={newProduct.manufactureDate || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      manufactureDate: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Best Before
                </label>
                <input
                  type="date"
                  value={newProduct.bestBefore || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      bestBefore: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newProduct.description || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={newProduct.imageUrl || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, imageUrl: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Product
              </button>
            </div>
          </form>
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
        {showScanner && (
          <AdminQRScanner
            onScan={handleScan}
            error={error}
            hasPermission={hasPermission}
            requestPermission={requestPermission}
            onClose={() => setShowScanner(false)}
          />
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
                  {/* {showConfirm === product.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowConfirm(null)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Confirm
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowConfirm(product.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )} */}
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
