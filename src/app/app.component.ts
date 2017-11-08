import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { LocationService } from './location.service'
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService,
  LocationService]
})
export class AppComponent implements OnInit {
  position: any;
  lon: number = 43.8047818;
  lat: number = 79.8745539;
  title = 'Weather';
  constructor(private weatherService: WeatherService,
              private locationService: LocationService) {}

  ngOnInit(){
    this.locationService.getLocation().subscribe(
      (position: {}) => {
        this.position = position;
        // this.lon = this.position.coords.longitude;
        // this.lat = this.position.coords.latitude;
        console.log(this.position)
      },
      (error: any) => console.log('error')
    );
    this.weatherService.getStartWeather(this.lat, this.lon).subscribe(
      (weather: {}) => this.weatherService.weatherUpdated.emit(weather),
      (error) => console.error
    );
  }
}
