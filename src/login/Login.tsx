import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { Link } from "react-router-dom";
import HeroImage from "../assets/TechFix-AI.png";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { type LoginForm, loginSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginFields from "./LoginFields";
import { Button } from "@/components/ui/button";
import { useLogin } from "./useLogin";
// import type { GoogleCredentialResponse } from "@/services/apiGoogle";
import { useGoogle } from "./useGoogleLogin";

const Login = () => {
  const { mutate: login } = useLogin();
  const { mutate: googleLogin } = useGoogle();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    login(data);
  };

  const handleGoogleSuccess = (CredentialResponse: CredentialResponse) => {
    googleLogin(CredentialResponse);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row w-full max-w-3xl bg-white shadow rounded-lg overflow-hidden"
      >
        <div
          className="hidden md:block w-sm bg-cover bg-center"
          style={{ backgroundImage: `url(${HeroImage})` }}
        />

        <div className="flex items-center justify-center w-full md:w-1/2 p-6">
          <Card className="w-full max-w-sm border-none shadow-none">
            <CardContent className="p-6 space-y-5">
              <h2 className="text-2xl font-bold text-center mb-4">
                Sign In to Your Account
              </h2>

              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.error("Google login error")}
              />

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="flex-grow border-t" />
                <span>OR</span>
                <div className="flex-grow border-t" />
              </div>

              <LoginFields />

              <Button type="submit" className="w-full">
                Log-in
              </Button>

              <p className="text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-blue-500 underline">
                  Register
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};

export default Login;
