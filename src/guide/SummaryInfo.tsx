import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import type { z } from "zod";
// import { guideSchema } from "@/guide/guideSchema";
import type { UseFormReturn } from "react-hook-form";
import type { GuideForm } from "./guideSchema";

// type GuideForm = z.infer<typeof guideSchema>;

type InputType = "text" | "number" | "email" | "password" | "date" | "select";

type FieldConfig = {
  name: keyof GuideForm;
  label: string;
  placeholder: string;
  type: InputType;
  options?: { value: string; label: string }[];
};

const summaryInfoFields: FieldConfig[] = [
  {
    name: "summary",
    label: "Summary",
    placeholder: "Enter guide summary",
    type: "text",
  },
  {
    name: "estimatedTimeMinutes",
    label: "Estimated time (minutes)",
    placeholder: "Enter estimated time",
    type: "number",
  },
  {
    name: "difficulty",
    label: "Difficulty",
    placeholder: "Select difficulty",
    type: "select",
    options: [
      { value: "Easy", label: "Easy" },
      { value: "Medium", label: "Medium" },
      { value: "Hard", label: "Hard" },
    ],
  },
  {
    name: "author",
    label: "Author",
    placeholder: "Enter author",
    type: "text",
  },
];

type SummaryInfoProps = {
  form: UseFormReturn<GuideForm>;
};

const SummaryInfo = ({ form }: SummaryInfoProps) => {
  return (
    <Card className="rounded-2xl shadow-md border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Summary Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {summaryInfoFields.map(
          ({ name, label, placeholder, type, options }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    {type === "select" ? (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {options?.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            type === "number"
                              ? e.target.value === ""
                                ? undefined
                                : e.target.valueAsNumber
                              : e.target.value
                          )
                        }
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryInfo;
