import { DataType } from './data-type.model';
import { Ticket } from './ticket.enum';

export interface Postulant extends DataType {
  bevyFilled?: boolean;
  credentialSent?: boolean;
  email: string;
  foodRestriction: string;
  fullName: string;
  phone: string;
  shirtSize: string;
  ticket: Ticket;
  transferSupportURL: string;
  validated?: boolean;

  // Registries
  checkIn?: boolean;
  feeForLunchReceived?: boolean;
  lunchDelivered?: boolean;
  firstSnackDelivered?: boolean;
  secondSnackDelivered?: boolean;
  visibleInSearch?: boolean;
  teachersWhoGavePoints?: any;
  accumulatedPoints?: number;
  rfid?: string;
}
