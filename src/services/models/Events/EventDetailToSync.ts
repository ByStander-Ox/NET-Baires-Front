import { Member } from "../Member";

export interface EventDetailToSync {
  id: string;
  title: string;
  description: string;
  platform: string;
  status: string;
  date: Date;
  attendees: Member[];
}

export interface EventToReportAssistance {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: string;
  date: Date;
  token: string;
}
