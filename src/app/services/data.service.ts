import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  urlAPI = 'https://gestion-empleados-api.herokuapp.com/api/v1/empleados'

  urlCargos = 'https://gestion-empleados-api.herokuapp.com/api/v1/cargos'
  
  getAllEmpleado() {
    return this.http.get<any>(this.urlAPI)
  }
  
  getEmpleadoById(id: string) {
    return this.http.get<any>(`${this.urlAPI}/${id}`)
  }

  createEmpleado(empleado: Empleado) {
    return this.http.post<any>(this.urlAPI, empleado)
  }

  editEmpleado(id: string, empleado: Empleado) {
    return this.http.put<any>(this.urlAPI + '/' + id, empleado)
  }

  deleteEmpleado(id: string) {
    return this.http.delete<any>(`${this.urlAPI}/${id}`)
  }

  getCargos() {
    return this.http.get<any>(this.urlCargos)
  }

  getCargobyArea(area: any) {
    return this.http.get<any>(`${this.urlCargos}/${area}`)
  }

}
