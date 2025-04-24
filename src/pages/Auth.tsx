
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginThemeToggle } from "@/components/theme/LoginThemeToggle";
import { Link } from "react-router-dom";

const Auth = () => {
  const { user, loading, isAuthenticated, login, signup, verifyEmail } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  // If already authenticated, redirect
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setPending(false);
      return;
    }

    let resp;
    if (mode === "login") {
      resp = await login(email, password);
      if (resp.error) setError(resp.error);
    } else {
      resp = await signup(email, password);
      if (resp.error) setError(resp.error);
      else setMode("login");
    }
    setPending(false);
  };

  const handleVerifyEmail = async () => {
    await verifyEmail();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <LoginThemeToggle />
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">TenantTrackHub</CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Sign in to your account"
              : "Create an account to get started."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md text-center">
                {error}
              </div>
            )}
            <div>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={pending}
                required
              />
            </div>
            <div>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={pending}
                required
              />
            </div>
            {mode === "login" && (
              <div className="text-sm text-right">
                <Link 
                  to="/reset-password" 
                  className="text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" type="submit" disabled={pending}>
              {pending
                ? mode === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "login"
                ? "Sign In"
                : "Sign Up"}
            </Button>
            {mode === "login" && user && !user.email_confirmed_at && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleVerifyEmail}
                className="w-full mt-2"
              >
                Resend Verification Email
              </Button>
            )}
            <div className="text-center text-sm text-muted-foreground mt-1">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button 
                    type="button" 
                    onClick={() => setMode("signup")} 
                    className="underline hover:text-primary"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button 
                    type="button" 
                    onClick={() => setMode("login")} 
                    className="underline hover:text-primary"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
