import MainLayout from "../../layouts/MainLayout";
import "../../styles/dashboard.css";

function InternDashboardPage() {
  return (
    <MainLayout>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>My Learning Journey</h1>
            <p>You are 65% through your "Frontend Development" internship.</p>
          </div>
          <button className="badge badge-success" style={{ border: 'none', cursor: 'pointer', padding: '0.5rem 1rem' }}>
            Submit Weekly Report
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>⏳</div>
            <div className="stat-value">8/12</div>
            <div className="stat-label">Weeks Completed</div>
            <div className="stat-trend trend-up">Keep going!</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#10b981' }}>✅</div>
            <div className="stat-value">24</div>
            <div className="stat-label">Tasks Completed</div>
            <div className="stat-trend trend-up">↑ 3 this week</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef9c3', color: '#f59e0b' }}>⭐</div>
            <div className="stat-value">4.5</div>
            <div className="stat-label">Mentor Rating</div>
            <div className="stat-trend">Top 10%</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>📅</div>
            <div className="stat-value">2</div>
            <div className="stat-label">Upcoming Deadlines</div>
            <div className="stat-trend trend-down">Next: tomorrow</div>
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="card">
            <div className="card-header">
              <h3>My Current Tasks</h3>
              <a href="#" style={{ fontSize: '0.875rem' }}>View all</a>
            </div>
            <div className="card-body">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Build Responsive Header</td>
                    <td>Today, 5:00 PM</td>
                    <td><span className="badge badge-primary">In Progress</span></td>
                  </tr>
                  <tr>
                    <td>API Integration - User Module</td>
                    <td>May 18, 2026</td>
                    <td><span className="badge badge-warning">Pending</span></td>
                  </tr>
                  <tr>
                    <td>Write Unit Tests for Auth</td>
                    <td>May 20, 2026</td>
                    <td><span className="badge badge-warning">Pending</span></td>
                  </tr>
                  <tr>
                    <td>Setup Project Structure</td>
                    <td>Finished</td>
                    <td><span className="badge badge-success">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Resources & Tools</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <div className="action-btn">
                  <span>📚</span>
                  Guidelines
                </div>
                <div className="action-btn">
                  <span>🛠️</span>
                  Dev Tools
                </div>
                <div className="action-btn">
                  <span>💬</span>
                  Mentor Chat
                </div>
                <div className="action-btn">
                  <span>📁</span>
                  Project Docs
                </div>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Overall Progress</h4>
                <div style={{ height: '20px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #4f46e5, #818cf8)' }}></div>
                  <span style={{ position: 'absolute', right: '10px', top: '0', fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>65%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default InternDashboardPage;
