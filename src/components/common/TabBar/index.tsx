import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Tabs } from "@/types";

type Props = {
  tabs: Tabs;
};

export const TabBar: React.FC<Props> = ({ tabs }) => {
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
              "px-6 py-3 text-gray-600 font-medium transition-all flex justify-center flex-1 mb-2",
              index === activeIndex ? "text-blue-600" : "hover:text-gray-800"
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
