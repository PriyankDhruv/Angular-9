import { Injectable } from '@angular/core';
import { CartModel } from 'src/app/components/cart/cart.model'; // The model we defined for the application.
import { Observable } from 'rxjs'; // Observable from rxjs library
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ViewCartService {

  private endpointUrl ="http://localhost:3000/cart";

  constructor(private http:Http) { }

  getProducts(): Observable<CartModel[]> {
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
