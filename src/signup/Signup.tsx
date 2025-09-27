import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { signupSchema, type SignupForm } from "./signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link } from "react-router-dom";
import HeroImage from "../assets/TechFix-AI.png";
import SignupFields from "./SignupFields";
import { useSignup } from "./useSignup";

const Signup = () => {
  const { mutate: signup } = useSignup();
  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupForm) => {
    signup(data);
  };
  return (
    <FormProvider {...form}>
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white shadow rounded-lg overflow-hidden">
        <div
          className="hidden md:block w-sm bg-cover bg-center"
          style={{ backgroundImage: `url(${HeroImage})` }}
        />
        <div className="flex items-center justify-center w-full md:w-1/2 p-6">
          <Card className="w-full max-w-sm border-none shadow-none">
            <CardContent className="p-6 space-y-5">
              <h2 className="text-2xl font-bold text-center mb-4">
                Create an Account
              </h2>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <SignupFields />

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Register
                </Button>
              </form>

              <p className="text-center text-sm text-gray-600">
                Already have an account?
                <Link to="/login" className="text-blue-500 underline">
                  SignIn
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </FormProvider>
  );
};

export default Signup;
