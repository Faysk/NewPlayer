import { Component, OnInit } from '@angular/core';
import { AppDataService } from './app-data.service';
import { Weather } from './model/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  weathers: Weather[];
  title = 'NewPlayer';
  videos = [];

  constructor(private service: AppDataService) {}

  ngOnInit(): void {
    this.service.getVideos().subscribe(
      response => this.videos = response,
      error => console.log(error)
    );
  }

  getWeather() {
    this.service.getWeather().subscribe(
      response => this.weathers = response,
      error => console.log(error)
    );
  }
}
