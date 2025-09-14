import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import type { GuideForm } from "./guideSchema";

type FieldConfig = {
  id: string;
  label: string;
};

const listOfTools: FieldConfig[] = [
  { id: "Type C cable", label: "Type C cable" },
  {
    id: "Precision Screwdriver Set (Phillips, Torx, Pentalobe, Tri-Point, Flathead)",
    label:
      "Precision Screwdriver Set (Phillips, Torx, Pentalobe, Tri-Point, Flathead)",
  },
  {
    id: "Plastic Pry Tools / Spudger (to safely open casing without scratching)",
    label:
      "Plastic Pry Tools / Spudger (to safely open casing without scratching)",
  },
  {
    id: "Plastic Opening Picks (guitar-pick style for sliding between seams)",
    label:
      "Plastic Opening Picks (guitar-pick style for sliding between seams)",
  },
  {
    id: "Suction Cup Tool (to lift glass or screen assembly)",
    label: "Suction Cup Tool (to lift glass or screen assembly)",
  },
  {
    id: "SIM Ejector Tool (for SIM and SD card trays)",
    label: "SIM Ejector Tool (for SIM and SD card trays)",
  },
  {
    id: "Tweezers (fine-tip, ESD-safe, for handling screws and connectors)",
    label: "Tweezers (fine-tip, ESD-safe, for handling screws and connectors)",
  },
  {
    id: "Magnetic Project Mat / Screw Organizer (to keep screws sorted)",
    label: "Magnetic Project Mat / Screw Organizer (to keep screws sorted)",
  },
  {
    id: "Nylon or Metal Spudger (for stubborn connectors or shielding)",
    label: "Nylon or Metal Spudger (for stubborn connectors or shielding)",
  },
  {
    id: "Anti-Static Wrist Strap (to prevent static discharge damage)",
    label: "Anti-Static Wrist Strap (to prevent static discharge damage)",
  },
  {
    id: "Plastic Card (for removing batteries glued with adhesive)",
    label: "Plastic Card (for removing batteries glued with adhesive)",
  },
  {
    id: "Small Heat Pad / Heat Gun / Hair Dryer (to soften adhesive for screen or back glass removal)",
    label:
      "Small Heat Pad / Heat Gun / Hair Dryer (to soften adhesive for screen or back glass removal)",
  },
  {
    id: "Plastic Clamp (to hold parts together during reassembly with adhesive)",
    label:
      "Plastic Clamp (to hold parts together during reassembly with adhesive)",
  },
  {
    id: "iSclack or Screen Separator Tool (for safe screen lifting)",
    label: "iSclack or Screen Separator Tool (for safe screen lifting)",
  },
  {
    id: "Hot Air Rework Station (for soldering/desoldering chips and connectors)",
    label:
      "Hot Air Rework Station (for soldering/desoldering chips and connectors)",
  },
  {
    id: "Microscope or Magnifying Glass (for board-level work)",
    label: "Microscope or Magnifying Glass (for board-level work)",
  },
  {
    id: "Ultrasonic Cleaner (for water-damaged parts cleaning)",
    label: "Ultrasonic Cleaner (for water-damaged parts cleaning)",
  },
  {
    id: "B7000 / T7000 Adhesive (for sealing glass, screens, or frames)",
    label: "B7000 / T7000 Adhesive (for sealing glass, screens, or frames)",
  },
  {
    id: "Precision Knife / Razor Blade (to cut adhesive carefully)",
    label: "Precision Knife / Razor Blade (to cut adhesive carefully)",
  },
];

const ToolsSelector = () => {
  const { control } = useFormContext<GuideForm>();

  return (
    <FormField<GuideForm, "tools">
      control={control}
      name="tools"
      render={({ field }) => {
        const value = field.value ?? [];

        return (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Select Tools</FormLabel>
              <FormDescription>
                Select the tools you want to add.
              </FormDescription>
            </div>

            {listOfTools.map((tool) => (
              <FormItem
                key={tool.id}
                className="flex flex-row items-center gap-2"
              >
                <FormControl>
                  <Checkbox
                    checked={value.includes(tool.id)}
                    onCheckedChange={(checked) => {
                      const updated = checked
                        ? [...value, tool.id]
                        : value.filter((id) => id !== tool.id);

                      field.onChange(updated);
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {tool.label}
                </FormLabel>
              </FormItem>
            ))}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ToolsSelector;
