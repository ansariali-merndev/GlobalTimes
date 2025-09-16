import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { FaSun, FaMoon } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { StateType } from "@/store/Type";
import { toggleTheme } from "@/store/slices/ThemeSlice";
import { FaHistory } from "react-icons/fa";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoaded, isSignedIn } = useUser();
  const dispatch = useDispatch();
  const isDark = useSelector((state: StateType) => state.theme.isDark);

  useEffect(() => {
    localStorage.setItem("isDark", String(isDark));
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const checkPathname =
      location.pathname !== "/login" && location.pathname !== "/register";

    if (checkPathname && isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [location, isLoaded, isSignedIn, navigate]);

  return (
    <header className="h-[10vh] fixed top-0 left-0 right-0 bg-[#6366F1] text-[#fff] flex items-center justify-between px-6 md:px-12 z-40">
      <NavLink to={"/"} className={"text-xl font-semibold tracking-wider"}>
        Global Times
      </NavLink>
      <nav>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => dispatch(toggleTheme())}
            className="cursor-pointer"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </Button>
          <SignedOut>
            <Button
              onClick={() => navigate("/login")}
              variant={"default"}
              className="cursor-pointer"
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="History"
                  href="/history"
                  labelIcon={<FaHistory />}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};
