import { useRef, useState } from "react";
import { Product } from "../../../../types";
import { Link } from "lucide-react";

type DescriptionInputProps = {
  newProduct: Partial<Product>;
  setNewProduct: (val: Partial<Product>) => void;
};

export const DescriptionInput: React.FC<DescriptionInputProps> = ({
  newProduct,
  setNewProduct,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [linkURL, setLinkURL] = useState("");
  const [linkText, setLinkText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Track cursor position
  const [cursorPosition, setCursorPosition] = useState(0);

  // Function to insert the link into the textarea at the cursor position
  const insertLink = () => {
    if (!linkURL || !linkText) return; // Ensure both fields are filled

    const linkHTML = `<a href="${linkURL}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: blue;">${linkText}</a>`;

    const textarea = textareaRef.current;
    if (!textarea) return;

    const text = textarea.value;
    const before = text.substring(0, cursorPosition);
    const after = text.substring(cursorPosition);

    // Insert the link at the cursor position
    const newText = `${before}${linkHTML}${after}`;
    setNewProduct({
      ...newProduct,
      description: newText,
    });

    // Close modal and reset input fields
    setShowModal(false);
    setLinkURL("");
    setLinkText("");

    // Restore focus and set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        cursorPosition + linkHTML.length,
        cursorPosition + linkHTML.length
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
            Description
          </label>
          <button onClick={() => setShowModal(true)} type="button">
            <Link className="w-4 h-4" />
          </button>
          {showModal && (
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
              <h3>Insert Link</h3>
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
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={insertLink}
                  style={{ marginRight: "10px" }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  type="button"
                >
                  Insert
                </button>
              </div>
            </div>
          )}
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
