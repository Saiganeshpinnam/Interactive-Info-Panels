import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Pin, Star } from 'lucide-react';

const HoverCard = ({ card, onContextMenu }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const timerRef = useRef(null);
  const isLongPress = useRef(false);

  const handleToggle = () => {
    if (!isLongPress.current) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleTouchStart = (e) => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      const touch = e.touches[0];
      onContextMenu(touch.clientX, touch.clientY, card);
    }, 700);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    onContextMenu(e.clientX, e.clientY, card);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <motion.div
      className={`relative w-full bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer border transition-all duration-300
        ${card.isPinned ? 'border-indigo-400 ring-1 ring-indigo-400' : 'border-gray-100'}
        ${card.isImportant ? 'bg-amber-50/30' : ''}
      `}
      onMouseEnter={() => !('ontouchstart' in window) && setIsExpanded(true)}
      onMouseLeave={() => !('ontouchstart' in window) && setIsExpanded(false)}
      onContextMenu={handleRightClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleToggle}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      layout
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
              {card.isPinned && <Pin className="w-4 h-4 text-indigo-500 fill-current" />}
              {card.isImportant && <Star className="w-4 h-4 text-amber-500 fill-current" />}
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            className="mt-1"
          >
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HoverCard;
