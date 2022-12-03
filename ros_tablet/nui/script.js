
/* Botones */

document.getElementById('iniciar').addEventListener('click',entrar)
document.getElementById('profile').addEventListener('click',profile)
document.getElementById('vehicles').addEventListener('click',vehicles)
document.getElementById('bank').addEventListener('click',bank)
document.getElementById('multas').addEventListener('click',multas)
document.getElementById('propiedades').addEventListener('click',propiedades)
document.getElementById('cerrar-profile').addEventListener('click',cerrarProfile)
document.getElementById('cerrar-vehicles').addEventListener('click',cerrarVehicles)
document.getElementById('cerrar-bank').addEventListener('click',cerrarBank)
document.getElementById('cerrar-multas').addEventListener('click',cerrarMultas)
document.getElementById('cerrar-propiedades').addEventListener('click',cerrarPropiedades)

var NaMe = '@User';
var multaAPagar = '';
var notiff1,notiff2,notiff3,notiff4 = false;
/* Funciones */

$(function () {
  $('#tabla-multas').click(function(e) {
    if(e.target.id=='tabla-multas'){
      console.log('no');
    }else{
    var idds = e.target.id;
    var amm = e.target.value;
    document.getElementById(idds).disabled = true;
    document.getElementById(idds).textContent = '';
    document.getElementById(idds).innerHTML = '<i class="fa-solid fa-check"></i>';
    notificar("Has pagado una factura pendiente");
    $.post('https://ros_tablet/pagarMulta', JSON.stringify({
      valor: idds, cantidad: amm
   }));
  };
  });

  $('#aceptar-foto').click(function() {
    var aux = document.getElementById('input-image').value;
    notificar("Has actualizado tu foto de perfil");
    document.getElementById('imagen-profile').style.backgroundImage = 'url("' + aux + '")';
    $.post('https://ros_tablet/establecerFoto', JSON.stringify({
      foto: aux
   }));
  });

  $('#cerrar-tablet').click(function() {
    document.getElementById('tablet').animate([
      // fotogramas clave
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-1200px)' }
    ], {
      // opciones de sincronización
      duration: 800
    });
    document.getElementById('imagen-tablet').animate([
      // fotogramas clave
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-1200px)' }
    ], {
      // opciones de sincronización
      duration: 800
    });
    document.getElementById('cerrar-tablet').animate([
      // fotogramas clave
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-1200px)' }
    ], {
      // opciones de sincronización
      duration: 800
    });
    setTimeout(() => {
      document.getElementById('tablet').style.display = 'none';
      document.getElementById('imagen-tablet').style.display = 'none';
      document.getElementById('cerrar-tablet').style.display = 'none';
      $.post('https://ros_tablet/cerrarTablet', JSON.stringify({
        op: true
     }));
     salir();
    }, 700);
  });

});

function notificar(texto){
    var contenedorTabla = document.getElementById('notificacion');
    contenedorTabla.innerHTML = "";
    var tabla = '<i class="fa-solid fa-envelope" style="padding-right: 6px; vertical-align: center;"></i><hr>' + texto;
    contenedorTabla.innerHTML = tabla;
  document.getElementById('notificacion').animate([
    // fotogramas clave
    { transform: 'translateY(-200px)' },
    { transform: 'translateY(0px)' }
  ], {
    // opciones de sincronización
    duration: 1000
  });
  setTimeout(() => {
    document.getElementById('notificacion').style.display = 'flex';
    var audio = document.getElementById("audio");
    audio.play();
  }, 100);
  setTimeout(() => {
    document.getElementById('notificacion').animate([
      // fotogramas clave
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-200px)' }
    ], {
      // opciones de sincronización
      duration: 800
    });
  }, 2500);
  setTimeout(() => {
    document.getElementById('notificacion').style.display = 'none';
  }, 2800);
  /*document.getElementById('notificacion').animate([
    // fotogramas clave
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-200px)' }
  ], {
    // opciones de sincronización
    duration: 300
  });
  setTimeout(() => {
    document.getElementById('notificacion').style.display = 'none';
  }, 200);*/
}

