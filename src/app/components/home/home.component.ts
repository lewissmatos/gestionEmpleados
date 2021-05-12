import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Empleado } from '../../models/empleado.model';

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

}
