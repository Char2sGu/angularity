import { inject } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  DocumentReference,
  Firestore,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

/**
 * A class that provides type-safe access to the Firestore collection and
 * documents of a specific model.
 */
export abstract class FirestoreResource<T> {
  protected firestore = inject(Firestore);
  protected abstract path: string;
  protected abstract idField: keyof T;

  watch(ref: DocumentReference<T>): Observable<T | null>;
  watch(ref: CollectionReference<T>): Observable<T[]>;
  watch(
    ref: CollectionReference<T> | DocumentReference<T>,
  ): Observable<T[] | T | null> {
    return ref instanceof CollectionReference
      ? this.watchCollection(ref)
      : this.watchDoc(ref);
  }

  getDocRef(id: string): DocumentReference<T> {
    return doc(this.firestore, this.path, id) as DocumentReference<T>;
  }

  getNewDocRef(): DocumentReference<T> {
    const collectionRef = this.getCollectionRef();
    return doc(collectionRef) as DocumentReference<T>;
  }

  getCollectionRef(): CollectionReference<T> {
    return collection(this.firestore, this.path) as CollectionReference<T>;
  }

  protected watchCollection(ref: CollectionReference<T>): Observable<T[]> {
    return collectionData(ref, { idField: this.idField });
  }

  protected watchDoc(ref: DocumentReference<T>): Observable<T | null> {
    return docData(ref, { idField: this.idField }).pipe(map((d) => d ?? null));
  }
}
