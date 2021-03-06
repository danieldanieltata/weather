import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private baseUrl = 'http://localhost:3000'

  private forcastBaseUrl                 : string;
  private currentWeatherBaseUrl          : string;
private searchPlaceBaseUrl               : string;
  private makeSelectedDestinationBaseUrl : string;

  constructor(private http: HttpClient) {
      this.forcastBaseUrl = this.baseUrl + '/weather/getForecast';
      this.currentWeatherBaseUrl = this.baseUrl + '/weather/getCurrentWeather';
      this.searchPlaceBaseUrl = this.baseUrl + '/weather/searchPlace';
      this.makeSelectedDestinationBaseUrl = this.baseUrl + '/weather/makeSelectedDestination'
   }

  getForecast(cityName: string){
    return this.http.get(this.forcastBaseUrl + '?placeToGet=' + cityName, {withCredentials: true});
  }

  getCurrentWeather(cityName: string){
    return this.http.get(this.currentWeatherBaseUrl + '?placeToGet=' + cityName, {withCredentials: true});
  }

  searchPlace(cityName: string){
    return this.http.get(this.searchPlaceBaseUrl + '?placeToGet=' + cityName, {withCredentials: true});
  }

  makeSelectedDestination(cityName: string){
    return this.http.post(this.makeSelectedDestinationBaseUrl, {placeToMark: cityName}, {withCredentials: true})
  }

}
