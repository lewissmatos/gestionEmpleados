import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Empleado } from '../../models/empleado.model';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private data: DataService) {
    this.getAllEmpleados()
   }


  empleados: Empleado[] = []

  fecha = '02-07-2002'

  edad = 0

  edades:number[] = []
  fechas = []
  
  ngOnInit(): void {
  }


  getAllEmpleados() {
    this.data.getAllEmpleado().subscribe(
      res => {
        this.empleados = res.data
        this.fechas = res.data.map((x: any) => {
          this.edades.push(this.calcularEdad(x.fechaNac))
        }) 
      }
    )
  }

  calcularEdad(fecha: any) {
    let hoy = new Date();
    let cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
}

  deleteEmpleado(_id: any) {
    Swal.fire({
      title: 'Eliminar',
      text: 'Seguro que desea eliminar?',
      icon: 'question',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#5349CE',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#CC0000'
    }).then(
      (res) => {
        if (res.isConfirmed) {
          this.data.deleteEmpleado(_id).subscribe(
            res => {        
              console.log(res.data);
              this.getAllEmpleados()
            }
          )
        }
      }
    )
  }

}
