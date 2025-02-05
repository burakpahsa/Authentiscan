import { useState } from "react";
import { InsertHtmlModal } from "./InsertHtmlModal";
import { useTranslation } from "react-i18next";

type Props = {
  insertHtml: (htmlString: string) => void;
  onCancel: () => void;
};

export const InsertLinkModal: React.FC<Props> = ({ insertHtml, onCancel }) => {
  const {t} = useTranslation()
  const [linkURL, setLinkURL] = useState("");
  const [linkText, setLinkText] = useState("");

  const handleSubmit = () => {
    if (!linkURL || !linkText) return; // Ensure both fields are filled
    const linkHTML = `<a href="${linkURL}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: blue;">${linkText}</a>`;
    insertHtml(linkHTML);
    setLinkURL("");
    setLinkText("");
  };
  return (
    <InsertHtmlModal
      title={t('insert.link.title')}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <input
        type="text"
        placeholder={t('insert.link.url')}
        value={linkURL}
        onChange={(e) => setLinkURL(e.target.value)}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="text"
        placeholder={t('insert.link.text')}
        value={linkText}
        onChange={(e) => setLinkText(e.target.value)}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </InsertHtmlModal>
  );
};
