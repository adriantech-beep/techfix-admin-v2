import type { GuideForm } from "./guideSchema";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Part = {
  name: string;
  partNumber?: string;
  qty?: number;
  link?: string;
};

const listOfParts = {
  cellphone: {
    display: [
      "LCD / OLED Panel",
      "Digitizer (Touchscreen Glass)",
      "Display Flex Cable",
    ],
    battery: [
      "Lithium-ion Battery Pack",
      "Battery Adhesive Strips / Double-sided Tape",
    ],
    mainParts: [
      "Mainboard (Logic Board)",
      "Charging Port / USB-C / Lightning Connector",
      "Power Management IC (PMIC)",
      "Audio IC / Codec Chip",
      "Baseband / Modem Chip",
      "Memory (eMMC / UFS Storage)",
      "RAM Chip",
      "CPU / SoC (System-on-Chip)",
      "WiFi / Bluetooth IC",
    ],
    camerasSensors: [
      "Front Camera Module",
      "Rear Camera Module",
      "Proximity / Light Sensor",
      "Fingerprint Sensor / Touch ID",
    ],
    replaceable: [
      "Loudspeaker Module",
      "Earpiece Speaker",
      "Microphone",
      "Vibration Motor / Haptic Engine",
      "SIM Card Tray",
      "Antenna Cables",
    ],
    consumables: [
      "Adhesive Tapes (screen, battery, waterproof sealing)",
      "Rubber Gaskets / Seals",
      "Foam Pads (insulation / pressure)",
      "Thermal Pads / Thermal Paste",
    ],
  },

  laptop: {
    display: [
      "LCD Panel",
      "LCD / Display Cable (LVDS / eDP)",
      "Screen Hinges",
      "Bezel / Cover Adhesive Strips",
    ],
    battery: [
      "Lithium-ion Battery Pack",
      "DC Jack / Charging Port",
      "Power Management IC",
    ],
    mainParts: [
      "Motherboard",
      "CPU (Soldered or Socketed)",
      "GPU Chip",
      "RAM Modules (DDR3/DDR4/DDR5)",
      "Storage (HDD / SSD / NVMe)",
      "BIOS / CMOS Battery",
    ],
    cooling: ["Cooling Fan", "Heat Sink", "Thermal Pads / Thermal Paste"],
    inputAudio: [
      "Keyboard Assembly",
      "Trackpad / Touchpad",
      "Speakers",
      "Microphone",
      "Webcam Module",
    ],
    connectivity: [
      "WiFi / Bluetooth Card (M.2 or mini PCIe)",
      "Antenna Cables",
      "USB Ports / HDMI / Ethernet Port",
    ],
    replaceable: [
      "Optical Drive (older models)",
      "Hard Drive Caddy / Brackets",
    ],
    consumables: [
      "Rubber Feet (bottom cover)",
      "Screws (Phillips, Torx, Pentalobe, etc.)",
      "Insulation Tapes (Kapton, Electrical Tape)",
      "Adhesive Strips (battery / display)",
    ],
  },
};

type PartsSelectorProps = {
  form: UseFormReturn<GuideForm>;
};

type DeviceType = keyof typeof listOfParts;

const PartsSelector = ({ form }: PartsSelectorProps) => {
  const selectedParts = form.watch("parts") || [];
  const deviceType = form.watch("deviceType") as DeviceType | "";

  const updatePart = (index: number, key: keyof Part, value: string) => {
    const updated = [...selectedParts];
    updated[index] = {
      ...updated[index],
      [key]: key === "qty" ? Number(value) || 1 : value,
    };
    form.setValue("parts", updated, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const togglePart = (name: string, checked: boolean) => {
    let updated: Part[];
    if (checked) {
      updated = [...selectedParts, { name, partNumber: "", qty: 1, link: "" }];
    } else {
      updated = selectedParts.filter((p) => p.name !== name);
    }
    form.setValue("parts", updated, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const isPartSelected = (name: string) =>
    selectedParts.some((p) => p.name === name);

  return (
    <Card className="shadow-lg rounded-2xl border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Parts Selector</CardTitle>
        <CardDescription>
          Choose device type and select the parts you need
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="deviceType"
          render={({ field }) => (
            <FormItem className="max-w-xs">
              <FormLabel>Device Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cellphone">Cellphone</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parts by category */}
        {deviceType &&
          Object.entries(listOfParts[deviceType] || {}).map(
            ([category, parts]) => (
              <div
                key={category}
                className="rounded-lg border p-4 bg-muted/30 space-y-4"
              >
                <h3 className="text-base font-medium capitalize border-b pb-2">
                  {category}
                </h3>

                <div className="space-y-3">
                  {parts.map((p) => {
                    const checked = isPartSelected(p);
                    const partIndex = selectedParts.findIndex(
                      (sp) => sp.name === p
                    );
                    const part =
                      partIndex >= 0 ? selectedParts[partIndex] : undefined;

                    return (
                      <FormItem key={p} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(v) => togglePart(p, v === true)}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {p}
                          </FormLabel>
                        </div>

                        {checked && part && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pl-7">
                            <FormField
                              control={form.control}
                              name={`parts.${partIndex}.partNumber`}
                              render={() => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Part Number"
                                      value={part.partNumber ?? ""}
                                      onChange={(e) =>
                                        updatePart(
                                          partIndex,
                                          "partNumber",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`parts.${partIndex}.qty`}
                              render={() => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Qty"
                                      value={part.qty ?? 1}
                                      onChange={(e) =>
                                        updatePart(
                                          partIndex,
                                          "qty",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`parts.${partIndex}.link`}
                              render={() => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Link"
                                      value={part.link ?? ""}
                                      onChange={(e) =>
                                        updatePart(
                                          partIndex,
                                          "link",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </FormItem>
                    );
                  })}
                </div>
              </div>
            )
          )}
      </CardContent>
    </Card>
  );
};

export default PartsSelector;
