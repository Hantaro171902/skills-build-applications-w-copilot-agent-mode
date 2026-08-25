import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navigation = [
  ['Users', '/users'],
  ['Activities', '/activities'],
  ['Teams', '/teams'],
  ['Leaderboard', '/leaderboard'],
  ['Workouts', '/workouts'],
];

export default function App() {
  return (
    <div className="container py-4">
      <header className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <h1 className="h3 mb-0">OctoFit Tracker</h1>
        <nav className="nav nav-pills" aria-label="Main navigation">
          {navigation.map(([label, path]) => (
            <NavLink className="nav-link" to={path} key={path}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}
