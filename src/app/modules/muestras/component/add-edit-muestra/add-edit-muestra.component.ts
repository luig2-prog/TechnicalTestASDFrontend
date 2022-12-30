import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetAlert } from 'src/app/utils/sweetAlert.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { User } from 'src/app/interface/User';
import { FixedAssetService } from 'src/app/services/fixed-asset/fixed-asset.service';
import { Area } from 'src/app/interface/Area';
import { AreaService } from 'src/app/services/area/area.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-muestra',
  templateUrl: './add-edit-muestra.component.html',
  styleUrls: ['./add-edit-muestra.component.scss']
})
export class AddEditMuestraComponent implements OnInit {

  areaList: Area[] = [];
  userList: User[] = [];
  customersActive: User[] = [];
  options = [];
  areasName: string[] = [];
  filteredOptions;
  toppings = this.fb.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false
  });
  datePipe = new DatePipe("en-US");

  @BlockUI() blockUI: NgBlockUI | any;
  formMuestra = this.fb.group({
    id: [''],
    assetName: [''],
    description: [''],
    assetType: [''],
    assetSerial: [''],
    inventoryNumber: [''],
    weight: [''],
    height: [''],
    assetWith: [''],
    large: [''],
    buyValue: [''],
    dateBuy: ['', [Validators.required]],
    user_name:[''],
    user:[null],
    area: [null]

  });

  constructor(public dialogRef: MatDialogRef<AddEditMuestraComponent>,
    private areaService: AreaService,
    private userService: UsuariosService,
    private fixedAssetService: FixedAssetService, 
    private fb: FormBuilder,
    private swetAlert: SweetAlert,
    @Inject(MAT_DIALOG_DATA) public inData: any
  ) {
    console.log(inData);
    
    if (inData === null) {
      return;
    }
    this.formMuestra.setValue(inData.fixedAsset);
  }

  ngOnInit(): void {
    this.getAreas();
    this.getUsers();
  }


  saveOrUpdate() {
    if(this.formMuestra.get('user').errors != null) {
      this.swetAlert.warning('Debes seleccionar un cliente existente', '');
      return;
    }
    this.userList.forEach(user => {
      if(user.username === this.formMuestra.get('user_name').value) {
        this.formMuestra.get('user').setValue(user);
      }
    });
    if (this.inData === null) {
      this.insert();
    } else {
      this.updateMuestra();
    }
  }

  insert() {
    if (this.formMuestra.invalid) {
      this.swetAlert.warning('Debes diligenciar todo el formulario', '');
      return;
    }
    this.swetAlert.confirmacion('¿Deseas agregar esta muestra?').then((respuesta) => {
      if (respuesta.isConfirmed) {
        this.blockUI.start('Guardando...');
        this.fixedAssetService.save(this.formMuestra.getRawValue()).subscribe(data => {
            if (data.status === 200) {
              this.dialogRef.close({
                assetSerial: this.formMuestra.get('assetSerial').value
              });
              this.blockUI.stop();
              Swal.fire(data.message, '', 'success');
            } else {
              this.blockUI.stop();
              Swal.fire('', data.message, 'error');
            }
          }, response => {
            Swal.fire('ERROR', response.error.message, 'warning');
          });
      }
    });
  }

  updateMuestra() {
    this.formMuestra.get('id')?.setValue(this.inData.fixedAsset.id);
    if (this.formMuestra.invalid) {
      this.swetAlert.warning('Debes diligenciar todo el formulario', '');
      return;
    }
    this.swetAlert.confirmacion('¿Deseas actualizar la muestra?').then((respuesta) => {
      if (respuesta.isConfirmed) {
        this.blockUI.start('Cargando...');
        this.fixedAssetService.save(this.formMuestra.getRawValue()).subscribe(rta => {
            if (rta.status === 200) {
              this.dialogRef.close();
              Swal.fire(rta.message, '', 'success');
              this.blockUI.stop();
            }else{
              this.dialogRef.close();
              Swal.fire('ERROR',rta.message , 'error');
              this.blockUI.stop();
            }
          },
          (error) => {
            this.blockUI.stop();
            Swal.fire('ERROR', error, 'error');
          });
      }
    });
  }

  getAreas() {
    this.areaService.list().subscribe(response => {
      if(response.status === 200) {
        this.areaList = response.data;
        this.areaList.forEach(area => 
        { 
          this.areasName.push(area.name);
        });
        this.options = this.areasName;
      }
    });
  }
 
  getUsers() {
    this.userService.getaAll().subscribe(response => {
      if(response.status === 200) {
        this.userList = response.data;
      }
    });
  }

}
