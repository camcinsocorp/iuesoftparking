import { Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

//serviceFireAuth
import { FireAuthProvider } from '../../providers/fire-auth/fire-auth';
import { AngularFireAuth } from "angularfire2/auth";


//provider
import { ReportProvider } from '../../providers/report/report';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
	selector: 'page-report',
	templateUrl: 'report.html',
})
export class ReportPage implements OnInit{

	@ViewChild(Content) content: Content;
	view: number[] = [700, 300];
	data: any[] = [];
	isRealtime: boolean;
	showXAxisLabel: boolean;
	showYAxisLabel: boolean;
	showLegend: boolean;
	interval: number;

	public cantidadPorDia_data;
	public cantidadTipoVehiculo_data;
	public cantidadDisponible_data;
	public CantidadActual_data;
	public cantidadTipoUsuario_data;

	public square = {
		cantidad_disponible:0
	}

	public reportCantidadPorDia_data:any;


	constructor(public navCtrl: NavController, public navParams: NavParams,
		public fap:FireAuthProvider,
		public afAuth: AngularFireAuth,
		public alertProvider:AlertProvider,
		public reportProvider:ReportProvider) {
	}

	doRefresh(refresher) {
		this.ngOnInit();
		setTimeout(() => {
			refresher.complete();
		}, 2000);
	}

	ngOnInit(){
		
		this.cantidadPorDia();
		this.cantidadTipoVehiculo();
		this.cantidadTipoUsuario();
		this.CantidadActual();
		this.cantidadDisponible();

		
	}

	ionViewDidLoad() {
		this.applyDimensions();
		window.addEventListener('resize', () => {
			this.applyDimensions();
		}, false);
	}

	ionViewDidLeave() {
		clearInterval(this.interval);
		window.removeEventListener('resize', () => {
			
		}, false);

	}

	cantidadPorDia(){	
		this.reportProvider.cantidadPorDia({FechaInicio:"2018-05-03",FechaFin:"2018-05-05"},this.cantidadPorDiaSuccess.bind(this),this.responseHttpError.bind(this));
	}

	private cantidadPorDiaSuccess(data){
		//console.log("cantidadPorDia",data)
		this.cantidadPorDia_data = data;
	}
	
	cantidadTipoVehiculo(){	
		this.reportProvider.cantidadTipoVehiculo({FechaInicio:"2018-05-03",FechaFin:"2018-05-05"},this.cantidadTipoVehiculoSuccess.bind(this),this.responseHttpError.bind(this));
	}

	private cantidadTipoVehiculoSuccess(data){
		//console.log("cantidadTipoVehiculo",data)
		this.cantidadTipoVehiculo_data = data;
	}

	cantidadTipoUsuario(){
		this.reportProvider.cantidadTipoUsuario({FechaInicio:"2018-05-03",FechaFin:"2018-05-05"},this.cantidadTipoUsuarioSuccess.bind(this),this.responseHttpError.bind(this));	
	}

	private cantidadTipoUsuarioSuccess(data){
		//console.log("cantidadTipoUsuario",data)
		this.cantidadTipoUsuario_data = data;

	}

	CantidadActual(){
		this.reportProvider.CantidadActual({},this.CantidadActualSuccess.bind(this),this.responseHttpError.bind(this));		
	}

	private CantidadActualSuccess(data){
		//console.log("CantidadActual",data)
		this.CantidadActual_data = data;
	}

	cantidadDisponible(){
		this.reportProvider.cantidadDisponible({},this.cantidadDisponibleSuccess.bind(this),this.responseHttpError.bind(this));		
	}

	private cantidadDisponibleSuccess(data){
		//console.log("cantidadDisponible",data) 
		this.cantidadDisponible_data=data;
	}

	private responseHttpError(err){        
		this.alertProvider.viewMessageToastControllerError("Problema al Obtener los datos")
	}

	toggleRealTime( event: Event ) {
		event.preventDefault();
		this.isRealtime = !this.isRealtime;
		if ( this.isRealtime ) {
			this.interval = setInterval(() => {
				this.updateData();
			}, 1000);
		}else {
			clearInterval(this.interval);
		}
	}

	updateData() {
		this.data = this.generateData();
	}

	applyDimensions() {
		const width = this.content.getContentDimensions().contentWidth;
		const state = width >= 320;
		this.showXAxisLabel = state;
		this.showYAxisLabel = state;
		this.showLegend = state;
		this.view = [width, 300];
	}

	private generateData() {
		return [
		{
			'name': 'Cantidad Disponible',
			'value': this.square.cantidad_disponible
		},
		{
			'name': 'United States',
			'value': Math.floor(100 + Math.random() * 1)
		},
		{
			'name': 'France',
			'value': Math.floor(200 + Math.random() * 1)
		},
		{
			'name': 'United Kingdom',
			'value': Math.floor(300 + Math.random() * 1)
		},
		{
			'name': 'Spain',
			'value': Math.floor(400 + Math.random() * 1)
		},
		{
			'name': 'Italy',
			'value': Math.floor(500 + Math.random() * 1)
		}
		];
	}

	logoutUser(){
		this.fap.logoutUser();
		this.navCtrl.setRoot("LoginPage")
	}



}
