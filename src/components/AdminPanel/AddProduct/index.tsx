export const AddProduct: React.FC = () => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">New Product Details</h2>
      </div>
      <div
        className={windowWidth > 700 ? "grid grid-cols-2 gap-4" : undefined}
        style={
          windowWidth <= 700
            ? { display: "flex", flexDirection: "column", gap: 10 }
            : undefined
        }
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={newProduct.name || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            QR Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newProduct.qrCode || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, qrCode: e.target.value })
              }
              className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowScanner(true)}
              className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
            >
              <QrCode className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Manufacturer
          </label>
          <input
            type="text"
            value={newProduct.manufacturer || ""}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                manufacturer: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Manufacture Date
          </label>
          <input
            type="date"
            value={newProduct.manufactureDate || ""}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                manufactureDate: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Best Before
          </label>
          <input
            type="date"
            value={newProduct.bestBefore || ""}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                bestBefore: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={newProduct.description || ""}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                description: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={newProduct.imageUrl || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Product
        </button>
      </div>
    </form>
  );
};
