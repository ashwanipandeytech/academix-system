import { BehaviorSubject, Observable, map } from 'rxjs';

export abstract class BaseDataService<T extends { id: string | number }> {
  protected dataSubject = new BehaviorSubject<T[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(initialData: T[] = []) {
    this.dataSubject.next(initialData);
  }

  getAll(): Observable<T[]> {
    return this.data$;
  }

  getById(id: string | number): Observable<T | undefined> {
    return this.data$.pipe(
      map(items => items.find(item => item.id === id))
    );
  }

  create(item: T): void {
    const currentData = this.dataSubject.value;
    this.dataSubject.next([...currentData, item]);
  }

  update(id: string | number, updatedItem: T): void {
    const currentData = this.dataSubject.value;
    const index = currentData.findIndex(item => item.id === id);
    if (index !== -1) {
      const newData = [...currentData];
      newData[index] = updatedItem;
      this.dataSubject.next(newData);
    }
  }

  delete(id: string | number): void {
    const currentData = this.dataSubject.value;
    this.dataSubject.next(currentData.filter(item => item.id !== id));
  }
}
