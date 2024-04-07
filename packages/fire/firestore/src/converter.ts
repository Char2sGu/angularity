import {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
} from '@angular/fire/firestore';

export interface SimpleFirestoreDataConverterConfig<
  Model extends DocumentData,
  Record extends DocumentData,
> {
  toRecord: (
    model: PartialWithFieldValue<Model>,
  ) => PartialWithFieldValue<Record>;
  toModel(record: object): Model;
}

export function createSimpleFirestoreDataConverter<
  Model extends DocumentData,
  Record extends DocumentData,
>(
  config: SimpleFirestoreDataConverterConfig<Model, Record>,
): FirestoreDataConverter<Model, Record> {
  return {
    fromFirestore: (snapshot, options) =>
      config.toModel(snapshot.data(options)),
    toFirestore: (model) => config.toRecord(model) as Record,
  };
}
