import MainLayout from "../../layouts/MainLayout";
import "../../styles/dashboard.css";

function HrDashboardPage() {
  return (
    <MainLayout>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Recruitment Hub</h1>
            <p>Welcome back! You have 3 new internship applications to review.</p>
          </div>
          <button className="badge badge-primary" style={{ border: 'none', cursor: 'pointer', padding: '0.5rem 1rem' }}>
            + Post New Vacancy
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>👨‍🎓</div>
            <div className="stat-value">85</div>
            <div className="stat-label">Active Interns</div>
            <div className="stat-trend trend-up">↑ 8 this month</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#10b981' }}>🏢</div>
            <div className="stat-value">24</div>
            <div className="stat-label">Partner Companies</div>
            <div className="stat-trend">Stable</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef9c3', color: '#f59e0b' }}>📋</div>
            <div className="stat-value">12</div>
            <div className="stat-label">Open Vacancies</div>
            <div className="stat-trend trend-up">↑ 2 new today</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>⌛</div>
            <div className="stat-value">3.2 days</div>
            <div className="stat-label">Avg. Hire Time</div>
            <div className="stat-trend trend-down">↓ 0.5 days</div>
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="card">
            <div className="card-header">
              <h3>Upcoming Interviews</h3>
              <a href="#" style={{ fontSize: '0.875rem' }}>Full schedule</a>
            </div>
            <div className="card-body">
              <ul className="activity-list">
                <li className="activity-item">
                  <div className="activity-dot" style={{ background: '#4f46e5' }}></div>
                  <div className="activity-content">
                    <div className="activity-title">Interview with Tran Van C - Frontend Intern</div>
                    <div className="activity-time">Today, 2:00 PM • Google Meet</div>
                  </div>
                  <span className="badge badge-primary">Soon</span>
                </li>
                <li className="activity-item">
                  <div className="activity-dot" style={{ background: '#10b981' }}></div>
                  <div className="activity-content">
                    <div className="activity-title">Final Review: Le Thi D - Backend Intern</div>
                    <div className="activity-time">Tomorrow, 10:30 AM • Room 302</div>
                  </div>
                </li>
                <li className="activity-item">
                  <div className="activity-dot" style={{ background: '#f59e0b' }}></div>
                  <div className="activity-content">
                    <div className="activity-title">HR sync with Mentor: Hoang Anh</div>
                    <div className="activity-time">May 16, 9:00 AM • Zoom</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>HR Quick Tools</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <div className="action-btn">
                  <span>📄</span>
                  Contracts
                </div>
                <div className="action-btn">
                  <span>📅</span>
                  Events
                </div>
                <div className="action-btn">
                  <span>📈</span>
                  Reports
                </div>
                <div className="action-btn">
                  <span>💡</span>
                  Talent Pool
                </div>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Intern Satisfaction</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>4.8</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Out of 5.0<br/>
                    Based on 42 reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HrDashboardPage;
