interface SocialMedia {
  name: string;
  link: string;
}

export interface User {
  name: string;
  img: string;
  message: string;
  country: string;
  phone: string;
  socialMedia: SocialMedia[];
  activities: string[];
  status: string;
}
