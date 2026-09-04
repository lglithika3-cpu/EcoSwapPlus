import { createContext, useContext, useState } from 'react';

const MarketplaceContext = createContext(null);
const starterRequests = [{ id: 'swap-1', sender: 'Amara M.', receiver: 'L G Lithika', offeredItem: 'Moss corduroy overshirt', requestedItem: 'Sun-faded linen shirt', status: 'pending', compatibilityScore: 92, createdAt: 'Today' }];

export function MarketplaceProvider({ children }) {
  const [listings, setListings] = useState([]);
  const [requests, setRequests] = useState(starterRequests);
  const [messages, setMessages] = useState([{ id: 1, sender: 'Amara M.', content: 'Hey Lithika! I love your linen shirt. Would you be open to swapping for the corduroy overshirt?', time: '10:42' }, { id: 2, sender: 'L G Lithika', content: 'Hi Amara, the shirt is one of my favourites. I think a swap could work. Want to meet Thursday?', time: '10:44' }]);
  const [impact, setImpact] = useState({ swapsCompleted: 12, waterSaved: 84000, carbonReduced: 180, pointsEarned: 1240, wasteReduced: 12.6 });
  const addListing = listing => setListings(current => [{ ...listing, id: `user-${Date.now()}`, owner: 'L G Lithika', location: listing.location || 'Chennai', image: listing.image || '/assets/clothing-placeholder.svg' }, ...current]);
  const updateListing = (id, changes) => setListings(current => current.map(item => item.id === id ? { ...item, ...changes } : item));
  const deleteListing = id => setListings(current => current.filter(item => item.id !== id));
  const sendSwap = ({ requestedItem, offeredItem }) => setRequests(current => [{ id: `swap-${Date.now()}`, sender: 'L G Lithika', receiver: requestedItem.owner, offeredItem: offeredItem.title, requestedItem: requestedItem.title, status: 'pending', compatibilityScore: Math.max(70, 100 - Math.abs(offeredItem.value - requestedItem.value) * 2), createdAt: 'Just now' }, ...current]);
  const updateSwap = (id, status) => setRequests(current => current.map(request => request.id === id ? { ...request, status } : request));
  const completeSwap = id => { setRequests(current => current.map(request => request.id === id ? { ...request, status: 'completed' } : request)); setImpact(current => ({ ...current, swapsCompleted: current.swapsCompleted + 1, waterSaved: current.waterSaved + 7000, carbonReduced: current.carbonReduced + 15, pointsEarned: current.pointsEarned + 50, wasteReduced: Number((current.wasteReduced + 1.05).toFixed(1)) })); };
  const sendMessage = content => setMessages(current => [...current, { id: Date.now(), sender: 'L G Lithika', content, time: 'Now' }]);
  return <MarketplaceContext.Provider value={{ listings, requests, messages, impact, addListing, updateListing, deleteListing, sendSwap, updateSwap, completeSwap, sendMessage }}>{children}</MarketplaceContext.Provider>;
}
export const useMarketplace = () => useContext(MarketplaceContext);
