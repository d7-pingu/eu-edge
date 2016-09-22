import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Person } from '../../person';

@Injectable()
export class InterfaceService {

  constructor() { }

  // Observable source(s)
  private newPersonCreateSource = new Subject<Person>();
  private changePersonSource = new Subject<Person>();
  private deletePersonSource = new Subject<Person>();

  // Observable stream(s)
  personCreated$ = this.newPersonCreateSource.asObservable();
  personChanged$ = this.changePersonSource.asObservable();
  personDeleted$ = this.deletePersonSource.asObservable();

  newPersonAdded(person: Person) {
    this.newPersonCreateSource.next(person);
  }

  personChanged(person: Person){
    this.changePersonSource.next(person);
  }

  personDeleted(person: Person){
    this.deletePersonSource.next(person);
  }

}
