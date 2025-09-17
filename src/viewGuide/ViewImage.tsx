import type { GuideForm } from "@/guide/guideSchema";

type ViewImageProps = {
  step: GuideForm["steps"][number];
};

const ViewImage = ({ step }: ViewImageProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {step.images.map((img, i) => (
        <figure key={i} className="space-y-1">
          {img.url && (
            <div className="relative inline-block">
              <img
                src={img.url}
                alt={img.alt || ""}
                className="rounded-md border max-w-full h-auto"
              />
              {img.hotspotAnnotations?.map((spot, j) => (
                <div
                  key={j}
                  className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white cursor-pointer"
                  style={{
                    top: `${spot.y}%`,
                    left: `${spot.x}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  title={spot.note}
                />
              ))}
            </div>
          )}
          {img.caption && (
            <figcaption className="text-sm text-muted-foreground">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};

export default ViewImage;
