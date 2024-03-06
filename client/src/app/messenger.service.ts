import {Injectable, EventEmitter} from "@angular/core";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  public eventEmit = new EventEmitter()
  constructor() { }
  public messageListener(){
    return this.eventEmit.asObservable()
  }
}
