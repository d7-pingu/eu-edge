import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Person } from '../index';

@Injectable()
export class PersonService {

  private personsUrl = 'app/persons';  // URL to web api
  
  public persons : Person[];

  constructor(
      private http: Http
    ) { }

  getPersons() : Promise<Person[]> {
    return this.http
      .get(this.personsUrl)
      .toPromise()
      .then(response => response.json().data as Person[])
      .catch(this.handleError);
  }

  // Add new Person
  create(person: Person): Promise<Person> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(this.personsUrl, JSON.stringify(person), {headers: headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  } 

  // Save Person
  update(person: Person): Promise<Person> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let personUniqueKey: number = 1; // TODO: Remove this line when web api is done
    let url = `${this.personsUrl}/${personUniqueKey}`; // TODO: Change personUniqueKey when web api is done
    return this.http
      .put(url, JSON.stringify(person), {headers: headers})
      .toPromise()
      .then(() => person)
      .catch(this.handleError);
  }

  // Delete Person
  delete(person: Person): Promise<Response> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let personUniqueKey: number = 1; // TODO: Remove this line when web api is done
    let url = `${this.personsUrl}/${personUniqueKey}`; // TODO: Change personUniqueKey when web api is done
    return this.http
      .delete(url, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> { // TODO: create UX friendly error handling
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

}
