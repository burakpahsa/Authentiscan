import { useState } from "react";
import { InsertHtmlModal } from "./InsertHtmlModal";

type Props = {
    insertHtml: (htmlString: string) => void;
    onCancel: () => void;
}

export const InsertLinkModal: React.FC<Props> = ({insertHtml, onCancel}) => {
      const [linkURL, setLinkURL] = useState("");
      const [linkText, setLinkText] = useState("");

    const handleSubmit = () => {
        if (!linkURL || !linkText) return; // Ensure both fields are filled
        const linkHTML = `<a href="${linkURL}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: blue;">${linkText}</a>`;
        insertHtml(linkHTML)
        setLinkURL("");
        setLinkText("");
    }
  return (
    <InsertHtmlModal
      title="Insert Link"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <input
        type="text"
        placeholder="Enter URL"
        value={linkURL}
        onChange={(e) => setLinkURL(e.target.value)}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Enter Link Text"
        value={linkText}
        onChange={(e) => setLinkText(e.target.value)}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </InsertHtmlModal>
  );
};
