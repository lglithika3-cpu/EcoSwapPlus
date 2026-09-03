import { useState } from 'react';
import { ChevronRight, Leaf, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import './login-enhanced.css';

const copy = {
  en: { language: 'English', eyebrow: 'Private community access', title: 'Welcome to the loop.', subtitle: 'Exchange thoughtfully. Keep good clothing moving.', email: 'Email address', password: 'Password', submit: 'Sign in securely', privacy: 'Your privacy matters', privacyText: 'Your account details stay private and are used only to make your exchanges work.', encrypted: 'Encrypted in transit', encryptedText: 'Your sign-in is protected with secure encryption.', secure: 'Secure session', secureText: 'We never share your password with other members.', footer: 'By continuing, you agree to our Privacy Policy and Terms.' },
  ta: { language: 'தமிழ்', eyebrow: 'தனிப்பட்ட சமூக அணுகல்', title: 'லூப்பிற்கு வரவேற்கிறோம்.', subtitle: 'கவனமாக பரிமாறுங்கள். ஆடைகளை தொடர்ந்து பயன்படுத்துங்கள்.', email: 'மின்னஞ்சல்', password: 'கடவுச்சொல்', submit: 'பாதுகாப்பாக உள்நுழைக', privacy: 'உங்கள் தனியுரிமை முக்கியம்', privacyText: 'உங்கள் கணக்கு விவரங்கள் தனிப்பட்டவை. பரிமாற்றத்தை செயல்படுத்த மட்டுமே பயன்படுத்தப்படும்.', encrypted: 'குறியாக்கப்பட்ட இணைப்பு', encryptedText: 'உங்கள் உள்நுழைவு பாதுகாப்பான குறியாக்கத்தால் பாதுகாக்கப்படுகிறது.', secure: 'பாதுகாப்பான அமர்வு', secureText: 'உங்கள் கடவுச்சொல் மற்ற உறுப்பினர்களுடன் பகிரப்படாது.', footer: 'தொடர்வதன் மூலம் தனியுரிமைக் கொள்கை மற்றும் விதிமுறைகளை ஏற்கிறீர்கள்.' },
  hi: { language: 'हिन्दी', eyebrow: 'निजी समुदाय पहुंच', title: 'लूप में आपका स्वागत है।', subtitle: 'सोच-समझकर अदला-बदली करें। कपड़ों को आगे बढ़ाते रहें।', email: 'ईमेल पता', password: 'पासवर्ड', submit: 'सुरक्षित रूप से साइन इन करें', privacy: 'आपकी गोपनीयता महत्वपूर्ण है', privacyText: 'आपके खाते का विवरण निजी रहता है और केवल आपके आदान-प्रदान के लिए उपयोग होता है।', encrypted: 'एन्क्रिप्टेड कनेक्शन', encryptedText: 'आपका साइन-इन सुरक्षित एन्क्रिप्शन से सुरक्षित है।', secure: 'सुरक्षित सत्र', secureText: 'हम आपका पासवर्ड अन्य सदस्यों के साथ साझा नहीं करते।', footer: 'जारी रखकर, आप हमारी गोपनीयता नीति और शर्तों से सहमत होते हैं।' }
};

export default function LoginEnhanced({ onLogin }) {
  const { login } = useAuth();
  const [language, setLanguage] = useState('en');
  const [account, setAccount] = useState('lithika');
  const [password, setPassword] = useState('ecoswap-demo');
  const [error, setError] = useState('');
  const text = copy[language];
  const data = account === 'lithika'
    ? { name: 'L G Lithika', email: 'demo@ecoswap.plus', location: 'Chennai, Tamil Nadu' }
    : { name: 'Amara M.', email: 'amara@ecoswap.plus', location: 'Adyar, Chennai' };

  const submit = async event => {
    event.preventDefault();
    setError('');
    try {
      await login({ email: data.email, password });
    } catch (apiError) {
      if (password === 'ecoswap-demo') onLogin(data);
      else setError(apiError.message || 'Unable to sign in');
    }
  };

  return <div className="auth-page">
    <div className="auth-art">
      <div className="brand"><span className="brand-icon"><Leaf size={19} /></span>EcoSwap<span>+</span></div>
      <div className="auth-art-copy"><p className="eyebrow">Circular fashion, thoughtfully shared</p><h1>Your closet<br /><i>starts here.</i></h1><p>{text.subtitle}</p></div>
      <div className="auth-art-meta"><span><Leaf size={15} /> 12,400kg kept in use</span><span><ShieldCheck size={15} /> Member-first community</span></div>
    </div>
    <form className="auth-form" onSubmit={submit}>
      <div className="auth-form-top"><p className="eyebrow">{text.eyebrow}</p><label className="language-select"><span>Language</span><select value={language} onChange={event => setLanguage(event.target.value)} aria-label="Select language"><option value="en">{copy.en.language}</option><option value="ta">{copy.ta.language}</option><option value="hi">{copy.hi.language}</option></select></label></div>
      <h2>{text.title}</h2>
      <div className="account-switch"><button type="button" className={account === 'lithika' ? 'selected' : ''} onClick={() => setAccount('lithika')}>User A · Lithika</button><button type="button" className={account === 'amara' ? 'selected' : ''} onClick={() => setAccount('amara')}>User B · Amara</button></div>
      <label>{text.email}<input value={data.email} readOnly /></label>
      <label>{text.password}<input type="password" value={password} onChange={event => setPassword(event.target.value)} required /></label>
      <div className="security-grid"><div><LockKeyhole size={16} /><span><b>{text.encrypted}</b><small>{text.encryptedText}</small></span></div><div><ShieldCheck size={16} /><span><b>{text.secure}</b><small>{text.secureText}</small></span></div></div>
      {error && <p className="form-error">{error}</p>}
      <button className="button dark-button full-button">{text.submit} <ChevronRight size={16} /></button>
      <p className="privacy-note"><b>{text.privacy}</b> {text.privacyText}</p><p className="auth-legal">{text.footer}</p>
    </form>
  </div>;
}
