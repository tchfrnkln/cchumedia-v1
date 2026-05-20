'use client';
import { useState } from 'react';
import { useStore } from '../../lib/store';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

export default function AuthModal() {
  const { showToast, closeModal } = useStore();
  const { login, signup, user } = useAuthStore();
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleLogin = async () => {
    if(form.email === user?.email){
      showToast(`Welcome back, ${user.email}! 👋`, 'success');
      return closeModal();
    }
    setErr(''); setLoading(true);
    await login(form.email, form.password)
    .then(() => {
      showToast(`Welcome back! 👋`, 'success');
      closeModal();
    })
    .catch((e) => {
      setErr(`Login failed. ${e.message}`); 
      return;
    })
    setLoading(false);
  };

  const handleRegister = async () => {    
    setErr(''); setLoading(true);
    
    await signup( form.email, form.password, form.name, "", form.phone, "")
    .then(() => {
      showToast(`Account created! Welcome! 🎉`, 'success');
      closeModal();
    })
    .catch((e) => {
      if(e.message.includes("already registered")){
        return setErr('Registration failed.');
      }else{
        return setErr(`Registration failed. ${e.message}`);
      }
    })
    setLoading(false);
  };

  const inp = 'w-full dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900 transition-all dark:text-white';

  return (
    <Modal type="auth" maxWidth="max-w-md">
      <div className="p-6 text-gray-900 dark:text-white">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-6">
          <Image src='/images/icon.png' alt="cchu media" width={50} height={50}></Image>
          <div>
            <div className="font-display font-black text-base text-gray-900 dark:text-white">PrintHub</div>
            <div className="text-xs text-gray-400">by C-Chu Media Ltd</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-200 dark:bg-gray-800 rounded-xl p-1 mb-6">
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => { setTab(t); setErr(''); }}
              className={`flex-1 py-2 text-sm font-display font-bold rounded-lg transition-all ${tab === t ? 'bg-white dark:bg-gray-900 shadow text-brand' : 'text-gray-500 hover:text-gray-700'}`}>
              {t === 'login' ? '🔑 Login' : '✨ Register'}
            </button>
          ))}
        </div>

        {err && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-sm rounded-xl border border-red-100 dark:border-red-900">
            ⚠️ {err}
          </div>
        )}

        {tab === 'login' ? (
          <form className="space-y-3" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
            <input className={inp} type="email" placeholder="Email address" value={form.email} onChange={e => set('email', e.target.value)} required/>
            <input className={inp} type="password" placeholder="Password" value={form.password} onChange={e => set('password', e.target.value)} required/>
            <Button type='submit' className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login to Account'}
            </Button>
          </form>
        ) : (
          <form className="space-y-3" onSubmit={e => { e.preventDefault(); handleRegister(); }}>
            <input className={inp} placeholder="Full name *" value={form.name} onChange={e => set('name', e.target.value)} required/>
            <input className={inp} type="email" placeholder="Email address *" value={form.email} onChange={e => set('email', e.target.value)} required/>
            <input className={inp} type="tel" placeholder="Phone number" value={form.phone} onChange={e => set('phone', e.target.value)} required/>
            <input className={inp} type="password" placeholder="Password *" value={form.password} onChange={e => set('password', e.target.value)} required/>
            <Button type='submit' className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        )}

        <p className="text-xs text-center text-gray-400 mt-4">
          By continuing you agree to our{' '}
          <span className="text-brand cursor-pointer hover:underline">Terms</span> &{' '}
          <span className="text-brand cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </Modal>
  );
}
