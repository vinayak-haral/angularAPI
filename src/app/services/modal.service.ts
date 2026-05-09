import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private openSignupModalSubject = new Subject<void>();
  
  get openSignupModal$() {
    return this.openSignupModalSubject.asObservable();
  }
  
  openSignupModal() {
    this.openSignupModalSubject.next();
  }
}
