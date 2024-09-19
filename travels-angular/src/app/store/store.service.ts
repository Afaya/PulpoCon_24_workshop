import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private travelListStore: BehaviorSubject<ITravel[]> = new BehaviorSubject<ITravel[]>([]);

  constructor() { }

  //#region getters
  getTravelList(): Observable<ITravel[]> {
    return this.travelListStore.asObservable();
  }

  getTravelById(id: number): ITravel | undefined {
    return this.travelListStore.value.find(travel => travel.id === id);
  }
  //#endregion getters

  //#region setters
  setTravelList(newTravelList: ITravel[]): void {
    this.travelListStore.next(newTravelList);
  }

  addTravelList(newTravelList: ITravel): void {
    const newId = Math.max(...this.travelListStore.value.map(travel => { return travel.id })) + 1;
    newTravelList.id = newId;
    this.travelListStore.value.push(newTravelList);
  }
  //#endregion setters
}
