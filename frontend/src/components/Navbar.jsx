import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">Daily Helper</Link>
        <nav className="flex gap-4 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-primary font-semibold' : 'text-slate-600'}>Home</NavLink>
          <NavLink to="/services" className={({isActive}) => isActive ? 'text-primary font-semibold' : 'text-slate-600'}>Services</NavLink>
          <NavLink to="/tools" className={({isActive}) => isActive ? 'text-primary font-semibold' : 'text-slate-600'}>Tools</NavLink>
          <a href="#contact" className="text-slate-600">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <NavLink to="/dashboard" className="px-3 py-1.5 rounded bg-primary text-white">Dashboard</NavLink>
              <button onClick={() => { logout(); navigate('/'); }} className="px-3 py-1.5 rounded border">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="px-3 py-1.5 rounded border">Login</NavLink>
              <NavLink to="/register" className="px-3 py-1.5 rounded bg-primary text-white">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


