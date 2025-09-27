import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { LoginForm } from "./loginSchema";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type FieldConfig = {
  name: keyof LoginForm;
  placeholder: string;
  type: string;
};

const userInfoFields: FieldConfig[] = [
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
];

const LoginFields = () => {
  const { control } = useFormContext<LoginForm>();
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

export default LoginFields;
