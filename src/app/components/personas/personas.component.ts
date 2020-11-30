import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"; 
import { PersonasService } from '../../services/personas.service';
import { Personas } from "../../models/personas";
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  FormReg: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private personasService: PersonasService,
    private modalDialogService: ModalDialogService) { }
  submitted = false;
  Lista: Personas [] = [];
  Titulo = "Personas";
  TituloAccionABMC = {
    A: "(Agregar)",
    C: "(Consultar)",
    L: "(Listado)"
    };
    Mensajes = {
  SD: " No se encontraron registros...",
  RD: " Revisar los datos ingresados..."
  };
  AccionABMC = "L"; 

  ngOnInit() {

    this.FormReg = this.formBuilder.group({
       //CREA OBJETO CUYAS PROPIEDADES ESTAN VINCULADAS AL HTML, A LA VARIABLE FORMREG
      //ANGULAR VA A BUILDEAR PROPIEDAD DEL OBJETO CON EL VALOR DEL ELEMENTO HTML
      IdPersona: [null],
      Nombre: [null, [Validators.required, Validators.maxLength(30)]],
      FechaNacimiento: [null, [Validators.required,Validators.pattern("(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}") ]],
      Limite: [null, [Validators.required]],
    });

 this.getPersonas();
}
getPersonas() { 

this.personasService.get().subscribe((res: Personas[]) => {
this.Lista = res
});

  }
Consultar(){
 this.AccionABMC = "C";

}
 Volver() {
    this.AccionABMC = "L";
  }
Agregar(){

    this.AccionABMC = "A";
     this.FormReg.reset();
    this.submitted = false;
    this.FormReg.markAsUntouched();
    
  }
  Grabar() {
    this.submitted = true;
    
    if (this.FormReg.invalid) {
      return;
    }
    
    const itemCopy = { ...this.FormReg.value }; 
    
    var arrFecha = itemCopy.FechaNacimiento.substr(0, 10).split("/");
    if (arrFecha.length == 3)
      itemCopy.FechaNacimiento = 
          new Date(
          arrFecha[2],
          arrFecha[1] - 1,
          arrFecha[0]
          ).toISOString();
        
                   
    // agregar post
    //SI NO HAY ID ES ALTA 
    if (itemCopy.IdContacto == 0 || itemCopy.IdContacto == null) {
      itemCopy.IdContacto = 0;
      this.personasService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert("Registro agregado correctamente.");
      });
    } else {
      // modificar put
      this.personasService
        .put(itemCopy.IdContacto, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          this.modalDialogService.Alert("Registro modificado correctamente.");
        });
    }
   
}
}



