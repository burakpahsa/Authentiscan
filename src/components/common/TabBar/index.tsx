import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Tabs } from "@/types";
import useWindowSize from "@/hooks/useWindowSize";

type Props = {
  tabs: Tabs;
};

export const TabBar: React.FC<Props> = ({ tabs }) => {
  const isMobile = useWindowSize(600)
  const location = useLocation();
  const navigate = useNavigate();
  const getActiveTab = () => {
    const index = tabs.findIndex((tab) =>
      location.pathname.startsWith(tab.path)
    );
    return index !== -1 ? index : 0;
  };
  const [activeIndex, setActiveIndex] = useState(getActiveTab());

  useEffect(() => {
    setActiveIndex(getActiveTab());
  }, [location.pathname]);

  return (
    <div>
      <div className="flex justify-between relative">
        {tabs.map((tab, index) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={clsx(
              "py-3 text-gray-600 font-medium transition-all flex justify-center flex-1 mb-2",
              index === activeIndex ? "text-blue-600" : "hover:text-gray-800",
              isMobile ? "px-3" : "px-6"
            )}
          >
            {tab.name}
          </button>
        ))}
        {/* Animated underline */}
        <div
          className="absolute bottom-0 h-1 bg-blue-600 transition-all duration-300"
          style={{
            width: `${100 / tabs.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
      </div>
    </div>
  );
};
