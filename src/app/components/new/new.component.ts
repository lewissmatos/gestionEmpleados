import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';
import { DataService } from '../../services/data.service';
import { Empleado } from '../../models/empleado.model';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor(private data: DataService,
    private paisesService: PaisesService,
    private router: Router) {
    this.getPaises()
    this.getCargosByArea('administrativa')
    this.empleado.area = 'administrativa'
    this.empleado.cargo = ''
    this.getCargos()
  }

  ngOnInit(): void {
  }

  empleado: Empleado = {
    nombre: '',
    fechaNac: '',
    pais: '',
    usuario: '',
    fechaCont: '',
    cargo:'',
    estado: true,    
    comision: 0
  }
  
  cargos: any = []
  cargoArea: any = []
  
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
          console.log(this.cargoArea);
      }
    )
  }

  ad = true
  tec = false

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
  
  
  charging = false
  
  createEmpleado() {
    this.charging = true
    if (this.empleado.nombre === '' || this.empleado.fechaNac === '' 
      || this.empleado.pais === '' || this.empleado.usuario === ''
      || this.empleado.fechaCont === '' || this.empleado.cargo === '' )
    
    {
      this.charging = false
      console.log('Debe llenar todos los campos')
      Swal.fire({
        title: 'Advertencia',
        text: 'Debe llenar todos los campos',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#5349CE',
      })
      
    } else {
      this.data.createEmpleado(this.empleado).subscribe(
        res => {
          this.charging = false
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Usuario guardado correctamente!',
            confirmButtonText: 'Ir a la lista',
            confirmButtonColor: '#5349CE',
          }).then(
            (res) => {
              if (res.isConfirmed) {
                this.router.navigate(['/home'])
              }
            }
          )
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
