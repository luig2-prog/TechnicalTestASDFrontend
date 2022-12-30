import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolService } from '../../../../services/rol/rol.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SweetAlert } from '../../../../utils/sweetAlert.service';
import { ClienteService } from '../../../../services/cliente/cliente.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI | any;

  listTipoDocumento:any;

  formCliente = this.fb.group({
    cduniccliente:[''],
    cdestado:[''],
    cdtipodocumento:['', [Validators.required]],
    cddocumento: ['', [Validators.required, Validators.pattern('^[0-9,$]*'),]],
    dsnombreCompleto:['', Validators.required],
    dsdireccion:['', Validators.required],
    dsemail:['', [Validators.required, Validators.email]],
    cdtelefono:['', [Validators.required,Validators.pattern('^[0-9,$]*')]],
    dtfechacreacion :[''],
    dtfechamodificacion :[''],
    cdusuario :[''],
    dsdocumento: ['']
  })
  

  constructor(
    private fb:FormBuilder,
    private serviceRol: RolService,
    private utilService: SweetAlert,
    private dialogRef: MatDialogRef<AddEditClientComponent>,
    private service: ClienteService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public inData: any) {

      if (inData === null) {
        return;
      }
      this.formCliente.setValue(this.inData.cliente);

      this.formCliente.get('cdusuario').setValue(this.auth.getCurrentUser().email);
     }

  ngOnInit(): void {
    this.getDocumentos();
  }

  saveUpdate() {
    
    if(this.formCliente.status == 'INVALID'){
      Swal.fire('', `<b>Debes diligenciar todo el formulario</b>`, 'warning');
      return;
    }
    let x = this.formCliente.get('cduniccliente')?.value;
    let title;
    if (x === '') {
      title = '¿Deseas agregar este cliente?';
    } else {
      title = '¿Deseas modificar este cliente?';
    }
    this.utilService.confirmacion(`${title}`).then((respuesta) => {
      if (respuesta.isConfirmed) {
        this.blockUI.start('Guardando...');
        this.service.saveOrUpdate(this.formCliente.getRawValue()).subscribe(
          (data: any) => {
            console.log(data);
            
            if (data.status === 200) {
              Swal.fire(data.message, '', 'success');
              this.blockUI.stop();
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
          () => {
            this.blockUI.stop();
            Swal.fire('ERROR', 'Error al editar el cliente', 'error');
          }
        );
      } else if (respuesta.isDenied) {
        Swal.fire('Cancelado', '', 'info');
      }
    });
  }

  getDocumentos() {
    this.blockUI.start('Cargando...');
    this.serviceRol.getParametros().subscribe(data => {
      if(data.status == 200){
        this.listTipoDocumento = data.data.TIPO_DOCUMENTO;
        this.blockUI.stop();
      }else{
        Swal.fire('','Ha ocurrido un error cargando los parámetros', 'error');
      }
    },() => {
      this.blockUI.stop();
      Swal.fire('ERROR', 'Ha ocurrido un error cargando los parámetros', 'error');
    })
  }
  getValue(value: string) {
    return this.formCliente.get(value);
  }

}
