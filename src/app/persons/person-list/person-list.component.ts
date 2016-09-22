import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../../person';
import { PersonService } from '../person.service';
import { Subscription }   from 'rxjs/Subscription';
import { InterfaceService } from '../index';
import { ComponentAnchorDirective } from '../../shared/index';
import { NewPersonComponent } from './new-person/index';

@Component({
  selector: 'person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  providers: [PersonService, InterfaceService, ComponentAnchorDirective],
  entryComponents: [NewPersonComponent]
})
export class PersonListComponent implements OnInit {

  persons: Person[];
  error: any;

  subscription: Subscription;

  @ViewChild(ComponentAnchorDirective) componentAnchor: ComponentAnchorDirective;

  constructor(
      private personService:PersonService,
      private interfaceService: InterfaceService
    ) { 
      this.subscription = interfaceService.personCreated$.subscribe(
        person => {
          this.persons.unshift(person);
        });
    }

  getPersons(): void {
    this.personService
      .getPersons()
      .then(persons => this.persons = persons)
      .catch(error => this.error = error);
  }

  openNewPersonForm() {
    this.componentAnchor.showComponent(NewPersonComponent);
  }

  onChange(person: Person): void{
    // this.save(person); TODO: enable when web api is done
    this.interfaceService.personChanged(person);
  }

  save(person: Person): void {
    this.personService
      .update(person)
      .then((person) => {
        // TODO: need to update the changed person
      });
  }

  delete(person: Person, index: number): void { // TODO: no need external index when web api is done and person has unique key
    this.personService
        .delete(person)
        .then(() => {
          this.persons.splice(index, 1);
          this.interfaceService.personDeleted(person);
        });
  }

  ngOnInit(): void {
    this.getPersons();
  }

  ngOnDestroy() {
    // prevent memory leak
    this.subscription.unsubscribe();
  }

}
