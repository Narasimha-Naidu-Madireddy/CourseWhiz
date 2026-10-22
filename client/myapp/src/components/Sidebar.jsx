import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>

      <ul>
        <li>🏠 Dashboard</li>
        <li>📚 Courses</li>
        <li>📄 Documents</li>
        <li>🤖 AI Tools</li>
        <li>👤 Profile</li>
      </ul>
    </div>
  );
}

export default Sidebar;