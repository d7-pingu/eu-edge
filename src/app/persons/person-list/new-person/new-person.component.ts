import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { InterfaceService } from '../../index';
import { Person } from '../../../person';
import { PersonService } from '../../person.service';

@Component({
  selector: 'new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {

  @Output() onCreated: EventEmitter<Person> = new EventEmitter<Person>();

  destroy: EventEmitter<any> = new EventEmitter();

  person: Person = new Person("", "", "", "", false);

  constructor(
      private personService: PersonService,
      private interfaceService: InterfaceService
    ) { }

  ngOnInit(): void {
  }

  onClickedSave():void {
    this.person.name = this.person.name.trim();
    if (!this.person.name) { 
      this.destroy.emit('close');
      return; 
    }

    this.personService.create(this.person)
      .then(person => {
        this.interfaceService.newPersonAdded(this.person);
        this.interfaceService.personChanged(person);
        this.destroy.emit('close');
      });
  }

  onClickedClose() {
    this.destroy.emit('close');
  }

  nameIsValid(){
    let name = this.person.name.trim();
    return !!name;
  }

}
