import { useEffect, useState } from 'react';
import { ShieldCheck, Trash2, Users, PackagePlus } from 'lucide-react';
import { api } from './api';

export default function AdminEnhanced() {
  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { Promise.all([api.adminSummary(), api.adminUsers(), api.adminListings()]).then(([stats, members, items]) => { setSummary(stats); setUsers(members); setListings(items); }).catch(error => setError(error.message)); }, []);
  const removeListing = async id => { try { await api.adminDeleteListing(id); setListings(current => current.filter(item => item._id !== id)); } catch (removeError) { setError(removeError.message); } };
  return <><div className="page-title"><div><p className="eyebrow">Platform operations</p><h1>Admin control room.</h1><p className="muted lead">Review members and keep the community closet healthy.</p></div></div>{error && <p className="form-error">{error}</p>}<div className="stats-grid admin-stats">{[["Registered users",summary?.users ?? '...',Users],["Live listings",summary?.listings ?? '...',PackagePlus],["Completed swaps",summary?.swaps ?? '...',ShieldCheck]].map(([label,value,Icon])=><div className="stat-card" key={label}><div className="stat-top"><span className="eyebrow">{label}</span><Icon size={17}/></div><strong>{value}</strong><small>Live from MongoDB</small></div>)}</div><div className="admin-tables"><section><div className="section-head"><h2>Members ({users.length})</h2></div>{users.map(member => <div className="admin-row" key={member._id}><div className="avatar">{member.name.split(' ').map(part => part[0]).join('').slice(0,2)}</div><span><b>{member.name}</b><small>{member.email} · {member.location}</small></span><em>{member.role}</em></div>)}</section><section><div className="section-head"><h2>Live listings ({listings.length})</h2></div>{listings.map(item => <div className="admin-row" key={item._id}><PackagePlus size={17}/><span><b>{item.title}</b><small>{item.owner?.name || 'Member'} · {item.category} · {item.location}</small></span><button className="delete-button" onClick={() => removeListing(item._id)} aria-label={`Remove ${item.title}`}><Trash2 size={15}/></button></div>)}</section></div></>;
}
