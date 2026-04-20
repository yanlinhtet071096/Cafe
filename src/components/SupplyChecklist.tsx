import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, CheckCircle2, Circle, Loader2, StickyNote, Package, X } from "lucide-react";
import { SupplyItem } from "../types";
import { supplyService } from "../services/supplyService";

export function SupplyChecklist() {
  const [items, setItems] = useState<SupplyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const fetchItems = async () => {
    try {
      const data = await supplyService.getItems();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    const subscription = supplyService.subscribeToItems(() => {
      fetchItems();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    try {
      await supplyService.addItem(newItemName, newItemQty);
      setNewItemName("");
      setNewItemQty("");
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const toggleCheck = async (id: string, isChecked: boolean) => {
    try {
      await supplyService.updateItem(id, { isChecked: !isChecked });
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await supplyService.deleteItem(id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="animate-spin text-bakery-gold" size={32} />
      </div>
    );
  }

  const sortedItems = [...items].sort((a, b) => {
    if (a.isChecked === b.isChecked) return 0;
    return a.isChecked ? 1 : -1;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-serif font-bold text-bakery-brown mb-2 text-balance">Supply Checklist</h3>
          <p className="text-bakery-dark/40 italic">Syncing across all bakery family members in real-time.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-12 h-12 bg-bakery-gold text-white rounded-2xl flex items-center justify-center shadow-lg shadow-bakery-gold/20 hover:scale-105 transition-transform"
          >
            <Plus size={24} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleAddItem}
            className="bg-bakery-warm/50 p-6 rounded-[2rem] border border-bakery-brown/5 space-y-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-bakery-gold">New Requirement</span>
              <button type="button" onClick={() => setIsAdding(false)} className="text-bakery-dark/20 hover:text-bakery-dark transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                autoFocus
                type="text" 
                placeholder="Item Name (e.g. Bread Flour)"
                className="w-full bg-white px-6 py-4 rounded-2xl outline-none focus:ring-2 ring-bakery-gold/20 border-transparent transition-all"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Quantity (e.g. 25kg)"
                className="w-full bg-white px-6 py-4 rounded-2xl outline-none focus:ring-2 ring-bakery-gold/20 border-transparent transition-all"
                value={newItemQty}
                onChange={(e) => setNewItemQty(e.target.value)}
              />
            </div>
            <button className="w-full py-4 bg-bakery-brown text-white rounded-2xl font-bold hover:bg-bakery-dark transition-all">
              Add to Board
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {sortedItems.length === 0 ? (
          <div className="text-center py-20 bg-bakery-warm/20 rounded-[3rem] border border-dashed border-bakery-brown/10">
            <Package size={48} className="mx-auto mb-4 text-bakery-brown/10" strokeWidth={1} />
            <p className="text-bakery-dark/30 font-medium">No items on the board yet.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {sortedItems.map((item) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group flex items-center gap-6 p-6 rounded-[2.5rem] transition-all border ${
                  item.isChecked 
                    ? "bg-bakery-warm/20 border-transparent grayscale opacity-50" 
                    : "bg-white border-bakery-brown/5 shadow-sm hover:shadow-md"
                }`}
              >
                <button 
                  onClick={() => toggleCheck(item.id, item.isChecked)}
                  className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    item.isChecked 
                      ? "bg-bakery-gold border-bakery-gold text-white" 
                      : "border-bakery-gold/20 text-transparent hover:border-bakery-gold"
                  }`}
                >
                  <CheckCircle2 size={18} />
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className={`text-lg font-serif font-bold text-bakery-brown truncate ${item.isChecked ? "line-through" : ""}`}>
                      {item.name}
                    </h4>
                    {item.quantity && (
                      <span className="text-[10px] uppercase font-bold tracking-tight text-bakery-gold bg-bakery-gold/5 px-2 py-0.5 rounded-full">
                        {item.quantity}
                      </span>
                    )}
                  </div>
                  {item.note && (
                    <div className="flex items-center gap-2 text-xs text-bakery-dark/40 italic">
                      <StickyNote size={12} /> {item.note}
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleDelete(item.id)}
                  className="w-10 h-10 flex items-center justify-center text-bakery-dark/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
