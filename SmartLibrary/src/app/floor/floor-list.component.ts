// Observable Version
import { Component, OnInit } from '@angular/core';
import { Floor } from './floor';
import { FloorService } from './floor.service';

@Component({
  selector: 'floor-list',
  templateUrl: './floor-list.component.html',
  providers: [FloorService],
  styles: ['.error {color:red;}']
})
export class FloorListComponent implements OnInit {
  errorMessage: string;
  floors: Floor[];
  mode = 'Observable';
  value = 50;

  constructor(private floorService: FloorService) { }

  ngOnInit() { this.getFloors(); }

  getFloors() {
    setInterval(() => {
      this.floorService.getFloors()
        .subscribe(
        floors => this.floors = floors,
        error => this.errorMessage = <any>error);
    }, 500);
  }

  addHero(name: string) {
    if (!name) { return; }
    this.floorService.create(name)
      .subscribe(
      hero => this.floors.push(hero),
      error => this.errorMessage = <any>error);
  }
}
