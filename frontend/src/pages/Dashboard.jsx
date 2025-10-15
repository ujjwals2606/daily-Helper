import { useAuth } from '../context/AuthContext.jsx';

function UserDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold">User Dashboard</h2>
      <p className="text-slate-600">View services, make bookings, and see past feedback.</p>
    </div>
  );
}

function SeekerDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold">Seeker Dashboard</h2>
      <ul className="list-disc ml-6 text-slate-700">
        <li>Assigned service requests</li>
        <li>Total income and payment details</li>
        <li>User feedback and star ratings</li>
        <li>Total points (sum of stars)</li>
        <li>Edit profile</li>
      </ul>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <ul className="list-disc ml-6 text-slate-700">
        <li>Manage users and seekers</li>
        <li>Manage bookings, payments, and feedback</li>
        <li>Revenue split: 10% admin, 90% seeker</li>
        <li>Complaints and block frequent offenders</li>
        <li>Performance reports</li>
      </ul>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;
  if (user.role === 'admin') return <AdminDashboard />;
  if (user.role === 'seeker') return <SeekerDashboard />;
  return <UserDashboard />;
}


