import React, { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import {
  CheckCircle,
  XCircle,
} from "lucide-react";
import { ManageProducts } from "./ManageProducts";

export const AdminPanel: React.FC = () => {
  const {
    scans,
    fetchProducts,
    fetchScans,
  } = useAuthStore();

  useEffect(() => {
    fetchScans();
  }, [fetchProducts]);

  return (
    <>
      <ManageProducts />
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
