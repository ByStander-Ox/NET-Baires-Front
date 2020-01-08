import { getRequest } from "./requestServices";
import { Member } from "./models/Member";
import { GetBadgeResponse } from './models/BadgeDetail';

export const getMembersInBadge = (id: number): Promise<Member[]> => {
  return getRequest(`/badges/${id}/members`);
};
export const getBdgesFromMeber = (memberId: number): Promise<GetBadgeResponse[]> => {
  return getRequest(`/members/${memberId}/badges`);
};

export const getMemberByQuery = (query: string): Promise<Member[]> => {
  return getRequest(`/members/${query}`);
};
export const getMemberDetail = (id: number): Promise<Member> => {
  return getRequest(`/members/${id}`);
};