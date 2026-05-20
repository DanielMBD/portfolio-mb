import { useState } from "react";
import { cn } from "@/lib/utils";
import { resolveMediaUrl } from "@/services/api";

interface ProjectImageProps {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

const ProjectImage = ({
  src,
  alt,
  className,
  imageClassName,
}: ProjectImageProps) => {
  const [hasError, setHasError] = useState(false);
  const hasImage = Boolean(src?.trim()) && !hasError;

  if (!hasImage) {
    return (
      <div
        aria-label={alt}
        role="img"
        className={cn(
          "relative h-full w-full overflow-hidden bg-muted",
          className,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.34),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.22),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.88),rgba(51,65,85,0.58))]" />
        <div className="absolute inset-[-18%] scale-110 bg-[conic-gradient(from_120deg_at_50%_50%,rgba(255,255,255,0.22),rgba(148,163,184,0.18),rgba(30,41,59,0.32),rgba(255,255,255,0.22))] blur-3xl" />
        <div className="absolute inset-0 backdrop-blur-xl" />
      </div>
    );
  }

  return (
    <img
      src={resolveMediaUrl(src)}
      alt={alt}
      className={cn("h-full w-full object-cover", imageClassName)}
      onError={() => setHasError(true)}
    />
  );
};

export default ProjectImage;
