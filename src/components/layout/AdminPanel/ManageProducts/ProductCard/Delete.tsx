import { useAuthStore } from "@/store/authStore";
import { Product } from "@/types";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import useWindowSize from "@/hooks/useWindowSize";

type Props = {
  product: Product;
};

export const Delete: React.FC<Props> = ({ product }) => {
  const isMobile = useWindowSize(450);
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const { removeProduct } = useAuthStore();

  const handleDelete = (id: string) => {
    removeProduct(id);
    setShowConfirm(null);
  };

  return (
    <>
      {showConfirm === product.id ? (
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column-reverse" : "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setShowConfirm(null)}
            className="px-3 py-1 text-gray-600 hover:text-gray-800"
          >
            {t("cancel")}
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {t("confirm")}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowConfirm(product.id)}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </>
  );
};
