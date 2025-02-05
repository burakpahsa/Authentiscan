import { useState, useEffect } from "react";

const useWindowSize = (threshold = 768) => {
  const [isBelowThreshold, setIsBelowThreshold] = useState(
    window.innerWidth < threshold
  );

  useEffect(() => {
    const handleResize = () => {
      setIsBelowThreshold(window.innerWidth < threshold);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [threshold]);

  return isBelowThreshold;
};

export default useWindowSize;
