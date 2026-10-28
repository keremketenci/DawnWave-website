// Gallery photos in public/images/gallery. The gallery is hidden while this is empty.
// Placeholders for now (random Unsplash photos via picsum.photos, Unsplash License).
export const galleryPhotos: string[] = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
];

export interface YouTubeVideo {
  id: string;
  title: string;
}

export const youTubeVideos: YouTubeVideo[] = [
  { id: "kszsfo2ydfU", title: "Wishes of Dawn - Official Trailer" },
  { id: "42XXGTINTzg", title: "Wishes of Dawn - Official Alpha Preview" },
  { id: "aGqMDtUQPKk", title: "Wishes of Dawn | Alpha Gameplay Trailer" },
];
