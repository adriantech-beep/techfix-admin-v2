import { useFieldArray, useFormContext } from "react-hook-form";
import ImageMarker from "react-image-marker";
import type { GuideForm } from "./guideSchema";

type Props = {
  stepIndex: number;
  imgIndex: number;
  previewUrl?: string; // optional preview URL, provided by StepImage
};

const ImageMarkerForm = ({ stepIndex, imgIndex, previewUrl }: Props) => {
  const { control, register } = useFormContext<GuideForm>();

  const {
    fields: hotspotFields,
    append: appendHotspot,
    remove: removeHotspot,
  } = useFieldArray({
    control,
    name: `steps.${stepIndex}.images.${imgIndex}.hotspotAnnotations`,
  });

  return (
    <div className="space-y-2">
      {previewUrl ? (
        <ImageMarker
          src={previewUrl}
          markers={hotspotFields.map((p) => ({ top: p.y, left: p.x }))}
          onAddMarker={(marker) => {
            appendHotspot({
              x: Number(marker.left),
              y: Number(marker.top),
              note: "",
            });
          }}
        />
      ) : (
        <div className="text-sm italic">Upload an image to add markers.</div>
      )}

      {hotspotFields.map((point, hIndex) => (
        <div key={point.id} className="flex gap-2 items-center">
          <input
            {...register(
              `steps.${stepIndex}.images.${imgIndex}.hotspotAnnotations.${hIndex}.note` as const
            )}
            placeholder="Hotspot note"
            defaultValue={point.note ?? ""}
            className="border rounded p-1"
          />
          <button
            type="button"
            className="text-red-500"
            onClick={() => removeHotspot(hIndex)}
          >
            ❌
          </button>
        </div>
      ))}

      <input
        {...register(`steps.${stepIndex}.images.${imgIndex}.caption` as const)}
        placeholder="Caption"
        defaultValue=""
        className="border rounded p-1 w-full"
      />

      <input
        {...register(`steps.${stepIndex}.images.${imgIndex}.alt` as const)}
        placeholder="Alt text"
        defaultValue=""
        className="border rounded p-1 w-full"
      />
    </div>
  );
};

export default ImageMarkerForm;
