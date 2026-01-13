import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const FacesPanel = () => {
  const imageCards = [
    { id: 1, title: "Nature", color: "#10b981" },
    { id: 2, title: "City", color: "#3b82f6" },
    { id: 3, title: "Abstract", color: "#8b5cf6" },
    { id: 4, title: "Tech", color: "#f59e0b" },
    { id: 5, title: "Art", color: "#ef4444" },
    { id: 6, title: "Space", color: "#6366f1" },
    { id: 7, title: "Ocean", color: "#06b6d4" },
    { id: 8, title: "Mountain", color: "#84cc16" },
  ];

  // Duplicate once for seamless looping
  const loopCards = [...imageCards, ...imageCards];

  const containerRef = useRef(null);
  const [setWidth, setSetWidth] = useState(0);

  // Measure the real width of ONE full set of cards
  useEffect(() => {
    if (containerRef.current) {
      setSetWidth(containerRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 shadow-lg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm text-gray-400 mb-4">
          Exploring content automatically…
        </p>

        <motion.div
          ref={containerRef}
          className="flex gap-4"
          animate={{ x: [0, -setWidth] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {loopCards.map((card, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              whileHover={{ scale: 1.06 }}
            >
              <div
                className="w-48 h-32 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}88 100%)`,
                }}
              >
                <div className="p-4 h-full flex items-end">
                  <h3 className="text-white text-lg font-bold">
                    {card.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FacesPanel;
