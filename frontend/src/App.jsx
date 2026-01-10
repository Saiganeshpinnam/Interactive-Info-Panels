import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import HoverCard from './components/HoverCard';
import ContextMenu from './components/ContextMenu';
import ViewModal from './components/ViewModal';
import ImageCardsPanel from './components/FacesPanel';

const API_BASE = import.meta.env.VITE_API_BASE;

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [menuConfig, setMenuConfig] = useState({ show: false, x: 0, y: 0, card: null });
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewCard, setViewCard] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/cards`);
        setCards(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError('Failed to load cards. Backend is not reachable.');
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleContextMenu = (x, y, card) => {
    setMenuConfig({ show: true, x, y, card });
  };

  const closeMenu = () => {
    setMenuConfig({ ...menuConfig, show: false });
  };

  const handleMenuAction = async (action) => {
    const card = menuConfig.card;
    if (!card) return;

    const previousCards = [...cards];

    if (action === 'pin' || action === 'important') {
      const updateData = action === 'pin' 
        ? { isPinned: !card.isPinned } 
        : { isImportant: !card.isImportant };

      setCards(prev => prev.map(c => 
        c._id === card._id ? { ...c, ...updateData } : c
      ).sort((a, b) => {
        if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1;
        return b._id.localeCompare(a._id);
      }));

      try {
        await axios.put(`${API_BASE}/api/cards/${card._id}`, updateData);
      } catch (err) {
        console.error(`Error updating card ${action}:`, err);
        setCards(previousCards);
        alert(`Failed to update card. Reverting changes.`);
      }
    } 
    else if (action === 'delete') {
      setCards(prev => prev.filter(c => c._id !== card._id));

      try {
        await axios.delete(`${API_BASE}/api/cards/${card._id}`);
      } catch (err) {
        console.error('Error deleting card:', err);
        setCards(previousCards);
        alert('Failed to delete card. Reverting changes.');
      }
    } 
    else if (action === 'view') {
      setViewCard(card);
      setShowViewModal(true);
    }
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewCard(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pb-40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Interactive Info Panels
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Hover or tap to reveal more information. Long-press or right-click for options.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card) => (
              <HoverCard
                key={card._id}
                card={card}
                onContextMenu={handleContextMenu}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {menuConfig.show && (
          <ContextMenu
            x={menuConfig.x}
            y={menuConfig.y}
            card={menuConfig.card}
            onClose={closeMenu}
            onAction={handleMenuAction}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showViewModal && (
          <ViewModal
            card={viewCard}
            onClose={closeViewModal}
          />
        )}
      </AnimatePresence>

      <ImageCardsPanel />
    </div>
  );
}

export default App;
