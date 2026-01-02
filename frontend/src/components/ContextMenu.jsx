import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Pin, Star, Trash2 } from 'lucide-react';

const ContextMenu = ({ x, y, onClose, onAction, card }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const menuItems = [
    { label: 'View', icon: Eye, action: 'view' },
    { label: card.isPinned ? 'Unpin' : 'Pin', icon: Pin, action: 'pin', active: card.isPinned },
    { label: card.isImportant ? 'Unmark Important' : 'Mark Important', icon: Star, action: 'important', active: card.isImportant },
    { label: 'Delete', icon: Trash2, action: 'delete', danger: true },
  ];

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ top: y, left: x }}
      className="fixed z-50 min-w-[200px] bg-white rounded-lg shadow-xl border border-gray-200 py-1 overflow-hidden"
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            onAction(item.action);
            onClose();
          }}
          className={`w-full flex items-center px-4 py-2 text-sm transition-colors
            ${item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-100'}
            ${item.active ? 'bg-indigo-50 text-indigo-700' : ''}
          `}
        >
          <item.icon className={`w-4 h-4 mr-3 ${item.active ? 'fill-current' : ''}`} />
          {item.label}
        </button>
      ))}
    </motion.div>
  );
};

export default ContextMenu;
