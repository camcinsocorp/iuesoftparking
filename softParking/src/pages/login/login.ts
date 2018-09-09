import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

//Form
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

//serviceFireAuth
import { FireAuthProvider } from '../../providers/fire-auth/fire-auth';
import { AngularFireAuth } from "angularfire2/auth";

//provider
import {AlertProvider} from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{

	private formLogin: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private alertProvider: AlertProvider,
  	private formBuilder: FormBuilder,
  	public fap:FireAuthProvider,
    public afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,) {
  }

  ngOnInit(){
  	this.createForm();
  }

  //crear Formulario Login
  createForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


   //Login
   async login() {
     
     if(this.formLogin.valid) {
       let loader = this.loadingCtrl.create({content: 'Espere Porfavor...'});
       loader.present();
       this.fap.loginUser (this.formLogin.value.email, this.formLogin.value.password).then(loginData => {
         loader.dismiss();
         this.navCtrl.setRoot("ReportPage")
       }, (err) => {
         loader.dismiss();
         console.log(err);
         this.alertProvider.viewMessageToastController("Correo y Contraseña Invalido")

       });
     }else {
       
       this.alertProvider.viewMessageToastController("Requiere Correo y Contraseña")
       
     }
   }

   

 }
