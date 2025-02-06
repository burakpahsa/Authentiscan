import { RefreshCw } from "lucide-react";
import { ScanResult as ScanResultType } from "@types";
import { ProductResultCard } from "./ProductCard";
import { ResultMessage } from "./ResultMessage";
import { useTranslation } from "react-i18next";
type Props = {
  result: ScanResultType;
  handleReset: () => void;
};

export const ScanResult: React.FC<Props> = ({ result, handleReset }) => {
  const { t } = useTranslation();
  const getBackgroundColor = () => {
    if (!result.isAuthentic || !result.product) {
      return "bg-red-50";
    }
    return result.product.isFlagged ? "bg-yellow-50" : "bg-green-50";
  };
  return (
    <div className={`p-6 rounded-lg shadow-lg ${getBackgroundColor()}`}>
      <ResultMessage result={result} />

      {result.product && <ProductResultCard product={result.product} />}

      <button
        onClick={handleReset}
        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        {t("result.another")}
      </button>
    </div>
  );
};
