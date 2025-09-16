import { ClerkLoaded, ClerkLoading, SignIn, SignUp } from "@clerk/clerk-react";
import { Skeleton } from "../ui/skeleton";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Authenticate = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location]);

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="mt-10">
        <ClerkLoading>
          <Skeleton
            className={`${isLogin ? "h-120" : "h-140"} w-110 rounded-lg`}
          />
        </ClerkLoading>
        <ClerkLoaded>
          {isLogin ? (
            <SignIn
              path="/login"
              routing="path"
              signUpUrl="/register"
              forceRedirectUrl={"/"}
            />
          ) : (
            <SignUp
              path="/register"
              routing="path"
              signInUrl="/login"
              forceRedirectUrl={"/"}
            />
          )}
        </ClerkLoaded>
      </div>
    </section>
  );
};
