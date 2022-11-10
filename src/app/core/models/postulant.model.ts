import { DataType } from './data-type.model';
import { Ticket } from './ticket.enum';

export interface Postulant extends DataType {
  bevyFilled?: boolean;
  credentialSent?: boolean;
  city: string;
  email: string;
  foodRestriction: string;
  fullName: string;
  phone: string;
  shirtSize: string;
  ticket: Ticket;
  transferSupportURL: string;
  validated?: boolean;

  // Registries
  accumulatedPoints?: number;
  checkIn?: boolean;
  feeForLunchReceived?: boolean;
  firstSnackDelivered?: boolean;
  rfid?: string;
  lunchDelivered?: boolean;
  secondSnackDelivered?: boolean;
  teachersWhoGavePoints?: any;
  visibleInSearch?: boolean;
}
