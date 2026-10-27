"use client";

// react
import { useState } from "react";

// next
import Image from "next/image";

interface YouTubeFacadeProps {
  id: string;
  title: string;
  playLabel: string;
}

/**
 * Shows the video thumbnail with a play button and only loads the YouTube player
 * (~1 MB of scripts) after the visitor clicks it.
 */
export function YouTubeFacade({ id, title, playLabel }: YouTubeFacadeProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        className="w-full h-full border-0"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={`${playLabel}: ${title}`}
      className="group relative block w-full h-full overflow-hidden bg-black"
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt=""
        fill
        sizes="100vw"
        className="object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-linear-to-b from-black/70 via-transparent to-black/30" />
      <span className="absolute top-0 left-0 right-0 p-4 text-left text-lg md:text-2xl font-semibold text-white">
        {title}
      </span>
      <span className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 68 48"
          className="w-16 md:w-20 drop-shadow-lg motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110"
          aria-hidden="true"
        >
          <path
            d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
            className="fill-[#ff0000] opacity-90 group-hover:opacity-100"
          />
          <path d="M45 24 27 14v20" fill="#fff" />
        </svg>
      </span>
    </button>
  );
}
