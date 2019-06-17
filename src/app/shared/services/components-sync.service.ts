import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ComponentsSyncService {

  private userAuthUpdatesSource = new Subject();

  constructor() { }

  sendAuthenticationUpdate(data: {}){
    this.userAuthUpdatesSource.next(data);
  }

  getAuthenticationUpdates(): Observable<any>{
    return this.userAuthUpdatesSource.asObservable();
  }

}
