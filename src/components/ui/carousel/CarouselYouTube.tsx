// react
// import { useRef } from "react";

// embla carousel
// import Autoplay from "embla-carousel-autoplay";
// (Autoplay is disabled. To re-enable it, restore these imports, add "use client"
// at the top of the file and uncomment the plugin code below.)

// components ui
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel";
import { YouTubeFacade } from "@/components/ui/carousel/YouTubeFacade";

// data
import type { YouTubeVideo } from "@/data/media";

interface CarouselYouTubeProps {
  videos: YouTubeVideo[];
  playLabel: string;
}

export function CarouselYouTube({ videos, playLabel }: CarouselYouTubeProps) {
  // const plugin = useRef(
  //     Autoplay({ delay: 5000, stopOnInteraction: true })
  // )

  return (
    <Carousel
      opts={{
        align: "center",
        loop: false,
      }}
      // plugins={[plugin.current]}
      // onMouseEnter={() => plugin.current.stop()}
      // onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent>
        {videos.map((video) => (
          <CarouselItem
            key={video.id}
            className="flex items-center h-[400px] 2xs:h-[450px] xs:h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px]"
          >
            <YouTubeFacade id={video.id} title={video.title} playLabel={playLabel} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center my-2">
        <CarouselPrevious className="border-slate-800 bg-slate-950 text-white hover:bg-accent hover:text-white mx-1" />
        <CarouselNext className="border-slate-800 bg-slate-950 text-white hover:bg-accent hover:text-white mx-1" />
      </div>
    </Carousel>
  );
}
