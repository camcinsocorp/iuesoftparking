import serial, time
from firebase import firebase
#import mysql.connector

firebase = firebase.FirebaseApplication('https://parqueadero-1b477.firebaseio.com/', None)

def cadena(s):
    s=rawString.split('\r')
    cadena=s[0]    
    cadena=cadena.split(" ")    
    cadenaEnviar = cadena[1]+" "+cadena[2]+" "+cadena[3]+" "+cadena[4]    
    return cadenaEnviar

def serialArduino(cadenaEnviar):
    cadena=cadenaEnviar.split('*')
    cadena= cadena[1]
    print cadena
    for letra in cadena:
        if(letra == 'E'):
            return True
            
    return False
    
def searchSQL(id_Tag,arduino):
    arduino.close()
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

def procesamientoInformacionEntrada(cadena,arduino):
    print(cadena.split('*')[0])
    cadena = cadena.split('*')[0]
    cadenaQuery=searchSQL(cadena,arduino)
    if(cadenaQuery != '[]'):
        if(cadena):
            print('Se aumenta')
            
def procesamientoInformacionSalida(cadena,arduino):
    print(cadena.split('*')[0])
    cadena = cadenaEnviar.split('*')[0]
    cadenaQuery=searchSQL(cadena,arduino)
    if(cadenaQuery != '[]'):
         if(cadena):
            print('Se disminuye')        
            
while(True):
    arduino = serial.Serial('COM3', 9600)
    rawString = arduino.readline()
    
    cadenaEnviar=cadena(rawString)
    print (cadenaEnviar)
#----------Firebase--------------------------------
    result = firebase.patch('/EventoTarjeta',{"id":cadenaEnviar})
    result = firebase.get('/Parqueadero/tamanoPlaza',None)
    
    if(cadenaEnviar == "E0 2F 9B 1B" and result > 0):
        result = result - 1
        mostrar = firebase.patch('/Parqueadero',{"tamanoPlaza":result,"evento":"Entro","id":cadenaEnviar})        
        print(mostrar)
          
    if(cadenaEnviar == "E9 D3 E7 AB" and result < 100):
        result = result + 1
        mostrar = firebase.patch('/Parqueadero',{"tamanoPlaza":result,"evento":"Salio","id":cadenaEnviar})        
        print(mostrar)
    arduino.close()    
#------------------------------------



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
   
    
    









    

