import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

}
