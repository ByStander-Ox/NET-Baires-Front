export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  blocked: boolean;
  organized: boolean;
  colaborator: boolean;
  linkedin: string;
  twitter: string;
  picture: string;
  github: string;
  instagram: string;
  biography: string;
  attended: boolean;
  speaker: boolean;
  organizer: boolean;
}

export interface BadgeDetail {
  Id: number;
  BadgeId: string;
  BadgeUrl: string;
  BadgeImageUrl: string;
  IssuerUrl: string;
  Image: string;
  Name: string;
  Description: string;
}
