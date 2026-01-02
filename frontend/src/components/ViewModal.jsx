import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pin, Star } from 'lucide-react';

const ViewModal = ({ card, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!card) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-gray-900">{card.title}</h2>
                {card.isPinned && <Pin className="w-5 h-5 text-indigo-500 fill-current" />}
                {card.isImportant && <Star className="w-5 h-5 text-amber-500 fill-current" />}
              </div>
              <div className="flex gap-2">
                {card.isPinned && (
                  <span className="px-2 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full">
                    Pinned
                  </span>
                )}
                {card.isImportant && (
                  <span className="px-2 py-1 text-xs font-semibold text-amber-700 bg-amber-100 rounded-full">
                    Important
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="prose prose-indigo max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed whitespace-pre-wrap">
              {card.description}
            </p>
          </div>

          <div className="mt-12 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewModal;
