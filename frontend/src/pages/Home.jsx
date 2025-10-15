import { Link } from 'react-router-dom';

const images = [
  { src: 'https://images.unsplash.com/photo-1581091870622-7c74c0c4f059?q=80&w=1200&auto=format&fit=crop', caption: 'Plumber fixing a pipe' },
  { src: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=1200&auto=format&fit=crop', caption: 'Carpenter cutting wood' },
  { src: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200&auto=format&fit=crop', caption: 'Painter painting a wall' },
  { src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop', caption: 'Cleaner sweeping floor' }
];

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary to-primary-light text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">Smart Way to Get Work Done</h1>
          <p className="mt-4 text-white/90">Connect with verified local professionals for any home service.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/services" className="px-5 py-2.5 rounded bg-white text-primary font-semibold">Browse Services</Link>
            <Link to="/register" className="px-5 py-2.5 rounded border border-white">Join as Seeker</Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="relative w-full overflow-hidden rounded-lg shadow">
          <div className="flex animate-[carousel_20s_linear_infinite]" style={{ width: `${images.length * 100}%` }}>
            {images.map((img, idx) => (
              <div key={idx} className="w-full flex-[0_0_100%] relative">
                <img src={img.src} alt={img.caption} className="w-full h-64 md:h-96 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-2 text-sm">{img.caption}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes carousel { 0%{transform:translateX(0)} 25%{transform:translateX(-100%)} 50%{transform:translateX(-200%)} 75%{transform:translateX(-300%)} 100%{transform:translateX(0)} }`}</style>
      </section>
    </div>
  );
}


