import type { GuideForm } from "@/guide/guideSchema";
import { useLocation } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const ViewGuide = () => {
  const { state } = useLocation();
  const guide = state?.guide as GuideForm;

  if (!guide) return <div>No guide data available.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{guide.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
          <span>{guide.deviceType}</span>
          {guide.brand && <span>{guide.brand}</span>}
          {guide.model && <span>{guide.model}</span>}
          <span>• Author: {guide.author}</span>
          {guide.estimatedTimeMinutes && (
            <span>• {guide.estimatedTimeMinutes} mins</span>
          )}
        </div>

        <Badge variant="secondary">{guide.difficulty}</Badge>
      </header>

      {guide.summary && (
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{guide.summary}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tools Required</CardTitle>
          </CardHeader>
          <CardContent>
            {guide.tools.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {guide.tools.map((tool, i) => (
                  <li key={i}>{tool}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">No tools listed</p>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Parts Required</CardTitle>
          </CardHeader>
          <CardContent>
            {guide.parts.length > 0 ? (
              <ul className="space-y-2">
                {guide.parts.map((part, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-medium">{part.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {part.partNumber && `Part #: ${part.partNumber}`}{" "}
                      {part.qty && `Qty: ${part.qty}`}{" "}
                      {part.link && (
                        <a
                          href={part.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Link
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">No parts listed</p>
            )}
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Steps</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {guide.steps.map((step, idx) => (
            <AccordionItem key={idx} value={`step-${idx}`}>
              <AccordionTrigger>
                {step.title || `Step ${idx + 1}`}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {step.bodyMarkdown && (
                    <p className="text-muted-foreground whitespace-pre-line">
                      {step.bodyMarkdown}
                    </p>
                  )}

                  {step.warnings && (
                    <Alert variant="destructive">
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>{step.warnings}</AlertDescription>
                    </Alert>
                  )}

                  {step.expectedOutcome && (
                    <p className="text-sm font-medium">
                      ✅ Expected: {step.expectedOutcome}
                    </p>
                  )}

                  {step.toolsNeeded.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold">Tools Needed</h4>
                      <ul className="list-disc pl-5 text-sm">
                        {step.toolsNeeded.map((tool, i) => (
                          <li key={i}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Separator />

                  {step.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {step.images.map((img, i) => (
                        <figure key={i} className="space-y-1">
                          {img.url && (
                            <img
                              src={img.url}
                              alt={img.alt || ""}
                              className="rounded-md border"
                            />
                          )}
                          {img.caption && (
                            <figcaption className="text-sm text-muted-foreground">
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default ViewGuide;
