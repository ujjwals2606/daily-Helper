import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Tools() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/tools`);
        setTools(res.data || []);
      } catch {
        toast.error('Failed to load tools');
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {tools.map((t) => (
        <div key={t._id} className="border rounded-lg overflow-hidden bg-white">
          <img src={t.image} alt={t.name} className="h-40 w-full object-cover" />
          <div className="p-4">
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-slate-600">{t.description}</div>
            <div className="mt-2 font-bold">₹{t.price}</div>
            <button className="mt-3 w-full border rounded py-2">Buy</button>
          </div>
        </div>
      ))}
    </div>
  );
}


