import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const GEOLOCATION_ERRORS = {
	'errors.location.unsupportedBrowser': 'Browser does not support location services',
	'errors.location.permissionDenied': 'You have rejected access to your location',
	'errors.location.positionUnavailable': 'Unable to determine your location',
	'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class LocationService {
	private  latValue = new BehaviorSubject<number>(0)
	private  lonValue = new BehaviorSubject<number>(0)
	currentLat = this.latValue.asObservable()
	currentLon = this.lonValue.asObservable()

	changeLat(lat: number){
		this.latValue.next(lat)
	}
	changeLon(lon: number){
		this.lonValue.next(lon)
	}
	public getLocation(): Observable<any> {
		return Observable.create(observer => {
			if (window.navigator && window.navigator.geolocation) {
				window.navigator.geolocation.getCurrentPosition(
					(position) => {
						observer.next(position);
            observer.complete();
					},
					(error) => {
						switch (error.code) {
							case 1:
								observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
								break;
							case 2:
								observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
								break;
							case 3:
								observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
								break;
						}
					},
        {timeout:10000});
			}
			else {
				observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
			}
		});
	}


}

export var locationServiceInjectables: Array<any> = [
  { provide: LocationService, useClass: new LocationService }
];
