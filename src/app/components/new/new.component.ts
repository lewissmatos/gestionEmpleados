import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor(private data: DataService, private paisesService: PaisesService) {
    this.getCargos()
    this.getPaises()
    this.getCargosByArea('administrativa')
  }

  ngOnInit(): void {
  }

  ad = true
  tec = false

  cargos: any = []
  cargoArea: any = []
  getCargos() {
    this.data.getCargos()
      .subscribe(
        res => {
          this.cargos = res.data
          console.log(res.data)
      }
    )
  }

  getCargosByArea(area: string) {
    this.data.getCargobyArea(area)
      .subscribe(
        res => {
          this.cargoArea = res.data
          console.log('cargos por area: ',this.cargoArea)
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



  paises:any = []
  getPaises() {
    this.paisesService.getPaises().subscribe(
      res => {
        this.paises = res
      }
    )
  }

}
