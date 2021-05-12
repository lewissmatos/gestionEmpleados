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

  ngOnInit(): void {
  }

  empleados:Empleado[] = []

  getAllEmpleados() {
    this.data.getAllEmpleado().subscribe(
      res => {
        console.log(res)
        this.empleados  = res.data  
      }
    )
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
