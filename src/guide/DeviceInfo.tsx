import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import type { GuideForm } from "@/guide/guideSchema";
import type { UseFormReturn } from "react-hook-form";

type FieldConfig = {
  name: keyof GuideForm; // must match a property in GuideForm
  label: string;
  placeholder: string;
  type: string;
};

const deviceInfoFields: FieldConfig[] = [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter guide title",
    type: "text",
  },
  {
    name: "deviceType",
    label: "Device Type",
    placeholder: "Enter device type",
    type: "text",
  },
  {
    name: "brand",
    label: "Brand",
    placeholder: "Enter brand",
    type: "text",
  },
  {
    name: "model",
    label: "Model",
    placeholder: "Enter model",
    type: "text",
  },
];

type DeviceInfoProps = {
  form: UseFormReturn<GuideForm>;
};

const DeviceInfo = ({ form }: DeviceInfoProps) => {
  return (
    <Card className="rounded-2xl shadow-md border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Device Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {deviceInfoFields.map(({ name, label, placeholder, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    type={type}
                    placeholder={placeholder}
                    {...field}
                    value={field.value as string | number | undefined}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default DeviceInfo;
