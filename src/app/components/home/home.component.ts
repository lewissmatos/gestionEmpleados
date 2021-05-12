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

  fechas = []
  
  ngOnInit(): void {
  }

  theresEmp = false

  getAllEmpleados() {
    this.data.getAllEmpleado().subscribe(
      res => {
        this.empleados = res.data

        if (res.data.length > 0) {
          this.theresEmp = true
        }
        if (res.data.length === 0) {
          this.theresEmp = false
        }

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
              this.getAllEmpleados()
            },error => console.log(error)
          )
        }
      }
    )
  }

  empleadosFiltrados: any[] = []
  
  searching = false
  
  buscarEmpleado(termino: string = '') {

    this.empleadosFiltrados = this.empleados.filter((x: any) => x.nombre.toLowerCase().includes(termino.toLowerCase()) || x.cargo.cargo.toLowerCase().includes(termino.toLowerCase()) || x.fechaCont.toLowerCase().includes(termino.toLowerCase())) 


    if (termino !== '') {
      this.searching = true
    } else {
      this.searching =false
    }
  }
}
