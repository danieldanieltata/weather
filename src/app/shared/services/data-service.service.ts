import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiKey                : string;

  private forcastBaseUrl        : string;
  private currentWeatherBaseUrl : string;
  private searchPlaceBaseUrl    : string;

  constructor(private http: HttpClient) {
      this.apiKey = 'fbcc4560f1e142fb94691210191206';

      this.forcastBaseUrl = 'https://api.apixu.com/v1/forecast.json';
      this.currentWeatherBaseUrl = 'http://localhost:3000/weather/getCurrentWeather';
      this.searchPlaceBaseUrl = 'http://localhost:3000/weather/searchPlace'
   }

  getForecast(cityName: string){
      //return this.http.get(this.forcastBaseUrl + '?key=' + this.apiKey + '&days=7&q=' + cityName)
      return this.http.get('http://localhost:3000/weather/getForecast' + '?placeToGet=' + cityName);
  }

  getCurrentWeather(cityName: string){
    return this.http.get(this.currentWeatherBaseUrl + '?placeToGet=' + cityName);
  }

  searchPlace(cityName: string){
    return this.http.get(this.searchPlaceBaseUrl + '?placeToGet=' + cityName);
  }

}
