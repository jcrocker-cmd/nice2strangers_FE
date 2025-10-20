// Interface for dropdown item
export interface DropdownItemProps {
  label: string;
  link: string;
}

export const servicesItems: DropdownItemProps[] = [
  { label: "Drone Services", link: "/drone-services" },
  { label: "Social Media Content Creation", link: "/social-media-creation" },
  { label: "Social Media Consulting", link: "/social-media-consulting" },
  { label: "Video Editing", link: "/video-editing" },
  { label: "Software Creation", link: "/software-creation" },
];
