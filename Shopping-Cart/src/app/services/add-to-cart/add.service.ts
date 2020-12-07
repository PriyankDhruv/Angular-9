import { Injectable } from '@angular/core';
import { ViewProductModel } from 'src/app/components/view-products/view-products.model'; // The model we defined for the application.
import { Observable } from 'rxjs'; // Observable from rxjs library
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AddService {

  private endpointUrl ="http://localhost:3000/cart";

  constructor(private http:Http) { }

  addToCart(obj: {}): Observable<ViewProductModel[]>{

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.endpointUrl, obj, options).pipe(
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
