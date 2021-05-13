import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute,  } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.model';
import { DataService } from 'src/app/services/data.service';
import { PaisesService } from 'src/app/services/paises.service';


import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  constructor(private data: DataService,
    private paisesService: PaisesService,
    private route: Router,
    private router: ActivatedRoute,
    private fBuilder: FormBuilder) {
    
    this.getEmpleadoById(this.router.snapshot.paramMap.get('id'))
    
    
    this.getPaises()

    this.formulario = this.fBuilder.group({
      nombre:['', Validators.required],
      fechaNac:['', Validators.required],
      pais:['Afghanistan', ],
      usuario:['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]*')]],      
      fechaCont:['', Validators.required],
      estado:[true, Validators.required],
      cargo:['', Validators.required],
      comision: [0],
      edad: [0]
    })

    this.empleado.cargo = this.formulario.value.cargo

  }

  idEmpleado = this.router.snapshot.paramMap.get('id')

  formulario: FormGroup

  empleado: Empleado = {
   
    estado: true,    
    comision: 0,
    edad: 0
  }

  ngOnInit(): void {
    
  }

  cargoArea: any = []
  
  getCargosByArea(area: any) {
    this.data.getCargobyArea(area)
      .subscribe(
        res => {
          this.cargoArea = res.data
          
      }
    )
  }
  
  getEmpleadoById(id:any) {
    this.data.getEmpleadoById(id).subscribe(
      res => {
        this.empleado = res.data
        
        this.getCargosByArea(res.data.area)
        
        this.empleado.fechaNac = res.data.fechaNac.substring(0, 10)
        this.empleado.fechaCont = res.data.fechaCont.substring(0, 10)
        
        this.empleado.area = res.data.area
        this.empleado.cargo = res.data.cargo._id
                
        if (this.empleado.area === 'administrativa') {
          this.areaBool = true
          this.areaValue = 'administrativa'
        }
        else{
          this.areaBool = false
          this.areaValue = 'tecnologia'
        }
        
      }, error => console.log(error)
    )
  }

  com = false
  
  areaValue = ''
  areaBool = false

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

  GuardarEdicion(formulario: any) {    
    
    this.charging = true
    
    formulario = { ...formulario, area: this.areaValue, edad: this.calcularEdad(formulario.fechaNac), }
    
    if (this.calcularEdad(formulario.fechaNac) < 18) {
      this.charging = false
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe ser mayor a 18 años',
        confirmButtonText: 'Volver',
        confirmButtonColor: '#59698d',
      })
    } else {

      this.data.editEmpleado(this.idEmpleado, formulario).subscribe(
        res => {
          this.charging = false
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Usuario guardado correctamente!',
            confirmButtonText: 'Ir a la lista',
            confirmButtonColor: '#59698d',
            html: `<h5>Empleado editado: <b>${formulario.nombre}</b></h5>`,
            allowOutsideClick: false
          }).then(
            (res) => {
              if (res.isConfirmed) {
                this.route.navigate(['/home'])
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
            confirmButtonColor: '#59698d',          
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
