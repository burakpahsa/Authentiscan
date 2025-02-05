import { Link, Image } from "lucide-react";
import { HtmlModal } from "..";
import { InsertLinkModal } from "./InsertLinkModal";
import { InsertImageModal } from "./InsertImageModal";
import useWindowSize from "@hooks/useWindowSize";

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
  const isMobile = useWindowSize(700)
  const iconSize = isMobile ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <>
      <button onClick={() => setShowModal("link")} type="button">
        <Link className={iconSize} />
      </button>
      <button onClick={() => setShowModal("image")} type="button">
        <Image className={iconSize} />
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
