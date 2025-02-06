import { useState } from "react";
import { useAuthStore } from "@store/authStore";
import { Product } from "@types";
import { Package, QrCode } from "lucide-react";
import { AdminQRScanner } from "./AdminQRScanner";
import { useCamera } from "@hooks/useCamera";
import { DescriptionInput } from "./DescriptionInput";
import { useTranslation } from "react-i18next";
import useWindowSize from "@hooks/useWindowSize";
import { FormInput } from "@/components/common/FormInput";

type AddProductProps = {
  setShowForm: (val: boolean) => void;
};

export const AddProduct: React.FC<AddProductProps> = ({ setShowForm }) => {
  const { t } = useTranslation();
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const isMobile = useWindowSize(700);
  const [showScanner, setShowScanner] = useState(false);
  const { addProduct, error } = useAuthStore();
  const { hasPermission, requestPermission } = useCamera();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.qrCode) {
      addProduct({
        name: newProduct.name,
        description: newProduct.description || "",
        manufacturer: newProduct.manufacturer || "",
        manufactureDate:
          newProduct.manufactureDate || new Date().toISOString().split("T")[0],
        qrCode: newProduct.qrCode,
        imageUrl:
          newProduct.imageUrl ||
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        bestBefore:
          newProduct.bestBefore || new Date().toISOString().split("T")[0],
        isFlagged: false,
      });
      setNewProduct({});
      setShowForm(false);
    }
  };

  const handleScan = (qrCode: string) => {
    setNewProduct((prev) => ({ ...prev, qrCode }));
    setShowScanner(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-6 bg-white rounded-lg shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <Package className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">{t("add.title")}</h2>
        </div>
        <div
          className={!isMobile ? "grid grid-cols-2 gap-4" : undefined}
          style={
            isMobile
              ? { display: "flex", flexDirection: "column", gap: 20 }
              : undefined
          }
        >
          <FormInput
            label={t("add.name")}
            value={newProduct.name || ""}
            required
            onChange={(val: string) =>
              setNewProduct({ ...newProduct, name: val })
            }
          />
          <FormInput
            label={t("add.qrCode")}
            value={newProduct.qrCode || ""}
            onChange={(val: string) =>
              setNewProduct({ ...newProduct, qrCode: val })
            }
            required
          >
            <button
              type="button"
              onClick={() => setShowScanner(true)}
              className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
            >
              <QrCode className="w-5 h-5" />
            </button>
          </FormInput>
          <FormInput
            label={t("add.manufacturer")}
            value={newProduct.manufacturer || ""}
            onChange={(val: string) =>
              setNewProduct({
                ...newProduct,
                manufacturer: val,
              })
            }
          />
          <FormInput
            label={t("add.manufactureDate")}
            type="date"
            value={newProduct.manufactureDate || ""}
            onChange={(val: string) =>
              setNewProduct({
                ...newProduct,
                manufactureDate: val,
              })
            }
          />
          <FormInput
            label={t("add.bestBefore")}
            type="date"
            value={newProduct.bestBefore || ""}
            onChange={(val: string) =>
              setNewProduct({
                ...newProduct,
                bestBefore: val,
              })
            }
            required
          />
          <DescriptionInput
            newProduct={newProduct}
            setNewProduct={setNewProduct}
          />
          <FormInput
            outerDivStyle="col-span-2"
            placeholder="https://example.com/image.jpg"
            label={t("add.imageUrl")}
            type="url"
            value={newProduct.imageUrl || ""}
            onChange={(val: string) =>
              setNewProduct({ ...newProduct, imageUrl: val })
            }
          />
        </div>
        <div
          className={`mt-6 justify-end gap-2`}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column-reverse" : "row",
          }}
        >
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            {t("add.cancel")}
          </button>
          <button
            type="submit"
            className={`px-4 py-${
              isMobile ? 3 : 2
            } bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors`}
          >
            {t("add.save")}
          </button>
        </div>
      </form>
      {showScanner && (
        <AdminQRScanner
          onScan={handleScan}
          error={error}
          hasPermission={hasPermission}
          requestPermission={requestPermission}
          onClose={() => setShowScanner(false)}
        />
      )}
    </>
  );
};
