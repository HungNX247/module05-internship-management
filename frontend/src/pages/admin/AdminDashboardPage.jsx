import MainLayout from "../../layouts/MainLayout";
import "../../styles/dashboard.css";

function AdminDashboardPage() {
  return (
    <MainLayout>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Admin Overview</h1>
            <p>Welcome back, Administrator. Here's what's happening today.</p>
          </div>
          <button className="badge badge-primary" style={{ border: 'none', cursor: 'pointer', padding: '0.5rem 1rem' }}>
            Generate Report
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>👥</div>
            <div className="stat-value">1,284</div>
            <div className="stat-label">Total Users</div>
            <div className="stat-trend trend-up">↑ 12% from last month</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#10b981' }}>💼</div>
            <div className="stat-value">42</div>
            <div className="stat-label">Active Internships</div>
            <div className="stat-trend trend-up">↑ 4 this week</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef9c3', color: '#f59e0b' }}>📝</div>
            <div className="stat-value">15</div>
            <div className="stat-label">Pending Requests</div>
            <div className="stat-trend trend-down">↓ 2 from yesterday</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>🛡️</div>
            <div className="stat-value">99.9%</div>
            <div className="stat-label">System Uptime</div>
            <div className="stat-trend trend-up">Stable</div>
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="card">
            <div className="card-header">
              <h3>System Activities</h3>
              <a href="#" style={{ fontSize: '0.875rem' }}>View all</a>
            </div>
            <div className="card-body">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nguyen Van A</td>
                    <td>Updated Role: HR</td>
                    <td>2 mins ago</td>
                    <td><span className="badge badge-success">Success</span></td>
                  </tr>
                  <tr>
                    <td>System</td>
                    <td>Database Backup</td>
                    <td>45 mins ago</td>
                    <td><span className="badge badge-success">Success</span></td>
                  </tr>
                  <tr>
                    <td>Le Thi B</td>
                    <td>Login Attempt</td>
                    <td>1 hour ago</td>
                    <td><span className="badge badge-warning">Warning</span></td>
                  </tr>
                  <tr>
                    <td>Admin</td>
                    <td>Deleted User #421</td>
                    <td>3 hours ago</td>
                    <td><span className="badge badge-success">Success</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <div className="action-btn">
                  <span>➕</span>
                  Add User
                </div>
                <div className="action-btn">
                  <span>⚙️</span>
                  Settings
                </div>
                <div className="action-btn">
                  <span>📊</span>
                  Logs
                </div>
                <div className="action-btn">
                  <span>✉️</span>
                  Broadcast
                </div>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Storage Usage</h4>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '65%', height: '100%', background: '#4f46e5' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                  <span>Used: 65GB</span>
                  <span>Total: 100GB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminDashboardPage;
