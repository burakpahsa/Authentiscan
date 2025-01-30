import { Link, Image } from "lucide-react";
import { HtmlModal } from "..";
import { InsertLinkModal } from "./InsertLinkModal";
import { InsertImageModal } from "./InsertImageModal";

type Props = {
  showModal: HtmlModal;
  insertHtml: (htmlString: string) => void;
  setShowModal: (type: HtmlModal) => void;
};

export const InsertHtmlPanel: React.FC<Props> = ({
  showModal,
  insertHtml,
  setShowModal,
}) => {
  return (
    <>
      <button onClick={() => setShowModal("link")} type="button">
        <Link className="w-4 h-4" />
      </button>
      <button onClick={() => setShowModal("image")} type="button">
        <Image className="w-4 h-4" />
      </button>
      {showModal === "link" ? (
        <InsertLinkModal
          insertHtml={insertHtml}
          onCancel={() => setShowModal(null)}
        />
      ) : showModal === "image" ? (
        <InsertImageModal
          insertHtml={insertHtml}
          onCancel={() => setShowModal(null)}
        />
      ) : null}
    </>
  );
};
