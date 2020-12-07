import { Injectable } from '@angular/core';
import { ViewProductModel } from '../components/view-products/view-products.model'; // The model we defined for the application.
import { Observable } from 'rxjs'; // Observable from rxjs library
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { map, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class AppService {

  private endpointUrl ="http://localhost:3000/products";

  constructor(private http:Http) { }

  getProducts(): Observable<ViewProductModel[]> {
    return this.http.get(this.endpointUrl).pipe(
      map(
        (response: Response) => { const result = response.json(); return result; }
      )
      .bind(
        catchError(
          (error : Response | any) => { return Observable.throw(error.statusText); }
        )
      )
    );
  }
}
