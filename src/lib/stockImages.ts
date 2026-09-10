import { GalleryCategory } from "./types";

export const CATEGORY_IMAGES: Record<GalleryCategory, string> = {
  wedding: "/images/stock/wedding.jpg",
  engagement: "/images/stock/engagement.jpg",
  birthday: "/images/stock/birthday.jpg",
  reception: "/images/stock/reception.jpg",
  corporate: "/images/stock/corporate.jpg",
  stage: "/images/stock/stage.jpg",
  party: "/images/stock/party.jpg",
  other: "/images/stock/other.jpg",
};

export const CATEGORY_IMAGE_LIST = Object.values(CATEGORY_IMAGES);

export const PAGE_IMAGES = {
  hero: "/images/stock/wedding.jpg",
  about: "/images/stock/about.jpg",
  services: "/images/stock/stage.jpg",
  gallery: "/images/stock/reception.jpg",
  contact: "/images/stock/contact.jpg",
};

export const SERVICE_IMAGES: Record<string, string> = {
  "Wedding Decoration": "/images/stock/wedding.jpg",
  "Engagement Events": "/images/stock/engagement.jpg",
  "Reception Setup": "/images/stock/reception.jpg",
  "Birthday Celebrations": "/images/stock/birthday.jpg",
  "Corporate Events": "/images/stock/corporate.jpg",
  "Stage Decoration": "/images/stock/stage.jpg",
  "Party Planning": "/images/stock/party.jpg",
  "Event Management": "/images/stock/about.jpg",
  "Premium Decoration": "/images/stock/other.jpg",
};
