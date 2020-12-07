import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class DeleteService {

  private endpointUrl ="http://localhost:3000/cart/";

  constructor(private http:Http) { }

  deleteProduct(id: number) {
    return this.http.delete(this.endpointUrl + id);
  }
}
