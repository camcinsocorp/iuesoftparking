import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


//Form
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

//Provider
import { FireDatabaseProvider } from '../../providers/fire-database/fire-database'
import { FireStorageProvider } from '../../providers/fire-storage/fire-storage';
import { AlertProvider } from '../../providers/alert/alert';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{

  private formTarjetaId: FormGroup;

  public dataJson = {
    acceso: "",
    evento: "Espera",
    id:"",
    tamanoPlaza: "0"
  }

  public imgLogo;
  firestore = firebase.storage();

  public loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertProvider:AlertProvider,
    public fireDatabaseProvider:FireDatabaseProvider,
    public fireStorageProvider:FireStorageProvider,
    private formBuilder: FormBuilder,
    
    ) {
  }

  
  
  ionViewDidLoad(){
      this.fireStorageProvider.getUrlStorage("LogoSmartParking.png",this.getUrlStorageImage.bind(this));
  }

  doRefresh(refresher) {
    this.ngOnInit();

    setTimeout(() => {

      refresher.complete();
    }, 2000);
  }

  ngOnInit(){
    this.createForm();
    this.fireDatabaseProvider.getInfo(this.getDataInfo.bind(this));
  }

  createForm() {

    this.formTarjetaId = this.formBuilder.group({
      acceso: ['', Validators.required],
      evento: ['', Validators.required],
      id: ['', Validators.required], 
      tamanoPlaza: ['', Validators.required],   
    });

    this.formTarjetaId.patchValue(this.dataJson)
  }

  getDataInfo(data){
    //console.log(data)
    
    if(data != undefined){

      var a = document.getElementsByName("tag")
      
      if(data["acceso"] == "Concedido"){
      for (var i=0; i<a.length; i++) a[i].style.backgroundColor="green";

        if(data["evento"] == "Salio"){
          this.alertProvider.viewMessageToastControllerSuccess("Acceso Concedido, Que tenga un buen dia")
   
        }else{
          if(data["evento"] == "Entro"){
            this.alertProvider.viewMessageToastControllerSuccess("Acceso Concedido, Bienvenido")
            
          }else{
            if(data["evento"] == "Lleno"){
             this.alertProvider.viewMessageToastControllerSuccess("Parqueadero lleno")
             
             for (var i=0; i<a.length; i++) a[i].style.backgroundColor="orange";
            }
          }
        }
      }else{
        if(data["acceso"] == "No Concedido"){
          this.alertProvider.viewMessageToastControllerError("Acesso No Concedido")
          
          for (var i=0; i<a.length; i++) a[i].style.backgroundColor="red";
        }
    }

    this.formTarjetaId.patchValue(data)
  }
}

getUrlStorageImage(image){
  this.imgLogo = image;

}




}
