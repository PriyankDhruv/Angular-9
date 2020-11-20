import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleObj } from 'src/app/interfaces/googleObj';

@Injectable({
  providedIn: 'root'
})

export class GoogletranslateService {
  endpointUrl = 'https://translation.googleapis.com/language/translate/v2?key=';

  key = '';

  constructor(private http: HttpClient) { }

  translate(obj: GoogleObj) {
    return this.http.post(this.endpointUrl + this.key, obj);
  }
}