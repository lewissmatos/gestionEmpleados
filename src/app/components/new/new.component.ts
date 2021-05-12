import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';
import { DataService } from '../../services/data.service';
import { Empleado } from '../../models/empleado.model';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor(private data: DataService, private paisesService: PaisesService) {
    this.getPaises()
    this.getCargosByArea('administrativa')
    this.empleado.area ='administrativa'
    this.getCargos()
  }

  ngOnInit(): void {
  }

  empleado: Empleado = {
    nombre: '',
    fechaNac: '',
    pais: '',
    usuario: '',
    fechaCont:'',
    estado: true,    
    comision: 0
  }
  
  cargos: any = []
  cargoArea: any = []


  ad = true
  tec = false

  com = false

  getCargos() {
    this.data.getCargos()
      .subscribe(
        res => {
          this.cargos = res.data
      }
    )
  }

  getCargosByArea(area: string) {
    this.data.getCargobyArea(area)
      .subscribe(
        res => {
          this.cargoArea = res.data
      }
    )
  }

  admin() {
    this.ad = true
    this.tec = false
    this.getCargosByArea('administrativa')
    this.empleado.area = 'administrativa'
  }
  
  tecno() {
    this.tec = true
    this.ad = false
    this.getCargosByArea('tecnologia')
    this.empleado.area = 'tecnologia'
  }
  
  
  createEmpleado() {

    if (this.empleado.nombre === '' || this.empleado.fechaNac === '' 
      || this.empleado.pais === '' || this.empleado.usuario === ''
      || this.empleado.fechaCont === '')
    
    {
      console.log('Debe llenar todos los campos');
      Swal.fire({
        title: 'Advertencia',
        text: 'Debe llenar todos los campos',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#5349CE',
      })
      
    }
    else {
      this.data.createEmpleado(this.empleado).subscribe(
        res => {
            console.log(res);
        },
          error => console.log(error)
      )
    }
  }

  paises:any = []
  getPaises() {
    this.paisesService.getPaises().subscribe(
      res => {
        this.paises = res
      }
    )
  }

}
