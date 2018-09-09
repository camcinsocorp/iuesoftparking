
import { Injectable } from '@angular/core';

//factory
import {FactoryMethodHttpProvider} from '../factory-method-http/factory-method-http'
@Injectable()
export class ReportProvider {

	constructor(public factoryMethodHttp:FactoryMethodHttpProvider,) {

	}

	getReport(params: any, callbackSuccess, callbackError){
		this.factoryMethodHttp.methodPost("/methodReport",params, callbackSuccess, callbackError)

	}

	cantidadPorDia(params: any, callbackSuccess, callbackError){
		this.factoryMethodHttp.methodPost("/cantidadPorDia.php",params, callbackSuccess, callbackError)
	}

	cantidadTipoVehiculo(params: any, callbackSuccess, callbackError){
		this.factoryMethodHttp.methodPost("/cantidadTipoVehiculo.php",params, callbackSuccess, callbackError)
	}

	cantidadTipoUsuario(params: any, callbackSuccess, callbackError){
		this.factoryMethodHttp.methodPost("/cantidadTipoUsuario.php",params, callbackSuccess, callbackError)
	}

	CantidadActual(params: any, callbackSuccess, callbackError){
		this.factoryMethodHttp.methodGet("/CantidadActual.php",params, callbackSuccess, callbackError)
	}

	cantidadDisponible(params: any, callbackSuccess, callbackError){
		this.factoryMethodHttp.methodGet("/cantidadDisponible.php",params, callbackSuccess, callbackError)
	}
}
