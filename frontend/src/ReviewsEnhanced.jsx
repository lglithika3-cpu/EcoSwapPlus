import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { api } from './api';

export default function ReviewsEnhanced() {
  const [members, setMembers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ rating:'5', comment:'' });
  useEffect(() => { api.members().then(items => { setMembers(items); if (items[0]) { setSelected(items[0]._id); return api.reviews(items[0]._id); } return []; }).then(setReviews).catch(error => setError(error.message)); }, []);
  const choose = async event => { setSelected(event.target.value); try { setReviews(await api.reviews(event.target.value)); } catch (reviewError) { setError(reviewError.message); } };
  const submit = async event => { event.preventDefault(); try { const review=await api.addReview({ seller:selected, rating:Number(form.rating), comment:form.comment }); setReviews(current => [review, ...current]); setForm({ rating:'5', comment:'' }); } catch (reviewError) { setError(reviewError.message); } };
  return <><div className="page-title"><div><p className="eyebrow">Community trust</p><h1>Reviews.</h1><p className="muted lead">See feedback from completed exchanges and share your experience.</p></div></div>{error && <p className="form-error">{error}</p>}<div className="review-layout"><section className="review-list"><label>Member<select value={selected} onChange={choose}>{members.map(member => <option value={member._id} key={member._id}>{member.name} · {member.location}</option>)}</select></label>{reviews.length ? reviews.map(review => <article className="review-row" key={review._id}><div className="avatar">{review.reviewer?.name?.split(' ').map(part => part[0]).join('').slice(0,2) || 'M'}</div><div><b>{review.reviewer?.name || 'Member'}</b><span className="review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span><p>{review.comment || 'A thoughtful exchange.'}</p></div></article>) : <p className="muted">No reviews yet for this member.</p>}</section><form className="form-shell review-form" onSubmit={submit}><h2>Leave feedback</h2><label>Rating<select value={form.rating} onChange={event => setForm({ ...form, rating:event.target.value })}>{[5,4,3,2,1].map(value => <option key={value} value={value}>{value} stars</option>)}</select></label><label>Comment<textarea value={form.comment} onChange={event => setForm({ ...form, comment:event.target.value })} maxLength="500" placeholder="Share a helpful note after your exchange." /></label><button className="button dark-button" disabled={!selected}><Star size={15}/> Submit review</button></form></div></>;
}
