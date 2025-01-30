import { useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { ScanLogCard } from "./ScanLogCard";

export const ScanLog: React.FC = () => {
  const { scans, fetchScans } = useAuthStore();

  useEffect(() => {
    fetchScans();
  }, [fetchScans]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scan Log</h1>
          <p className="text-gray-600 mt-1">View latest 10 scans</p>
        </div>
      </div>
      <div className="grid gap-4">
        {scans.map((scanLog) => (
            <ScanLogCard scanLog={scanLog}/>
        ))}
      </div>
    </div>
  );
};
