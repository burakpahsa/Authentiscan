import { RefreshCw } from "lucide-react";
import { ScanResult as ScanResultType } from "../../../types";
import { ProductResultCard } from "./ProductCard";
import { ResultMessage } from "./ResultMessage";

type Props = {
  result: ScanResultType;
  handleReset: () => void;
};

export const ScanResult: React.FC<Props> = ({ result, handleReset }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg ${
        result.isAuthentic ? "bg-green-50" : "bg-red-50"
      }`}
    >
      <ResultMessage result={result} />

      {result.product && <ProductResultCard product={result.product} />}

      <button
        onClick={handleReset}
        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Scan Another Code
      </button>
    </div>
  );
};
