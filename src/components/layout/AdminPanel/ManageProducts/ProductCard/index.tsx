import { Flag } from "lucide-react";
import { Product } from "@types";
import { useTranslation } from "react-i18next";
import { THRESHOLD } from "@helpers/store";
import useWindowSize from "@hooks/useWindowSize";
import { Delete } from "./Delete";

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const isMobile = useWindowSize(450);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className={`flex${isMobile ? "-column" : ""} items-center gap-4`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`${
            isMobile ? "w-full h-50" : "w-24 h-24"
          } object-cover rounded-lg`}
          style={{
            alignSelf: "flex-start",
            justifySelf: isMobile ? "flex-end" : undefined,
            marginBottom: isMobile ? 10 : undefined,
          }}
        />
        <div className="flex-1 flex-column">
          <h3
            className="text-lg font-semibold text-gray-900"
            style={{
              wordBreak: "break-word",
              marginBottom: isMobile ? 10 : undefined,
            }}
          >
            {product.name}
          </h3>
          <p
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="text-gray-600 text-sm mb-2"
            style={{
              wordBreak: "break-word",
              marginBottom: isMobile ? 20 : undefined,
            }}
          />
          <div className="text-sm">
            <span className="font-medium text-gray-700">
              {t("product.qrCode")}
            </span>{" "}
            <code
              className="bg-gray-100 px-2 py-1 rounded"
              style={{ wordBreak: "break-word" }}
            >
              {product.qrCode}
            </code>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 20,
              marginTop: 10,
            }}
          >
            {product.isFlagged && (
              <>
                <Flag className="w-5 h-5 text-red-500" />
                <p className="text-red-500">{t("product.flag", { threshold: THRESHOLD })}</p>
              </>
            )}
            <Delete product={product} />
            </div>
        </div>
      </div>
    </div>
  );
};
