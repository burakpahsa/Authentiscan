import { useTranslation } from "react-i18next";
import { Product } from "@types";
import { getLocalDateString } from "@helpers/locales";

type Props = {
  product: Omit<Product, "isFlagged">;
};

export const ProductResultCard: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  return (
    <div className="mt-4">
      <div className="aspect-video rounded-lg overflow-hidden mb-4 shadow-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{wordBreak: 'break-word'}}>{product.name}</h3>
      <p
        className="text-gray-600 mb-4"
        dangerouslySetInnerHTML={{ __html: product.description }}
        style={{wordBreak: 'break-word'}}
      />
      <div className="grid grid-cols-2 gap-4 text-sm bg-white p-4 rounded-lg">
        <div>
          <span className="font-medium text-gray-700">{t('product.manufacturer')}</span>
          <p className="mt-1" style={{wordBreak: 'break-word'}}>{product.manufacturer}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">{t('product.manufactureDate')}</span>
          <p className="mt-1">{getLocalDateString(product.manufactureDate)}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">{t('product.bestBefore')}</span>
          <p className="mt-1">{getLocalDateString(product.bestBefore)}</p>
        </div>
      </div>
    </div>
  );
};
