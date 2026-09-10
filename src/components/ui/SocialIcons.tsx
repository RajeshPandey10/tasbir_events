import { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M15 8.5h2V5.2h-2.3C12.6 5.2 11 6.8 11 9v2.2H9V14h2v7h2.8v-7h2.2l.5-2.8h-2.7V9c0-.4.3-.5.5-.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M14 3.5c.5 1.9 1.9 3.2 3.9 3.4v2.5c-1.4 0-2.7-.4-3.9-1.2v6.1a5.1 5.1 0 1 1-4.4-5.1v2.6a2.5 2.5 0 1 0 1.8 2.5V3.5H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.3A8.4 8.4 0 1 0 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.7 8.3c.2-.5.5-.5.8-.5h.6c.2 0 .4 0 .6.5s.7 1.7.8 1.8c.1.2.1.3 0 .5-.1.2-.2.3-.4.5s-.4.4-.2.7c.2.4 1 1.5 2.1 2.2 1.4 1 1.9 1 2.2.9.3-.1.9-.5 1-1 .2-.4.2-.4.5-.3l1.7.8c.2.1.4.2.4.4 0 .2 0 1-.4 1.5-.4.5-1.5 1-2.5.9-1-.1-3.2-1.1-4.6-2.6-1.3-1.4-2.2-3-2.4-3.5-.2-.4-.9-1.5-.9-2.4 0-.9.5-1.4.7-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