setInterval(reloj,1000)

function reloj(){
    momento = new Date();
    hora = momento.getHours();
    minuto = momento.getMinutes();
    segundo = momento.getSeconds();
    document.getElementById('reloj').textContent = hora + ':' + minuto + ':' + segundo;
    document.getElementById('hora-inicio').textContent = hora + ':' + minuto; 
}

function entrar(){
    document.getElementById('inicio').animate([
        // fotogramas clave
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-800px)' }
      ], {
        // opciones de sincronización
        duration: 1000
      });
      setTimeout(() => {
        document.getElementById('inicio').style.display = 'none';
      }, 800);
    document.getElementById('menu').style.display = 'flex';
    notificar("Bienvenido, has iniciado sesion como " + NaMe);
}

function salir(){
  document.getElementById('inicio').animate([
    // fotogramas clave
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-800px)' }
  ], {
    // opciones de sincronización
    duration: 0
  });
  document.getElementById('inicio').style.display = 'flex';

}

function profile(){
    document.getElementById('pagina-profile').animate([
        // fotogramas clave
        { transform: 'translateY(-800px)' },
        { transform: 'translateY(0px)' }
      ], {
        // opciones de sincronización
        duration: 300
      });
      setTimeout(() => {
        document.getElementById('pagina-profile').style.display = 'flex';
      }, 100);
}

function vehicles(){
  document.getElementById('pagina-vehicles').animate([
    // fotogramas clave
    { transform: 'translateY(-800px)' },
    { transform: 'translateY(0px)' }
  ], {
    // opciones de sincronización
    duration: 300
  });
  setTimeout(() => {
    document.getElementById('pagina-vehicles').style.display = 'flex';
  }, 100);
  if(notiff3){
    notificar('Parece que no tienes ningun vehiculo...');
  }
}

function bank(){
  document.getElementById('pagina-bank').animate([
    // fotogramas clave
    { transform: 'translateY(-800px)' },
    { transform: 'translateY(0px)' }
  ], {
    // opciones de sincronización
    duration: 300
  });
  setTimeout(() => {
    document.getElementById('pagina-bank').style.display = 'flex';
  }, 100);
  if(notiff1){
    notificar('Necesitas tener tarjetas paramostrar los datos');
  }
}

function multas(){
  document.getElementById('pagina-multas').animate([
    // fotogramas clave
    { transform: 'translateY(-800px)' },
    { transform: 'translateY(0px)' }
  ], {
    // opciones de sincronización
    duration: 300
  });
  setTimeout(() => {
    document.getElementById('pagina-multas').style.display = 'flex';
  }, 100);
  if(notiff4){
    notificar('Parece que no tienes ninguna factura por pagar...');
  }
}

function propiedades(){
  document.getElementById('pagina-propiedades').animate([
    // fotogramas clave
    { transform: 'translateY(-800px)' },
    { transform: 'translateY(0px)' }
  ], {
    // opciones de sincronización
    duration: 300
  });
  setTimeout(() => {
    document.getElementById('pagina-propiedades').style.display = 'flex';
  }, 100);
  if(notiff2){
    notificar('Parece que no tienes ninguna propiedad...');
  }
}

function cerrarProfile(){
    document.getElementById('pagina-profile').animate([
        // fotogramas clave
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-800px)' }
      ], {
        // opciones de sincronización
        duration: 300
      });
      setTimeout(() => {
        document.getElementById('pagina-profile').style.display = 'none';
      }, 200);
}

function cerrarVehicles(){
  document.getElementById('pagina-vehicles').animate([
      // fotogramas clave
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-800px)' }
    ], {
      // opciones de sincronización
      duration: 300
    });
    setTimeout(() => {
      document.getElementById('pagina-vehicles').style.display = 'none';
    }, 200);
}

