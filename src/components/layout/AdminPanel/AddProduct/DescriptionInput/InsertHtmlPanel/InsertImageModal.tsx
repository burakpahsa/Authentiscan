import { useState } from "react";
import { InsertHtmlModal } from "./InsertHtmlModal";
import { useTranslation } from "react-i18next";

type Props = {
  insertHtml: (htmlString: string) => void;
  onCancel: () => void;
};

export const InsertImageModal: React.FC<Props> = ({ insertHtml, onCancel }) => {
  const {t} = useTranslation()
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    if (!imageUrl) return;
    const imageHTML = `<a href="${imageUrl}" target="_blank" rel="noopener noreferrer"><img src="${imageUrl}" alt="Product Image" style="width: 50px; height: 50px;" /></a>`;
    insertHtml(imageHTML);
    setImageUrl("");
  };
  return (
    <InsertHtmlModal
      title={t('insert.image.title')}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <input
        type="text"
        placeholder={t('insert.image.url')}
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </InsertHtmlModal>
  );
};
