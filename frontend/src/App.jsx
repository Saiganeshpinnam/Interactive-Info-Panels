import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import HoverCard from "./components/HoverCard";
import ContextMenu from "./components/ContextMenu";
import ViewModal from "./components/ViewModal";
import FacesPanel from "./components/FacesPanel";

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [menuConfig, setMenuConfig] = useState({
    show: false,
    x: 0,
    y: 0,
    card: null,
  });

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewCard, setViewCard] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cards");

        // Support both API formats:
        // [ {..}, {..} ]
        // or { count: X, cards: [ {..} ] }
        const cardsArray = response.data.cards || response.data;

        setCards(cardsArray);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cards:", err);
        setError("Failed to load cards. Make sure the backend is running.");
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleContextMenu = (x, y, card) => {
    setMenuConfig({ show: true, x, y, card });
  };

  const closeMenu = () => {
    setMenuConfig((prev) => ({ ...prev, show: false }));
  };

  const handleMenuAction = async (action) => {
    const card = menuConfig.card;
    if (!card) return;

    const previousCards = [...cards];

    if (action === "pin" || action === "important") {
      const updateData =
        action === "pin"
          ? { isPinned: !card.isPinned }
          : { isImportant: !card.isImportant };

      // Optimistic UI update
      setCards((prev) =>
        prev
          .map((c) =>
            c._id === card._id ? { ...c, ...updateData } : c
          )
          .sort((a, b) => {
            if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1;
            return b._id.localeCompare(a._id);
          })
      );

      try {
        await axios.put(
          `http://localhost:5000/api/cards/${card._id}`,
          updateData
        );
      } catch (err) {
        console.error("Update failed:", err);
        setCards(previousCards);
        alert("Failed to update card. Reverting.");
      }
    } else if (action === "delete") {
      setCards((prev) => prev.filter((c) => c._id !== card._id));

      try {
        await axios.delete(
          `http://localhost:5000/api/cards/${card._id}`
        );
      } catch (err) {
        console.error("Delete failed:", err);
        setCards(previousCards);
        alert("Failed to delete card. Reverting.");
      }
    } else if (action === "view") {
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
          <ViewModal card={viewCard} onClose={closeViewModal} />
        )}
      </AnimatePresence>

      {/* Infinite auto-scrolling panel */}
      <FacesPanel />
    </div>
  );
}

export default App;
