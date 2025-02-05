import { useRef, useState } from "react";
import { Product } from "@types";
import { InsertHtmlPanel } from "./InsertHtmlPanel";
import { useTranslation } from "react-i18next";

type DescriptionInputProps = {
  newProduct: Partial<Product>;
  setNewProduct: (val: Partial<Product>) => void;
};

export type HtmlModal = "link" | "image" | null;

export const DescriptionInput: React.FC<DescriptionInputProps> = ({
  newProduct,
  setNewProduct,
}) => {
  const {t} = useTranslation()
  const [showModal, setShowModal] = useState<HtmlModal>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Track cursor position
  const [cursorPosition, setCursorPosition] = useState(0);

  // Function to insert the link into the textarea at the cursor position
  const insertHtml = (htmlString: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const text = textarea.value;
    const before = text.substring(0, cursorPosition);
    const after = text.substring(cursorPosition);

    // Insert the link at the cursor position
    const newText = `${before}${htmlString}${after}`;
    setNewProduct({
      ...newProduct,
      description: newText,
    });

    // Close modal and reset input fields
    setShowModal(null);

    // Restore focus and set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        cursorPosition + htmlString.length,
        cursorPosition + htmlString.length
      );
    }, 0);
  };

  const updateCursorPosition = () => {
    if (textareaRef.current) {
      setCursorPosition(textareaRef.current.selectionStart);
    }
  };

  return (
    <>
      <div className="col-span-2">
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            position: "relative",
          }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('add.description')}
          </label>
          <InsertHtmlPanel
            showModal={showModal}
            setShowModal={setShowModal}
            insertHtml={insertHtml}
          />
        </div>
        <textarea
          ref={textareaRef}
          value={newProduct.description || ""}
          onClick={updateCursorPosition}
          onKeyUp={updateCursorPosition}
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
    </>
  );
};
