import { useEffect, useState } from "react";
import { useAuthStore } from "@store/authStore";
import { AlertCircle, Plus } from "lucide-react";
import { AddProduct } from "../AddProduct";
import { ProductCard } from "./ProductCard";
import { useTranslation } from "react-i18next";
import useWindowSize from "@hooks/useWindowSize";
import { Loader } from "@/components/common/Loader";

export const ManageProducts: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useWindowSize(760);
  const isSmallMobile = useWindowSize(450);
  const [showForm, setShowForm] = useState(false);
  const { authenticProducts, fetchProducts, isLoading, error } = useAuthStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div
        className={`flex${isMobile ? "-column" : ""} justify-between mb-6`}
        style={{ alignItems: "flex-start", gap: 20 }}
      >
        <div>
          <h1
            className="text-2xl font-bold text-gray-900"
            style={{ wordBreak: "break-word" }}
          >
            {t("manageProducts.title")}
          </h1>
          <p className="text-gray-600 mt-1">{t("manageProducts.subtitle")}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-${
            isSmallMobile ? 3 : 2
          } bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors`}
          style={{
            whiteSpace: "nowrap",
            marginTop: isMobile ? 20 : 0,
            justifySelf: isMobile ? "flex-end" : undefined,
            width: isSmallMobile ? "100%" : undefined,
            justifyContent: isSmallMobile ? "center" : undefined,
          }}
        >
          <Plus className="w-4 h-4" />
          {t("manageProducts.add")}
        </button>
      </div>

      {showForm && <AddProduct setShowForm={setShowForm} />}

      {isLoading && <Loader />}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <div>
              <p className="text-sm text-red-700">
                {t("manageProducts.error")}
              </p>
              <p className="text-xs text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}
      {authenticProducts.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            {t("manageProducts.noProducts")}
          </h3>
          <p className="text-gray-600 mt-1">
            {t("manageProducts.addFirstHint")}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {authenticProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};
