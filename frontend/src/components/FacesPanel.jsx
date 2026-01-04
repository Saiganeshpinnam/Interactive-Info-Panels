import React from 'react';
import { motion } from 'framer-motion';

const ImageCardsPanel = () => {
  // Sample image data - replace with actual images
  const imageCards = [
    { id: 1, title: 'Nature', color: '#10b981' },
    { id: 2, title: 'City', color: '#3b82f6' },
    { id: 3, title: 'Abstract', color: '#8b5cf6' },
    { id: 4, title: 'Tech', color: '#f59e0b' },
    { id: 5, title: 'Art', color: '#ef4444' },
    { id: 6, title: 'Space', color: '#6366f1' },
    { id: 7, title: 'Ocean', color: '#06b6d4' },
    { id: 8, title: 'Mountain', color: '#84cc16' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm text-gray-400 mb-4">
          Scroll to explore more content
        </p>
        
        {/* Horizontal scrolling container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-2" style={{ minWidth: 'max-content' }}>
            {imageCards.map((card, index) => (
              <motion.div
                key={card.id}
                className="flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [-1, 1, -1],
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative">
                  {/* Card with gradient background */}
                  <div 
                    className="w-48 h-32 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                    style={{ 
                      background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}88 100%)`
                    }}
                  >
                    {/* Card content */}
                    <div className="p-4 h-full flex flex-col justify-between">
                      <div className="text-white">
                        <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                        <p className="text-xs opacity-80">Click to explore</p>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="flex justify-end">
                        <motion.div
                          className="w-8 h-8 bg-white bg-opacity-20 rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Card shadow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCardsPanel;
