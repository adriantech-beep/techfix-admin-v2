import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    toast("Logged out successfully");
  };

  return (
    <p onClick={handleLogout} className="flex items-center gap-4">
      Logout <LogOutIcon />
    </p>
  );
};

export default LogOut;
