import {
  collection,
  collectionData,
  CollectionReference,
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  Query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface FirestoreResourceConfig<
  ModelWithId extends DocumentData,
  Record extends DocumentData,
  IdField extends keyof ModelWithId,
> {
  readonly path: string;
  readonly idField: IdField;
  readonly converter: FirestoreDataConverter<
    Omit<ModelWithId, IdField>,
    Record
  >;
}

/**
 * A class that provides type-safe access to the Firestore collection and
 * documents of a specific model.
 */
export class FirestoreResource<
  ModelWithId extends DocumentData,
  Record extends DocumentData,
  IdField extends keyof ModelWithId,
> {
  constructor(
    protected firestore: Firestore,
    protected config: FirestoreResourceConfig<ModelWithId, Record, IdField>,
  ) {}

  readonly path = this.config.path;
  readonly idField = this.config.idField;
  readonly converter = this.config.converter;

  refDoc(id: string): DocumentReference<Omit<ModelWithId, IdField>, Record> {
    const { path, converter } = this;
    return doc(this.firestore, path, id).withConverter(converter);
  }

  refNewDoc(): DocumentReference<Omit<ModelWithId, IdField>, Record> {
    const { converter } = this;
    const collectionRef = this.refCollection();
    return doc(collectionRef).withConverter(converter);
  }

  refCollection(): CollectionReference<Omit<ModelWithId, IdField>, Record> {
    const { path, converter } = this;
    return collection(this.firestore, path).withConverter(converter);
  }

  resolveQuery(
    query: Query<Omit<ModelWithId, IdField>>,
  ): Observable<ModelWithId[]> {
    const { idField } = this;
    // Type-assert required because of the incorrect typing of the `idField` option
    return collectionData(query as Query<ModelWithId>, { idField });
  }

  resolveDoc(
    ref: DocumentReference<Omit<ModelWithId, IdField>>,
  ): Observable<ModelWithId | undefined> {
    const { idField } = this;
    // Type-assert required because of the incorrect typing of the `idField` option
    return docData(ref as DocumentReference<ModelWithId>, { idField });
  }
}
