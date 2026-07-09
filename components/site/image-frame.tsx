import Image from "next/image";

import { cn } from "@/lib/utils";

type ImageFrameProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  priority?: boolean;
  sizes?: string;
};

export function ImageFrame({
  src,
  alt,
  className,
  imageClassName,
  objectPosition,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: ImageFrameProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-[18px]", className)}>
      <Image
        alt={alt}
        className={cn("object-cover", imageClassName)}
        fill
        priority={priority}
        sizes={sizes}
        src={src}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
