# TODO

## Before going live

- [ ] **Gmail for the forms**: create a Google App Password and set `GMAIL_USER` and
      `GMAIL_APP_PASSWORD` (optionally `CONTACT_EMAIL`) on the host. Until then the contact
      and newsletter forms answer "could not be sent". See `.env.example` / README.
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://dawnwave.com.tr` on the host (no `www`).
- [ ] Vercel: add the Upstash for Redis integration (free tier) for shared rate limiting.
- [ ] Domain: point `dawnwave.com.tr` (and `www`, which redirects to the bare domain) to the host.

## Content

- [ ] **Videos**: replace the three Wishes of Dawn trailers in `src/data/media.ts`
      (`youTubeVideos`, video ID + title).
- [ ] Gallery: replace the placeholder photos in `public/images/gallery/` and `galleryPhotos`
      in `src/data/media.ts`.
- [ ] Team: personal photos instead of `default-avatar.jpg` (`image` in `src/data/team.ts`).
