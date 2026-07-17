import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

export default function Navbar() {
    const navigate = useNavigate();
    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    }

    const handleLogout = () => {
        logoutUser();
        navigate("/");
    };

    return (
        <header className="navbar">
            <div>
                <h2>{greeting} 👋</h2>
                <p>Welcome back, Admin</p>
            </div>

            <div className="navbar-right">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search..." />
                </div>

                <Bell size={22} />
                <button className="secondary-btn" onClick={handleLogout}>Logout</button>
                <div className="avatar">A</div>
            </div>
        </header>
    );
}