function cerrarBank(){
  document.getElementById('pagina-bank').animate([
      // fotogramas clave
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-800px)' }
    ], {
      // opciones de sincronización
      duration: 300
    });
    setTimeout(() => {
      document.getElementById('pagina-bank').style.display = 'none';
    }, 200);
}

function cerrarMultas(){
  document.getElementById('pagina-multas').animate([
      // fotogramas clave
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-800px)' }
    ], {
      // opciones de sincronización
      duration: 300
    });
    setTimeout(() => {
      document.getElementById('pagina-multas').style.display = 'none';
    }, 200);
}

function cerrarPropiedades(){
  document.getElementById('pagina-propiedades').animate([
      // fotogramas clave
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-800px)' }
    ], {
      // opciones de sincronización
      duration: 300
    });
    setTimeout(() => {
      document.getElementById('pagina-propiedades').style.display = 'none';
    }, 200);
}



/* Window listener */

window.addEventListener('message',function (event){

  if(event.data.tablabool==true){
    var numFilas = event.data.longitud;
    var contenedorTabla = document.getElementById('tabla-vehicles');

    contenedorTabla.innerHTML = "";
    var tabla = "<table>";
    for(var i=0; i<numFilas; i++){
        tabla += "<tr>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:rgb(242, 242, 247); width:215px; height:20px;text-align: center;'>" + event.data.tablaN[i] + "</td>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:rgb(242, 242, 247); width:215px; height:20px;text-align: center;'>" + event.data.tabla[i].garage + "</td>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:rgb(242, 242, 247); width:215px; height:20px;text-align: center;'>" + event.data.tabla[i].plate + "</td>";
        tabla += "</tr>";   
    }
    tabla += "</table>";
    contenedorTabla.innerHTML = tabla;
  }

  if(event.data.abrir==true){
    document.getElementById('tablet').animate([
      // fotogramas clave
      { transform: 'translateY(-1200px)' },
      { transform: 'translateY(0px)' }
    ], {
      // opciones de sincronización
      duration: 800
    });
    document.getElementById('imagen-tablet').animate([
      // fotogramas clave
      { transform: 'translateY(-1200px)' },
      { transform: 'translateY(0px)' }
    ], {
      // opciones de sincronización
      duration: 800
    });
    document.getElementById('cerrar-tablet').animate([
      // fotogramas clave
      { transform: 'translateY(-1200px)' },
      { transform: 'translateY(0px)' }
    ], {
      // opciones de sincronización
      duration: 800
    });
    setTimeout(() => {
      document.getElementById('tablet').style.display = 'flex';
      document.getElementById('imagen-tablet').style.display = 'flex';
      document.getElementById('cerrar-tablet').style.display = 'flex';
    }, 100);
  }

  if(event.data.perfil==true){
    this.document.getElementById('nombre-output').textContent = event.data.dataProfile.name1 + ' ' + event.data.dataProfile.name2;
    this.document.getElementById('nombre-tarjeta').textContent = event.data.dataProfile.name1 + ' ' + event.data.dataProfile.name2;
    this.document.getElementById('idd').textContent = 'Tu id: ' + event.data.dataProfile.id;
    this.document.getElementById('telefono').textContent = 'Telefono : ' + event.data.dataProfile.phone;
    this.document.getElementById('trabajo').textContent = 'Trabajo: ' + event.data.dataProfile.job;
    this.document.getElementById('fecha').textContent = 'Fecha de Nacimiento: ' + event.data.dataProfile.fecha;
    this.document.getElementById('nacionalidad').textContent = 'Nacionalidad: ' + event.data.dataProfile.nacionalidad;
    this.document.getElementById('genero').textContent = 'Genero: ' + event.data.dataProfile.sex;
    this.document.getElementById('imagen-profile').style.backgroundImage = 'url("' + event.data.dataProfile.foto + '")';
    this.document.getElementById('balance').textContent = 'Balance: ' + event.data.dataProfile.bankMoney + '$';
    NaMe = '@' + event.data.dataProfile.name1;
  }

  if(event.data.cards==true){
    var numFilas = event.data.longitudCards;
    var contenedorTabla = document.getElementById('tabla-cards');

    contenedorTabla.innerHTML = "";
    var tabla = "<table>";
    for(var i=0; i<numFilas; i++){
        tabla += "<tr>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:white; width:215px; height:20px;text-align: center;'>" + event.data.dataCards[i].cardNumber + "</td>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:white; width:215px; height:20px;text-align: center;'>" + event.data.dataCards[i].cardPin + "</td>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:white; width:215px; height:20px;text-align: center;'>" + event.data.dataCards[i].cardType + "</td>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:white; width:215px; height:20px;text-align: center;'><i id='elem" + i + "' class='fa-solid fa-file-invoice-dollar'></i></td>";
        tabla += "</tr>";   
        if(event.data.dataCards[i].cardActive=='1'){
          this.document.getElementById('numero-tarjeta').textContent = event.data.dataCards[i].cardNumber;
        }
    }
    tabla += "</table>";
    contenedorTabla.innerHTML = tabla;
  }

  if(event.data.invoices==true){
    var numFilas = event.data.longitudInvoices;
    var contenedorTabla = document.getElementById('tabla-multas');
    contenedorTabla.innerHTML = "";
    var tabla = "<table>";
    for(var i=0; i<numFilas; i++){
        tabla += "<tr>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:rgb(242, 242, 247); width:215px; height:20px;text-align: center;'>" + event.data.dataInvoices[i].id + "</td>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:rgb(242, 242, 247); width:215px; height:20px;text-align: center;'>" + event.data.dataInvoices[i].amount + "$</td>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:rgb(242, 242, 247); width:215px; height:20px;text-align: center;'>" + event.data.dataInvoices[i].sender + "</td>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:rgb(242, 242, 247); width:215px; height:20px;text-align: center;'>" + event.data.dataInvoices[i].society + "</td>";
        tabla += '<td><button class="btn btn-danger" id="' + event.data.dataInvoices[i].id + '" value="' + event.data.dataInvoices[i].amount + '" style="border-radius:10px; border:none; padding: 5px;"' + '>Pagar</button></td>';
        tabla += "</tr>"; 
    }
    tabla += "</table>";
    contenedorTabla.innerHTML = tabla;
  }

  if(event.data.propiedades==true){
    var numFilas = event.data.longitudPropiedades;
    var contenedorTabla = document.getElementById('tabla-propiedades');
    contenedorTabla.innerHTML = "";
    var tabla = "<table>";
    for(var i=0; i<numFilas; i++){
        tabla += "<tr>";
        tabla += "<td style='padding: 5px; color:black; border-radius: 7px; background-color:rgb(242, 242, 247); max-width:255px; height:20px;text-align: center;'><i class='fa-solid fa-house'></i>  " + event.data.dataPropiedades[i].house + "</td>";
        tabla += "</tr>"; 
    }
    tabla += "</table>";
    contenedorTabla.innerHTML = tabla;
  }

  if(event.data.notif1==true){
    notiff1 = true;
      /*notificar('Necesitas tener tarjetas paramostrar los datos');*/
  }else{
    notiff1 = false;
  }

  if(event.data.notif2==true){
    notiff2 = true;
    /*notificar('Parece que no tienes ninguna propiedad...');*/
  }else{
    notiff2 = false;
  }

  if(event.data.notif3==true){
    notiff3 = true;
    /*notificar('Parece que no tienes ningun vehiculo...');*/
  }else{
    notiff3 = false;
  }

  if(event.data.notif4==true){
    notiff4 = true;
    /*notificar('Parece que no tienes ninguna factura por pagar...');*/
  }else{
    notiff4 = false;
  }
})



/*

 $.post('https://ros_tablet/updatePin', JSON.stringify({
                pin: pad(newPin, 4),
                currentBankCard
             }));

*/