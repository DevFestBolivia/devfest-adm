import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataType } from './data-type.model';
import { DataOrder } from './data-order.enum';
import { FirestoreCollection } from './firestore-collection.enum';

export abstract class DataService<T extends DataType> {
  dataCollection: AngularFirestoreCollection<T>;

  constructor(
    protected db: AngularFirestore,
    protected collection: FirestoreCollection,
  ) {
    this.dataCollection = db.collection<T>(collection, (ref) =>
      ref.where('deleted', '==', false),
    );
  }

  getAll(): Observable<T[]> {
    return this.dataCollection.valueChanges();
  }

  getAllSorted(
    field: string,
    order: DataOrder,
    maxLimit?: number,
  ): Observable<T[]> {
    return this.db
      .collection<T>(this.collection, (ref) => {
        let query = ref.where('deleted', '==', false).orderBy(field, order);

        if (maxLimit) {
          query = query.limit(maxLimit);
        }

        return query;
      })
      .valueChanges();
  }

  getById(id: string, validateDeletedFlag= true): Observable<T> {
    return this.db
      .doc<T>(`${this.collection}/${id}`)
      .valueChanges()
      .pipe(
        map((data) => {
          if ((data && !data.deleted) || !validateDeletedFlag) {
            return data;
          }

          return null;
        }),
      );
  }

  upsertData(data: T): Observable<void> {
    let id = data.id;

    if (!id) {
      id = this.db.createId();
      data.id = id;
    }

    return from(this.dataCollection.doc(id).set(data, { merge: true }));
  }

  deleteData(data: T): Observable<void> {
    if (data.id) {
      data.deleted = true;
      return this.upsertData(data);
    }

    return of();
  }
}
