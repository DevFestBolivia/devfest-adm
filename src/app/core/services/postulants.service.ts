import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

import { DataService } from '../models/data-service.model';
import { Postulant } from '../models/postulant.model';
import { FirestoreCollection } from '../models/firestore-collection.enum';
import { DataOrder } from '../models/data-order.enum';
import { AuthUser } from '../models/auth-user.model';
import { Ticket } from '../models/ticket.enum';

@Injectable({ providedIn: 'root' })
export class PostulantsService extends DataService<Postulant> {
  constructor(db: AngularFirestore) {
    super(db, FirestoreCollection.attendees);
  }

  getPostulantsByTicket(ticket: Ticket): Observable<Postulant[]> {
    return this.db
      .collection<Postulant>(this.collection, (ref) =>
        ref
          .where('deleted', '==', false)
          .where('ticket', '==', ticket)
          .orderBy('fullName', 'asc'),
      )
      .valueChanges();
  }

  getAcceptedPostulants(): Observable<Postulant[]> {
    return this.db
      .collection<Postulant>(this.collection, (ref) =>
        ref
          .where('deleted', '==', false)
          // @TODO Uncomment this
          // .where('validated', '==', true)
          .orderBy('fullName', DataOrder.asc),
      )
      .valueChanges();
  }

  acceptPostulant(user: AuthUser, postulant: Postulant): boolean {
    if (user.roles.admin) {
      postulant.validated = !postulant.validated;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  markCredentialAsSent(user: AuthUser, postulant: Postulant): boolean {
    if (user.roles.admin && postulant.validated) {
      postulant.credentialSent = !postulant.credentialSent;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  confirmPostulantAssistance(user: AuthUser, postulant: Postulant): boolean {
    if (user.roles.admin && postulant.validated && postulant.credentialSent) {
      postulant.bevyFilled = !postulant.bevyFilled;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  checkInAssistant(user: AuthUser, postulant: Postulant): boolean {
    if (!user.roles.speaker && postulant.validated) {
      postulant.checkIn = !postulant.checkIn;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  markFeeForLunchAsReceived(user: AuthUser, postulant: Postulant): boolean {
    if (!user.roles.speaker && postulant.validated && postulant.checkIn) {
      postulant.feeForLunchReceived = !postulant.feeForLunchReceived;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  markLunchAsDelivered(user: AuthUser, postulant: Postulant): boolean {
    if (
      !user.roles.speaker &&
      postulant.validated &&
      postulant.checkIn &&
      postulant.feeForLunchReceived
    ) {
      postulant.lunchDelivered = !postulant.lunchDelivered;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  markFirstSnackAsDelivered(user: AuthUser, postulant: Postulant): boolean {
    if (!user.roles.speaker && postulant.validated && postulant.checkIn) {
      postulant.firstSnackDelivered = !postulant.firstSnackDelivered;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  markSecondSnackAsDelivered(user: AuthUser, postulant: Postulant): boolean {
    if (!user.roles.speaker && postulant.validated && postulant.checkIn) {
      postulant.secondSnackDelivered = !postulant.secondSnackDelivered;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  givePointsToPostulant(
    user: AuthUser,
    postulant: Postulant,
    points: number,
  ): boolean {
    if (!user.roles.staff && postulant.validated && postulant.checkIn) {
      if (!postulant.teachersWhoGavePoints) {
        postulant.teachersWhoGavePoints = {};
      }
      postulant.teachersWhoGavePoints[user.id] = points;
      postulant.accumulatedPoints = 0;

      for (const teacherId in postulant.teachersWhoGavePoints) {
        if (postulant.teachersWhoGavePoints[teacherId]) {
          postulant.accumulatedPoints +=
            postulant.teachersWhoGavePoints[teacherId];
        }
      }

      this.upsertData(postulant);
      return true;
    }

    return false;
  }

  giveRFIDToPostulant(
    user: AuthUser,
    postulant: Postulant,
    rfid: string,
  ): boolean {
    if (!user.roles.speaker) {
      postulant.rfid = rfid;
      this.upsertData(postulant);
      return true;
    }

    return false;
  }
}
