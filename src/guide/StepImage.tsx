// import ImageMarkerForm from "./ImageMarkerForm";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// import type { GuideForm } from "./guideSchema";
// import type {
//   FieldArrayWithId,
//   UseFieldArrayRemove,
//   Control,
//   UseFormRegister,
// } from "react-hook-form";

// type StepImageProps = {
//   imageFields: FieldArrayWithId<GuideForm, `steps.${number}.images`, "id">[];
//   handleFileChange: (file: File, stepIndex: number, imgIndex: number) => void;
//   previews: Record<string, string>;
//   removeImage: UseFieldArrayRemove;
//   idx: number;
//   register: UseFormRegister<GuideForm>;
//   control: Control<GuideForm>;
// };

// const StepImage = ({
//   imageFields,
//   handleFileChange,
//   previews,
//   removeImage,
//   idx,
//   control,
//   register,
// }: StepImageProps) => {
//   return (
//     <>
//       {imageFields.map((img, imgIndex) => (
//         <div key={img.id} className="flex flex-col gap-2 w-full">
//           {/* File Input */}
//           <input
//             type="file"
//             onChange={(e) =>
//               e.target.files?.[0] &&
//               handleFileChange(e.target.files[0], idx, imgIndex)
//             }
//           />

//           {/* Preview + Marker Accordion */}
//           {previews[`${idx}-${imgIndex}`] && (
//             <Accordion
//               type="single"
//               collapsible
//               className="w-full"
//               defaultValue={`item-${imgIndex}`}
//             >
//               <AccordionItem value={`item-${imgIndex}`}>
//                 <AccordionTrigger>{`Image ${imgIndex + 1}`}</AccordionTrigger>
//                 <AccordionContent className="flex flex-col gap-4">
//                   <ImageMarkerForm
//                     previews={previews}
//                     img={img}
//                     index={idx}
//                     imgIndex={imgIndex}
//                     register={register}
//                     control={control}
//                   />
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           )}

//           {/* Remove Button */}
//           <button
//             type="button"
//             onClick={() => removeImage(imgIndex)}
//             className="text-red-500 mt-2 self-start"
//           >
//             ❌ Remove
//           </button>
//         </div>
//       ))}
//     </>
//   );
// };

// export default StepImage;
import ImageMarkerForm from "./ImageMarkerForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { GuideForm } from "./guideSchema";
import type {
  FieldArrayWithId,
  UseFieldArrayRemove,
  Control,
  UseFormRegister,
} from "react-hook-form";

type StepImageProps = {
  imageFields: FieldArrayWithId<GuideForm, `steps.${number}.images`, "id">[];
  handleFileChange: (file: File, stepIndex: number, imgIndex: number) => void;
  previews: Record<string, string>;
  removeImage: UseFieldArrayRemove;
  idx: number;
  register: UseFormRegister<GuideForm>;
  control: Control<GuideForm>;
};

const StepImage = ({
  imageFields,
  handleFileChange,
  previews,
  removeImage,
  idx,
  control,
  register,
}: StepImageProps) => {
  return (
    <>
      {imageFields.map((img, imgIndex) => (
        <div key={img.id} className="flex flex-col gap-2 w-full">
          <input
            type="file"
            onChange={(e) =>
              e.target.files?.[0] &&
              handleFileChange(e.target.files[0], idx, imgIndex)
            }
          />

          {previews[`${idx}-${imgIndex}`] && (
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={`item-${imgIndex}`}
            >
              <AccordionItem value={`item-${imgIndex}`}>
                <AccordionTrigger>{`Image ${imgIndex + 1}`}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  <ImageMarkerForm
                    previews={previews}
                    img={img}
                    index={idx}
                    imgIndex={imgIndex}
                    register={register}
                    control={control}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          <button
            type="button"
            onClick={() => removeImage(imgIndex)}
            className="text-red-500 mt-2 self-start"
          >
            ❌ Remove
          </button>
        </div>
      ))}
    </>
  );
};

export default StepImage;
