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

  }
  
  ngOnInit(): void {
  this.getEmpleadoById(this.router.snapshot.paramMap.get('id'))
  }

  empleado: Empleado = {}
  getEmpleadoById(id: any) {
    this.data.getEmpleadoById(id).subscribe(
      res => {
        console.log(res);
        this.empleado = res.data
      }, error => console.log(error)
    )
  }

}
