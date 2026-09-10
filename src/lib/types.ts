export type ServiceTopic =
  | "Wedding Decoration"
  | "Engagement Events"
  | "Birthday Celebrations"
  | "Reception Setup"
  | "Corporate Events"
  | "Stage Decoration"
  | "Party Planning"
  | "Event Management"
  | "Premium Decoration"
  | "General Inquiry";

export type GalleryCategory =
  | "wedding"
  | "engagement"
  | "birthday"
  | "reception"
  | "corporate"
  | "stage"
  | "party"
  | "other";

export type InquiryStatus = "new" | "replied" | "closed";

export type FrameType = "none" | "gold-hairline" | "polaroid" | "ornate" | "custom";

export interface GalleryImage {
  url: string;
  cloudinaryId: string;
}

export interface GalleryItem {
  _id: string;
  title: string;
  category: GalleryCategory;
  images: GalleryImage[];
  description?: string;
  isFeatured: boolean;
  order: number;
  frameType: FrameType;
  frameImageUrl?: string;
  frameCloudinaryId?: string;
  createdAt: string;
}

export interface Frame {
  _id: string;
  name: string;
  imageUrl: string;
  cloudinaryId: string;
  createdAt: string;
}

export const FRAME_PRESETS: { value: FrameType; label: string }[] = [
  { value: "none", label: "No frame" },
  { value: "gold-hairline", label: "Gold hairline" },
  { value: "polaroid", label: "Polaroid" },
  { value: "ornate", label: "Ornate corners" },
];

export interface Inquiry {
  _id: string;
  name: string;
  phone: string;
  email: string;
  topic: ServiceTopic;
  message: string;
  status: InquiryStatus;
  adminReply?: string;
  repliedAt?: string;
  createdAt: string;
}

export interface Service {
  title: string;
  category: GalleryCategory;
  description: string;
}

export const SERVICE_TOPICS: ServiceTopic[] = [
  "Wedding Decoration",
  "Engagement Events",
  "Birthday Celebrations",
  "Reception Setup",
  "Corporate Events",
  "Stage Decoration",
  "Party Planning",
  "Event Management",
  "Premium Decoration",
  "General Inquiry",
];

export const GALLERY_CATEGORIES: { label: string; value: GalleryCategory }[] = [
  { label: "Wedding", value: "wedding" },
  { label: "Engagement", value: "engagement" },
  { label: "Reception", value: "reception" },
  { label: "Birthday", value: "birthday" },
  { label: "Corporate", value: "corporate" },
  { label: "Stage", value: "stage" },
  { label: "Party", value: "party" },
  { label: "Other", value: "other" },
];

export const SERVICES: Service[] = [
  {
    title: "Wedding Decoration",
    category: "wedding",
    description:
      "Full-scale décor for your wedding day — mandap, entrance, aisle, and reception styling built around one cohesive palette.",
  },
  {
    title: "Engagement Events",
    category: "engagement",
    description: "Intimate, photograph-ready setups for the moment a couple says yes to forever.",
  },
  {
    title: "Reception Setup",
    category: "reception",
    description: "Stage, table, and lighting design for a reception that carries the day's story into the evening.",
  },
  {
    title: "Birthday Celebrations",
    category: "birthday",
    description: "Themed backdrops and table styling for milestone birthdays, from first to hundredth.",
  },
  {
    title: "Corporate Events",
    category: "corporate",
    description: "Clean, brand-forward staging for launches, conferences, and company celebrations.",
  },
  {
    title: "Stage Decoration",
    category: "stage",
    description: "Statement stage backdrops built to hold focus in every photo and every angle.",
  },
  {
    title: "Party Planning",
    category: "party",
    description: "End-to-end planning for private parties — concept, décor, vendors, and timing.",
  },
  {
    title: "Event Management",
    category: "other",
    description: "On-the-day coordination so the people hosting the event can actually enjoy it.",
  },
  {
    title: "Premium Decoration",
    category: "other",
    description: "Our top-tier finish — imported florals, custom installations, and fully bespoke design.",
  },
];
