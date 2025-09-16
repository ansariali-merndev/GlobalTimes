import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Fallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return <div className="h-screen"></div>;
};
