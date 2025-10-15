import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/services`);
        setServices(res.data || []);
      } catch {
        toast.error('Failed to load services');
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {services.map((s) => (
        <div key={s._id} className="border rounded-lg overflow-hidden bg-white">
          <img src={s.image} alt={s.title} className="h-40 w-full object-cover" />
          <div className="p-4">
            <div className="font-semibold">{s.title}</div>
            <div className="text-sm text-slate-600">{s.description}</div>
            <div className="mt-2 font-bold">₹{s.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


