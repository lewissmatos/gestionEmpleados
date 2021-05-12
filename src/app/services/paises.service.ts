import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }

  urlAPI = 'https://restcountries.eu/rest/v2/all'

  getPaises() {
    return this.http.get<any>(this.urlAPI)
  }
}
