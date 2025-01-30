import { Product } from "../../../../../types";

type Props = {
  product: Omit<Product, "isFlagged">;
};

export const ProductResultCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="mt-4">
      <div className="aspect-video rounded-lg overflow-hidden mb-4 shadow-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p
        className="text-gray-600 mb-4"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
      <div className="grid grid-cols-2 gap-4 text-sm bg-white p-4 rounded-lg">
        <div>
          <span className="font-medium text-gray-700">Manufacturer:</span>
          <p className="mt-1">{product.manufacturer}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Manufacture Date:</span>
          <p className="mt-1">{product.manufactureDate}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Best Before:</span>
          <p className="mt-1">{product.bestBefore}</p>
        </div>
      </div>
    </div>
  );
};
