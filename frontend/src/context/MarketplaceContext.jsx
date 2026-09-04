import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from './AuthContext';

const MarketplaceContext = createContext(null);
const starterRequests = [{ id: 'swap-1', sender: 'Amara M.', receiver: 'L G Lithika', offeredItem: 'Moss corduroy overshirt', requestedItem: 'Sun-faded linen shirt', status: 'pending', compatibilityScore: 92, createdAt: 'Today' }];

export function MarketplaceProvider({ children }) {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [requests, setRequests] = useState(starterRequests);
  const [messages, setMessages] = useState([{ id: 1, sender: 'Amara M.', content: 'Hey Lithika! I love your linen shirt. Would you be open to swapping for the corduroy overshirt?', time: '10:42' }, { id: 2, sender: 'L G Lithika', content: 'Hi Amara, the shirt is one of my favourites. I think a swap could work. Want to meet Thursday?', time: '10:44' }]);
  const [impact, setImpact] = useState({ swapsCompleted: 12, waterSaved: 84000, carbonReduced: 180, pointsEarned: 1240, wasteReduced: 12.6 });
  useEffect(() => { if (!user || !localStorage.getItem('ecoswap_token')) return; Promise.all([api.listings({}), api.swaps(), api.impact()]).then(([items, swaps, currentImpact]) => { setListings(items.map(item => ({ ...item, id: item._id, value: item.estimatedValue, owner: item.owner?.name || 'Community member', image: item.image ? `http://localhost:5000/${item.image.replaceAll('\\','/')}` : '/assets/clothing-placeholder.svg' }))); setRequests(swaps.map(swap => ({ ...swap, id: swap._id, sender: swap.sender?.name || 'Member', receiver: swap.receiver?.name || 'Member', offeredItem: swap.offeredItem?.title || 'Item', requestedItem: swap.requestedItem?.title || 'Item', createdAt: new Date(swap.createdAt).toLocaleDateString() }))); setImpact(currentImpact); }).catch(() => {}); }, [user]);
  const addListing = listing => setListings(current => [{ ...listing, id: `user-${Date.now()}`, owner: user?.name || 'L G Lithika', location: listing.location || 'Chennai', image: listing.image || '/assets/clothing-placeholder.svg' }, ...current]);
  const updateListing = async (id, changes) => { setListings(current => current.map(item => item.id === id ? { ...item, ...changes } : item)); if (localStorage.getItem('ecoswap_token') && !String(id).startsWith('user-')) await api.updateListing(id, changes); };
  const deleteListing = async id => { setListings(current => current.filter(item => item.id !== id)); if (localStorage.getItem('ecoswap_token') && !String(id).startsWith('user-')) await api.deleteListing(id); };
  const sendSwap = async ({ requestedItem, offeredItem }) => { if (localStorage.getItem('ecoswap_token') && String(requestedItem.id).length === 24 && String(offeredItem.id).length === 24) { const swap = await api.createSwap({ requestedItem: requestedItem.id, offeredItem: offeredItem.id }); setRequests(current => [{ ...swap, id: swap._id, sender: user?.name || 'You', receiver: requestedItem.owner, offeredItem: offeredItem.title, requestedItem: requestedItem.title, status: swap.status, compatibilityScore: swap.compatibilityScore, createdAt: 'Just now' }, ...current]); return; } setRequests(current => [{ id: `swap-${Date.now()}`, sender: user?.name || 'L G Lithika', receiver: requestedItem.owner, offeredItem: offeredItem.title, requestedItem: requestedItem.title, status: 'pending', compatibilityScore: Math.max(70, 100 - Math.abs(offeredItem.value - requestedItem.value) * 2), createdAt: 'Just now' }, ...current]); };
  const updateSwap = async (id, status) => { setRequests(current => current.map(request => request.id === id ? { ...request, status } : request)); if (localStorage.getItem('ecoswap_token') && !String(id).startsWith('swap-')) await api.updateSwap(id, status); };
  const completeSwap = id => updateSwap(id, 'completed').then(() => setImpact(current => ({ ...current, swapsCompleted: current.swapsCompleted + 1, waterSaved: current.waterSaved + 7000, carbonReduced: current.carbonReduced + 15, pointsEarned: current.pointsEarned + 50, wasteReduced: Number((current.wasteReduced + 1.05).toFixed(1)) })));
  const sendMessage = content => setMessages(current => [...current, { id: Date.now(), sender: 'L G Lithika', content, time: 'Now' }]);
  return <MarketplaceContext.Provider value={{ listings, requests, messages, impact, addListing, updateListing, deleteListing, sendSwap, updateSwap, completeSwap, sendMessage }}>{children}</MarketplaceContext.Provider>;
}
export const useMarketplace = () => useContext(MarketplaceContext);
