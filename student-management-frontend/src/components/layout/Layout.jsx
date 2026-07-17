import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}