import { useState } from 'react';
import { ChevronRight, Upload } from 'lucide-react';
import { api, API_ORIGIN } from './api';
import { useMarketplace } from './context/MarketplaceContext';

const initialForm = { title:'', brand:'', category:'Tops', size:'M', condition:'Excellent', value:'', location:'Chennai', description:'' };
export default function AddClothingEnhanced({ notify }) {
  const { addListing } = useMarketplace();
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async event => {
    event.preventDefault();
    setError('');
    try {
      if (Number(form.value) <= 0) throw new Error('Estimated value must be greater than zero.');
      if (file && !['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('Use a JPG, PNG, or WebP image.');
      if (file && file.size > 10 * 1024 * 1024) throw new Error('Images must be smaller than 10MB.');
      if (localStorage.getItem('ecoswap_token')) {
        const body = new FormData();
        Object.entries({ ...form, estimatedValue: form.value }).forEach(([key, value]) => body.append(key, value));
        if (file) body.append('image', file);
        const saved = await api.createListing(body);
        addListing({ ...form, id: saved._id, value: saved.estimatedValue, image: saved.image ? `${API_ORIGIN}/${saved.image.replaceAll('\\','/')}` : undefined });
      } else addListing({ ...form, value: Number(form.value) });
      setForm(initialForm); setFile(null); notify('Item added to your active closet');
    } catch (submitError) { setError(submitError.message || 'Unable to publish listing'); }
  };
  return <><div className="page-title"><div><p className="eyebrow">Grow the circulation</p><h1>List a piece.</h1><p className="muted lead">Tell the story, set a fair value, and let it travel.</p></div></div><form className="form-shell" onSubmit={submit}><div className="form-grid">{[['title','Item title','text'],['brand','Brand','text'],['value','Estimated swap value','number'],['location','Location','text']].map(([name,label,type])=><label key={name}>{label}<input name={name} type={type} value={form[name]} onChange={update} required /></label>)}<label>Category<select name="category" value={form.category} onChange={update}>{['Tops','Dresses','Outerwear','Bottoms','Accessories'].map(value => <option key={value}>{value}</option>)}</select></label><label>Size<select name="size" value={form.size} onChange={update}>{['XS','S','M','L','XL','One size'].map(value => <option key={value}>{value}</option>)}</select></label><label>Condition<select name="condition" value={form.condition} onChange={update}>{['Like new','Excellent','Good','Well loved'].map(value => <option key={value}>{value}</option>)}</select></label><label className="full">Description<textarea name="description" value={form.description} onChange={update} required /></label><label className="upload full"><Upload size={22} />{file ? file.name : 'Photo upload'}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={event => setFile(event.target.files?.[0] || null)} /></label></div>{error && <p className="form-error">{error}</p>}<button className="button dark-button">Publish listing <ChevronRight size={17} /></button></form></>;
}
