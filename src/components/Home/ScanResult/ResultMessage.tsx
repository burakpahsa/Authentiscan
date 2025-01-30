import { CheckCircle, XCircle } from "lucide-react";
import { ScanResult } from "../../../types";

type Props = {
  result: ScanResult;
};

export const ResultMessage: React.FC<Props> = ({ result }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      {result.isAuthentic ? (
        <CheckCircle className="w-8 h-8 text-green-500" />
      ) : (
        <XCircle className="w-8 h-8 text-red-500" />
      )}
      <h2 className="text-xl font-semibold">{result.message}</h2>
    </div>
  );
};
