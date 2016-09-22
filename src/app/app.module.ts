import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { PersonService } from './persons/index';
import { AppComponent } from './app.component';
import { PersonListComponent } from './persons/person-list/person-list.component';
import { NewPersonComponent } from './persons/person-list/new-person/new-person.component';
import { ComponentAnchorDirective } from './shared/componentanchor.directive';
import { ChangeTrackerComponent } from './persons/person-list/change-tracker/change-tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    NewPersonComponent,
    ComponentAnchorDirective,
    ChangeTrackerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    
  ],
  schemas: [
    [ CUSTOM_ELEMENTS_SCHEMA ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
