import { Component, OnInit, Input } from '@angular/core';
import { InterfaceService } from '../../shared/interface.service';
import { Subscription } from 'rxjs/Subscription';
import { Person } from '../../../person';

@Component({
  selector: 'change-tracker',
  templateUrl: './change-tracker.component.html',
  styleUrls: ['./change-tracker.component.css']
})
export class ChangeTrackerComponent implements OnInit {

  changeSubscription: Subscription;
  deleteSubscription: Subscription;

  history: any = [];

  constructor(
    private interfaceService: InterfaceService,
  ) { 
    this.changeSubscription = interfaceService.personChanged$.subscribe(
      person => {
        this.history.unshift(JSON.stringify(person));
      }); 
    this.deleteSubscription = interfaceService.personDeleted$.subscribe(
      person => {
        this.history.unshift('[deleted:' + JSON.stringify(person) + ']');
      }); 
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // prevent memory leak
    this.changeSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }  

}
