import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
    navigate("/admin");
  };

  return (
    <button
      className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600"
      onClick={logout}
    >
      Log Out
    </button>
  );
};
