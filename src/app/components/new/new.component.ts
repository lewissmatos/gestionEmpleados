import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';
import { DataService } from '../../services/data.service';
import { Empleado } from '../../models/empleado.model';

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
    fechaCont: '',
    estado: true,
    area: '',
    cargo: '',
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
  }
  
  tecno() {
    this.tec = true
    this.ad = false
    this.getCargosByArea('tecnologia')
  }
  
  
  createEmpleado() {
    if (this.tec === true) {
      this.empleado.area = 'tecnologia'
      
    }
    if (this.ad === true) {
      this.empleado.area = 'administrativa'
    }

    this.data.createEmpleado(this.empleado).subscribe(
      res => {
        console.log(res);
      },
      error => console.log(error)
    )
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
