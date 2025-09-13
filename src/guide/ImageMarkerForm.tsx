// import {
//   useFieldArray,
//   type Control,
//   type UseFormRegister,
// } from "react-hook-form";
// import ImageMarker from "react-image-marker";

// import type { GuideForm } from "./guideSchema";

// type ImageMarkerProps = {
//   previews: Record<string, string>;
//   index: number;
//   img: GuideForm["steps"][number]["images"][number];
//   imgIndex: number;
//   register: UseFormRegister<GuideForm>;
//   control: Control<GuideForm>;
// };

// const ImageMarkerForm = ({
//   previews,
//   index,
//   img,
//   imgIndex,
//   register,
//   control,
// }: ImageMarkerProps) => {
//   // nested field array for hotspotAnnotations
//   const {
//     fields: hotspotFields,
//     append: appendHotspot,
//     remove: removeHotspot,
//   } = useFieldArray({
//     control,
//     name: `steps.${index}.images.${imgIndex}.hotspotAnnotations`,
//   });

//   return (
//     <div className="space-y-2">
//       {/* Interactive Image Marker */}
//       <ImageMarker
//         src={previews[`${index}-${imgIndex}`]}
//         markers={hotspotFields.map((point) => ({
//           top: point.y,
//           left: point.x,
//         }))}
//         onAddMarker={(marker) => {
//           appendHotspot({
//             x: Number(marker.left),
//             y: Number(marker.top),
//             note: "",
//           });
//         }}
//       />

//       {/* Hotspot Notes */}
//       {hotspotFields.map((point, hIndex) => (
//         <div key={point.id} className="flex gap-2 items-center">
//           <input
//             {...register(
//               `steps.${index}.images.${imgIndex}.hotspotAnnotations.${hIndex}.note`
//             )}
//             placeholder="Hotspot note"
//             defaultValue={point.note ?? ""}
//             className="border rounded p-1"
//           />
//           <button
//             type="button"
//             className="text-red-500"
//             onClick={() => removeHotspot(hIndex)}
//           >
//             ❌
//           </button>
//         </div>
//       ))}

//       {/* Caption & Alt fields */}
//       <input
//         {...register(`steps.${index}.images.${imgIndex}.caption` as const)}
//         placeholder="Caption"
//         defaultValue={img.caption ?? ""}
//         className="border rounded p-1 w-full"
//       />
//       <input
//         {...register(`steps.${index}.images.${imgIndex}.alt`)}
//         placeholder="Alt"
//         defaultValue={img.alt ?? ""}
//         className="border rounded p-1 w-full"
//       />
//     </div>
//   );
// };

// export default ImageMarkerForm;
import {
  useFieldArray,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import ImageMarker from "react-image-marker";
import type { GuideForm } from "./guideSchema";

type ImageMarkerProps = {
  previews: Record<string, string>;
  index: number;
  img: GuideForm["steps"][number]["images"][number];
  imgIndex: number;
  register: UseFormRegister<GuideForm>;
  control: Control<GuideForm>;
};

const ImageMarkerForm = ({
  previews,
  index,
  img,
  imgIndex,
  register,
  control,
}: ImageMarkerProps) => {
  const {
    fields: hotspotFields,
    append: appendHotspot,
    remove: removeHotspot,
  } = useFieldArray({
    control,
    name: `steps.${index}.images.${imgIndex}.hotspotAnnotations`,
  });

  return (
    <div className="space-y-2">
      <ImageMarker
        src={previews[`${index}-${imgIndex}`]}
        markers={hotspotFields.map((point) => ({
          top: point.y,
          left: point.x,
        }))}
        onAddMarker={(marker) => {
          appendHotspot({
            x: Number(marker.left),
            y: Number(marker.top),
            note: "",
          });
        }}
      />

      {hotspotFields.map((point, hIndex) => (
        <div key={point.id} className="flex gap-2 items-center">
          <input
            {...register(
              `steps.${index}.images.${imgIndex}.hotspotAnnotations.${hIndex}.note`
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
        {...register(`steps.${index}.images.${imgIndex}.caption` as const)}
        placeholder="Caption"
        defaultValue={img.caption ?? ""}
        className="border rounded p-1 w-full"
      />
      <input
        {...register(`steps.${index}.images.${imgIndex}.alt`)}
        placeholder="Alt"
        defaultValue={img.alt ?? ""}
        className="border rounded p-1 w-full"
      />
    </div>
  );
};

export default ImageMarkerForm;
