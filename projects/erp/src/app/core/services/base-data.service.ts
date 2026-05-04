import { inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc, docData, DocumentReference, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class BaseDataService<T extends { id: string }> {
  protected firestore = inject(Firestore);
  protected collectionPath: string;

  constructor(collectionPath: string) {
    this.collectionPath = collectionPath;
  }

  protected getCollection(): CollectionReference<T> {
    return collection(this.firestore, this.collectionPath) as CollectionReference<T>;
  }

  protected getDocRef(id: string): DocumentReference<T> {
    return doc(this.firestore, `${this.collectionPath}/${id}`) as DocumentReference<T>;
  }

  getAll(): Observable<T[]> {
    return collectionData(this.getCollection(), { idField: 'id' }) as Observable<T[]>;
  }

  getById(id: string): Observable<T | undefined> {
    return docData(this.getDocRef(id), { idField: 'id' }) as Observable<T | undefined>;
  }

  async create(item: T): Promise<void> {
    const newDocRef = doc(this.getCollection());
    const id = item.id || newDocRef.id;
    await setDoc(this.getDocRef(id), { ...item, id });
  }

  async update(id: string, updatedItem: Partial<T>): Promise<void> {
    await updateDoc(this.getDocRef(id) as any, updatedItem as any);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(this.getDocRef(id) as any);
  }
}
