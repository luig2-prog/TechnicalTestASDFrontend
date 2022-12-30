import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolService } from 'src/app/services/rol/rol.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { SweetAlert } from 'src/app/utils/sweetAlert.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {


  @BlockUI() blockUI: NgBlockUI | any;

  tituloForm: string = '';
  listRoles: any[] = [];
  listTipoDocumento: [
    {
      type: 'CC',
    },
    {
      type: 'TI',
    },
    {
      type: 'CE',
    }
  ];
  
  formUsuario = new FormGroup({
    id: new FormControl(''),
    documentType: new FormControl(''),
    document: new FormControl('', [Validators.required, Validators.pattern('^[0-9$]*')]),
    address: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl(''),
    role: new FormControl(),
    area: new FormControl(),
    state: new FormControl(''),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private service: UsuariosService,
    private utilService: SweetAlert,
    private serviceRol: RolService,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public inData: any
  ) {
    console.log("DATAAA", inData);
    
    if (inData === null) {
      return;
    }
    this.formUsuario.setValue(this.inData.usuario);
    this.formUsuario.controls['email'].disable();
  }

  ngOnInit(): void {
    this.getParametros();
  }

  getValue(value: string) {
    return this.formUsuario.get(value);
  }

  saveUpdate() {
    
    if(this.formUsuario.status == 'INVALID'){
      Swal.fire('', `<b>Debes diligenciar todo el formulario</b>`, 'warning');
      return;
    }
    let x = this.formUsuario.get('id')?.value;
    let title;
    if (x === '') {
      title = '¿Deseas agregar este usuario?';
    } else {
      title = '¿Deseas editar este usuario?';
    }
    this.utilService.confirmacion(`${title}`).then((respuesta) => {
      if (respuesta.isConfirmed) {
        this.blockUI.start('Guardando...');
        this.service.saveOrUpdate(this.formUsuario.getRawValue()).subscribe(
          (data: any) => {
            if (data.status === 200) {
              Swal.fire(data.message, '', 'success');
              this.dialogRef.close({
                data
              });
            } else {
              this.blockUI.stop();
              Swal.fire({
                icon: 'warning',
                text: data.message
              });
            } 
          },
          (response) => {
            console.log("🚀 ~ file: add-edit.component.ts:121 ~ AddEditComponent ~ this.utilService.confirmacion ~ response", response)

            Swal.fire('ERROR', response.error.message, 'warning');
          }
        );
      } else if (respuesta.isDenied) {
        Swal.fire('Cancelado', '', 'info');
      }
      this.blockUI.stop();
    });
  }

  getParametros() {
    this.serviceRol.getParametros().subscribe(data => {
      this.listRoles = data.data;
      // this.listTipoDocumento = data.data.TIPO_DOCUMENTO;
      if (this.inData) {
        console.log("ROLL:::: ", this.inData.role);
        
        this.formUsuario.get('documentType').patchValue(this.listRoles.find(r => r.id == this.inData.usuario.rol.id));
        this.formUsuario.get('rol').patchValue(this.listRoles.find(r => r.id == this.inData.usuario.rol.id));
      }
    });
  }

}
