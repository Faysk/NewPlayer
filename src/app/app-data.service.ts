import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from './model/weather';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor(private http: HttpClient) { }

  getWeather(): Observable<Array<Weather>> {
    return this.http.get<Array<Weather>>('http://192.168.1.5:8081/weatherforecast');
  }

  getVideos(): Observable<string[]> {
    return this.http.get<string[]>('http://192.168.1.5:8081/files');
  }
}
