import { Phone } from "./Phone";

export interface ContactList {
  id: number;
  first_name: string;
  last_name: string;
  phones: Phone[];
}
