import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from 'src/app/models/empleado.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private data: DataService, private router: ActivatedRoute) {
    this.getEmpleadoById(this.router.snapshot.paramMap.get('id'))
  }
  
  ngOnInit(): void {
  }

  empleado: Empleado = {
    fechaNac: '',
    fechaCont: ''
  }

  fechaNac = ''
  fechaCont = ''
  
  getEmpleadoById(id: any) {
    this.data.getEmpleadoById(id).subscribe(
      res => {
        console.log(res);
        this.empleado = res.data
        
        this.empleado.fechaNac = res.data.fechaNac
        this.empleado.fechaCont= res.data.fechaCont
         
      }, error => console.log(error)
    )
  }

}
