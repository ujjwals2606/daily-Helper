import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/register`, form);
      toast.success('OTP sent to email');
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Register failed');
    }
  };

  const onVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/verify-otp`, { email: form.email, otp });
      localStorage.setItem('dailyhelper.auth', JSON.stringify({ token: res.data.token, user: res.data.user }));
      toast.success('Verified');
      window.location.href = '/dashboard';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {step === 1 ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
          <input className="w-full border p-2 rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
          <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} />
          <select className="w-full border p-2 rounded" value={form.role} onChange={(e)=>setForm({...form, role: e.target.value})}>
            <option value="user">User</option>
            <option value="seeker">Seeker</option>
          </select>
          <button className="w-full bg-primary text-white py-2 rounded">Continue</button>
        </form>
      ) : (
        <form onSubmit={onVerify} className="space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Enter OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} />
          <button className="w-full bg-primary text-white py-2 rounded">Verify</button>
        </form>
      )}
    </div>
  );
}


