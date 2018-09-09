import serial, time
from firebase import firebase
import mysql.connector

firebase = firebase.FirebaseApplication('https://parqueadero-1b477.firebaseio.com/', None)

def searchSQL(id_Tag):
    
    conn=mysql.connector.connect(user="root",password="Jm221409",host="localhost",database="universidad")
    mycursor=conn.cursor()
    iterable=mycursor.execute("select cedula,nombreApellido,cargo,vigencia from PERSONA"+"\n"
                         +"where PERSONA.id_RFID like " + "'"+id_Tag+"'"
                        ,multi=True)
    cadena="";
    for item in iterable:
        cadena = cadena + str(item.fetchall())
    print (cadena)
    conn.close();
    return cadena

      
opcion = 1;            
while(opcion==1):
    
    cadenaEnviar = "E9 D3 E7 AB";
    print (cadenaEnviar)
    

    
    cadenaSQL=searchSQL(cadenaEnviar)
    print (cadenaSQL)

    if(cadenaSQL != "[]"):
        
##        firebase.patch('/EventoTarjeta',{"id":cadenaEnviar})
        result = firebase.get('/Parqueadero/tamanoPlaza',None)
        if(cadenaEnviar == "E0 2F 9B 1B" and result > 0):
            result = result - 1
            mostrar = firebase.patch('/Parqueadero',{"tamanoPlaza":result,"evento":"Entro","id":cadenaEnviar,"acceso":"Concedido"})        
            print(mostrar)
          
        if(cadenaEnviar == "E9 D3 E7 AB" and result < 100):
            result = result + 1
            mostrar = firebase.patch('/Parqueadero',{"tamanoPlaza":result,"evento":"Salio","id":cadenaEnviar,"acceso":"Concedido"})        
            print(mostrar)
        else:
            mostrar = firebase.patch('/Parqueadero',{"tamanoPlaza":result,"evento":"Lleno","id":cadenaEnviar,"acceso":"Concedido"})
            print(mostrar)
    else:        
        mostrar = firebase.patch('/Parqueadero',{"id":cadenaEnviar,"evento":"","acceso":"No Concedido"})
        print(mostrar)        
        
    opcion = int(input("1. Para seguir , 0. Para Salir"))    




#-------------------No orientado a la conexion------------------
    #cadena=serialArduino(cadenaEnviar)
    #if(cadena):
    #    print('Este Arduino es de entrada')
    #    procesamientoInformacionEntrada(cadenaEnviar,arduino)
    #    
    #else:        
    #    print('Este Arduino es de salida')
    #    procesamientoInformacionSalida(cadenaEnviar,arduino)
#---------------------------------------------------------------        
   
    
    









    

