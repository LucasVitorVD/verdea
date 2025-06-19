import { StaticImageData } from "next/image";
import Image from "next/image";
import React from "react";

interface Props {
  imgSrc: StaticImageData;
  imgAlt: string
  title: string
  description: string
}

export default function EmptyState({ title, description, imgSrc, imgAlt }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <figure>
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={300}
          height={300}
        />
      </figure>

      <div className="text-center space-y-2">
        <p className="text-xl font-semibold">
          {title}
        </p>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}