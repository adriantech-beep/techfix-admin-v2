import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { SignupForm } from "./signupSchema";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

type FieldConfig = {
  name: keyof SignupForm;
  placeholder: string;
  type: string;
};

const userInfoFields: FieldConfig[] = [
  {
    name: "name",
    placeholder: "Enter your name",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Enter email address",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Enter password",
    type: "password",
  },
  {
    name: "confirmPassword",
    placeholder: "Re-enter  password",
    type: "password",
  },
];

const SignupFields = () => {
  const { control } = useFormContext<SignupForm>();

  return (
    <div>
      {userInfoFields.map(({ name, placeholder, type }) => (
        <FormField
          key={name}
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl className="mt-5">
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  value={(field.value as string | undefined) ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage className="text-red-500 font-sans text-sm mt-0" />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default SignupFields;
