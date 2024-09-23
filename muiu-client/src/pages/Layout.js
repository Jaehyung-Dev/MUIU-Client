import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/main">Main Screen</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/join">Join</Link></li>
            <li><Link to="/mypage">My Page</Link></li>
            <li><Link to="/mind-check">Mind Check</Link></li>
            <li><Link to="/human-counseling">Human Counseling</Link></li>
            <li><Link to="/ai-counseling">AI Counseling</Link></li>
            <li><Link to="/my-diary">My Diary</Link></li>
            <li><Link to="/mind-column">Mind Column</Link></li>
            <li><Link to="/disaster-mental-health-manual">Disaster Mental Health Manual</Link></li>
            <li><Link to="/disaster-guide">Disaster Guide</Link></li>
            <li><Link to="/disaster-safety-store">Disaster Safety Store</Link></li>
            <li><Link to="/hospital-shelter-info">Hospital-Shelter Info</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
