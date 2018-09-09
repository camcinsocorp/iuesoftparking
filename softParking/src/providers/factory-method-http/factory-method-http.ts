import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';

import { Observable } from 'rxjs/Observable';

//config
import { APPCONFIG } from "../../app/app.config";
import { FireAuthProvider } from '../fire-auth/fire-auth';



@Injectable()
export class FactoryMethodHttpProvider {

	constructor(
		public fireAuthProvider: FireAuthProvider, 
		public http:Http,
		) {

	}
	methodPost(ruta:string, params: any, callbackSuccess, callbackError){

		let headers = new Headers({ 'Content-Type': APPCONFIG.contentType});
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify(params);
		let currentUrl = APPCONFIG.apiEndpoint + ruta;

		this.http.post(currentUrl, body)

		.map(this.extractData)
		.catch(this.handleError).timeout(20000)
		.subscribe(data =>{
			callbackSuccess(data);
		},
		error => {
			callbackError(error);
		})	
		

	}

	methodGet(ruta:string, params: any, callbackSuccess, callbackError){

		let headers = new Headers({ 'Content-Type': APPCONFIG.contentType});
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify(params);
		let currentUrl = APPCONFIG.apiEndpoint + ruta;

		this.http.get(currentUrl, body)

		.map(this.extractData)
		.catch(this.handleError).timeout(20000)
		.subscribe(data =>{
			callbackSuccess(data);
		},
		error => {
			callbackError(error);
		})	
		

	}

	private extractData(res: Response) {
		let body:any;
		try{
			body =  res.json()
		}catch(e){
			body =  res.text();
		}
		return body || { };
	}

	private handleError (error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		console.error(error);
		let errMsg: string;
		if (error instanceof Response) {
			let body: any;
			let err: string;
			try{
				body =  error.json()
				err = body.error;
			}catch(e){
				err =  error.text();
			}
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}


}
