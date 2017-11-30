import { Component } from '@angular/core';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
//import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hola Mundo';
  nombre = '';
 /* misnotas = [
    {
      id: 1, titulo: 'Nota', descripcion: 'Una descripcion for nota 1'
    },
    {
      id: 2, titulo: 'Nota', descripcion: 'Una descripcion for nota 2'
    },
    {
      id: 3, titulo: 'Nota', descripcion: 'Una descripcion for nota 3'
    },
    {
      id: 4, titulo: 'Nota', descripcion: 'Una descripcion for nota 4'
    },


  ];*/

  nota = { id: null, titulo: null, descripcion: null };

  mostrar_formulario = false;
  editing = false;

  misnotas: any;

  constructor(public afDB: AngularFireDatabase) {
   // this.misnotas = afDB.list('notas').valueChanges();
    if(navigator.onLine){
      this.mostrarNotas().valueChanges().subscribe(notas => { 
          this.misnotas = notas ; 
        //guardar localmente
          localStorage.setItem('misnotas',JSON.stringify(this.misnotas));
        }
      );

    }
    else{
      this.misnotas = JSON.parse(localStorage.getItem('misnotas'));
    }
    
  }

  agregarNota() {
    this.mostrar_formulario = true;

  }

  mostrarNotas(){
    return this.afDB.list('/notas');
  }

  verNota(lanota) {
    this.editing = true;

    this.nota = lanota;
    this.mostrar_formulario = true;

  }
  cancelar() {
    this.mostrar_formulario = false;
  }

  eliminarNota(){
    if(navigator.onLine){
      this.afDB.database.ref('notas/' + this.nota.id).remove();
    }
    else{
      this.misnotas.forEach((nota,i)=>{ if(nota.id == this.nota.id){ this.misnotas.splice(i,1) }});

    }
    
    this.nota = { id: null, titulo: null, descripcion: null };
    localStorage.setItem('misnotas',JSON.stringify(this.misnotas));
    this.mostrar_formulario = false;


  }

 /* eliminarNota() {
    this.mostrar_formulario = false;
    var me = this; //porque forearch crea su propio scope
    this.misnotas.forEach(function (e, i) {
      if (e.id == me.nota.id) {
        me.misnotas.splice(i, 1);
        //me.misnotas[i] = me.nota; //le asigna el elemento que esta siendo editado
      }
    });
    this.nota = { id: null, titulo: null, descripcion: null };
    this.mostrar_formulario = false;


  }
  */

  crearNota() {
    /*if (this.editing) {
      // alert('Estamos editando');
      var me = this; //porque forearch crea su propio scope
      this.misnotas.forEach(function (e, i) {
        if (e.id == me.nota.id) {
          me.misnotas[i] = me.nota; //le asigna el elemento que esta siendo editado
        }
      });
      this.mostrar_formulario = false;
      this.editing = false;
    }
    else {
      this.nota.id = Date.now();
      this.misnotas.push(this.nota);
      this.mostrar_formulario = false;
      this.nota = { id: null, titulo: null, descripcion: null };

    }
    */
   // this.nota.id = Date.now();
    if (this.editing) {
      if(navigator.onLine){
        this.afDB.database.ref('notas/' + this.nota.id).set(this.nota);
      }  
      else{
        
        this.misnotas.forEach((nota)=>{ if(nota.id == this.nota.id){ nota = this.nota; }});
      }
      
      //this.editing = false;
    } else { 
     
      this.nota.id = Date.now();   
      if(navigator.onLine){
        this.afDB.database.ref('notas/' + this.nota.id).set(this.nota);
      }  
      else{
        this.misnotas.push(this.nota);
      }
  }

  
  this.mostrar_formulario = false;
  this.nota = { id: null, titulo: null, descripcion: null };
  localStorage.setItem('misnotas',JSON.stringify(this.misnotas));

}
 

}
