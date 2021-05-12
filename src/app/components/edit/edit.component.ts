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
    this.getCargosByArea('administrativa')
    this.empleado.area = 'administrativa'
    this.empleado.cargo = ''
    this.getCargos()

    this.formulario = this.fBuilder.group({
      nombre:['', Validators.required],
      fechaNac:['', Validators.required],
      pais:['Afghanistan', ],
      usuario:['', Validators.required],
      fechaCont:['', Validators.required],
      estado:[true, Validators.required],
      area:['', Validators.required],
      cargo:['', Validators.required],
      comision: [0],
      edad: [0]
    })
  }


  formulario: FormGroup

  empleado: Empleado = {
    nombre: '',
    fechaNac: '',
    pais: '',
    usuario: '',
    fechaCont: '',
    cargo:'',
    estado: true,    
    comision: 0,
    edad: 0
  }

  getEmpleadoById(id:any) {
    this.data.getEmpleadoById(id).subscribe(
      res => {
        console.log(res);
        this.empleado = res.data
        
        this.empleado.fechaNac = res.data.fechaNac
        this.empleado.fechaCont = res.data.fechaCont
        
        this.empleado.area = res.data.area

        console.log(this.empleado.area)
         
      }, error => console.log(error)
    )
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

    console.log(this.empleado);

    this.formulario.value.cargo = '' 

  }
  
  fecha = '12-89-2001'
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

    this.formulario.value.edad = this.calcularEdad(formulario.fechaNac)
  
    if (this.calcularEdad(formulario.fechaNac) < 18) {
      this.charging = false
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe ser mayor a 18 años',
        confirmButtonText: 'Volver',
        confirmButtonColor: '#5349CE',
      })
    } else {
      console.log(formulario);
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
          }).then(
            (res) => {
              if (res.isConfirmed) {
                this.route.navigate(['/home'])
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


  ngOnInit(): void {
  }

  

}
