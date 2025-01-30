import { Flag } from "lucide-react";
import { Product } from "../../../../../types";

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
          style={{alignSelf: 'flex-start'}}
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
            <span className="font-medium text-gray-700">QR Code:</span>{" "}
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
                marginTop: 10
              }}
            >
              <Flag className="w-5 h-5 text-red-500" />
              <p className="text-red-500">3+ Unique Scans</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
