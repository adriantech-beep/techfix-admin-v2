import { Button } from "@/components/ui/button";
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
    <Button onClick={handleLogout} className="mt-auto mb-2 rounded-full">
      Logout
    </Button>
  );
};

export default LogOut;
