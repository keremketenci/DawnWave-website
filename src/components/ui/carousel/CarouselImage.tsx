"use client";

// react
import { useEffect, useState } from "react";

// next
import Image from "next/image";

// embla carousel
import Autoplay from "embla-carousel-autoplay";

// components ui
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel";

// hooks & utils
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CarouselImageProps {
  images: string[];
  alt: string;
}

export function CarouselImage({ images, alt }: CarouselImageProps) {
  // Created once; the plugin instance must stay stable across renders.
  const [plugin] = useState(() => Autoplay({ delay: 5000, stopOnInteraction: true }));
  const reducedMotion = usePrefersReducedMotion();

  // No automatic sliding for visitors who prefer reduced motion.
  useEffect(() => {
    if (reducedMotion) plugin.stop();
  }, [plugin, reducedMotion]);

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[plugin]}
      onMouseEnter={() => plugin.stop()}
      onMouseLeave={() => !reducedMotion && plugin.play()}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={image}
            className="flex items-center w-full h-[210px] 2xs:h-[330px] xs:h-[440px] sm:h-[530px] md:h-[min(710px,calc(100svh-10rem))] basis-[100%] xl:basis-[80%]"
          >
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                sizes="(min-width: 1280px) 80vw, 100vw"
                className="object-contain lg:object-cover rounded-xl"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center my-2">
        <CarouselPrevious className="border-slate-800 bg-slate-950 text-white hover:bg-accent hover:text-black mx-1" />
        <CarouselNext className="border-slate-800 bg-slate-950 text-white hover:bg-accent hover:text-black mx-1" />
      </div>
    </Carousel>
  );
}
