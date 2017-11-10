import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { LocationService } from './services/location.service'
import { DisplayService } from './services/display.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService,
  LocationService]
})
export class AppComponent implements OnInit {
  public position: any;
  public lon: number;
  public lat: number;
  public title = 'Weather';
  constructor(private weatherService: WeatherService,
              private locationService: LocationService,
              private display: DisplayService) {}

  ngOnInit(){
    this.locationService.getLocation().subscribe(
      (position: {}) => {
        this.position = position;
        this.lon = this.position.coords.longitude;
        this.lat = this.position.coords.latitude;
        this.weatherService.getStartWeather(this.lon, this.lat).subscribe(
          (weather: {}) => {
            this.weatherService.weatherUpdated.emit(weather),
            this.display.changeDisplay(1)
          },
          (error) => console.error
        );
        this.weatherService.getStartCity(this.lon, this.lat).subscribe(
          (city: {}) => {
            this.weatherService.cityUpdated.emit(city)
          },
          (error) => console.error
        );
      },
      (error: any) => console.log('error')
    );
    this.locationService.currentLat.subscribe(lat => this.lat = lat)
    this.locationService.currentLon.subscribe(lon => this.lon = lon)
  }
}
