import { useTranslation } from "react-i18next";

type Props = {
  children: React.ReactNode;
  title: string;
  onSubmit: () => void;
  onCancel: () => void;
};

export const InsertHtmlModal: React.FC<Props> = ({
  children,
  title,
  onSubmit,
  onCancel,
}) => {
  const {t} = useTranslation()
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 60,
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <h3>{title}</h3>
      {children}
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
          type="button"
        >
          {t('add.cancel')}
        </button>
        <button
          onClick={onSubmit}
          style={{ marginRight: "10px" }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          type="button"
        >
          {t('insert.insert')}
        </button>
      </div>
    </div>
  );
};
