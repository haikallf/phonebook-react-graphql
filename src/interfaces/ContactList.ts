import { Phone } from "./Phone";

export interface ContactList {
  first_name: string;
  last_name: string;
  phones: Phone[];
}
