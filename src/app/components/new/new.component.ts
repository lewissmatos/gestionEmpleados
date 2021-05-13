import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';
import { DataService } from '../../services/data.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  
  formulario: FormGroup

  constructor(private data: DataService,
    private paisesService: PaisesService,
    private router: Router,
    private fBuilder: FormBuilder) {
    
    this.area()
    this.getPaises()
        
    this.formulario = this.fBuilder.group({
      nombre:['', Validators.required],
      fechaNac:['', Validators.required],
      pais:['Afghanistan', Validators.required],
      usuario:['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]*')]],
      fechaCont:['', Validators.required],
      estado:[true],
      cargo:['', Validators.required],
      comision: 0,
      edad: 0
    })

  }

  ngOnInit(): void {
   
  }
  
  cargoArea: any = []

  getCargosByArea(area: string) {
    this.data.getCargobyArea(area)
      .subscribe(
        res => {
          this.cargoArea = res.data
      }
    )
  }

  areaBool = false
  areaValue = ''
  
  com = false
  area() {
    this.areaBool = !this.areaBool

    if (this.areaBool === true) {
      this.areaValue = 'administrativa'
      this.com = true
    }

    if (this.areaBool === false) {
      this.areaValue = 'tecnologia'
      this.com = false
    }

    this.getCargosByArea(this.areaValue)

  }

  charging = false
  
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

  createEmpleado(formulario: any) {    
    
    this.charging = true

    formulario = {...formulario, area: this.areaValue, edad: this.calcularEdad(formulario.fechaNac), cargo: this.formulario.value.cargo}
  
    if (this.calcularEdad(formulario.fechaNac) < 18) {
      this.charging = false
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe ser mayor a 18 años',
        confirmButtonText: 'Volver',
        confirmButtonColor: '#5349CE',
      })

      return console.log()
      
    } else {

      this.data.createEmpleado(formulario).subscribe(
        res => {
          this.charging = false
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Usuario guardado correctamente!',
            confirmButtonText: 'Ir a la lista',
            confirmButtonColor: '#5349CE',
            html: `<h5>Empleado creado: <b>${formulario.nombre}</b></h5>`,
            allowOutsideClick: false
          }).then(
            (res) => {
              if (res.isConfirmed) {
                this.router.navigate(['/home'])
              }
            }
          )
        },
        error => {
          console.log(error)
          this.charging = false
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Este nombre de usuario ya esta en uso!',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#5349CE',          
          })
        }
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
