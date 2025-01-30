import { useState } from "react";
import { InsertHtmlModal } from "./InsertHtmlModal";

type Props = {
    insertHtml: (htmlString: string) => void;
    onCancel: () => void;
}

export const InsertImageModal: React.FC<Props> = ({insertHtml, onCancel}) => {
      const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = () => {
        if (!imageUrl) return;
        const imageHTML = `<img src="${imageUrl}" style="width: 50px; height: 50px;" />`
        insertHtml(imageHTML)
        setImageUrl("");
    }
  return (
    <InsertHtmlModal
      title="Insert Image"
      onSubmit={handleSubmit}
      onCancel={onCancel}
    >
      <input
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </InsertHtmlModal>
  );
};
