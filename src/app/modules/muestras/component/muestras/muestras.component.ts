import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlert } from 'src/app/utils/sweetAlert.service';
import Swal from 'sweetalert2';
import { AddEditMuestraComponent } from '../add-edit-muestra/add-edit-muestra.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { FixedAssetService } from 'src/app/services/fixed-asset/fixed-asset.service';
import { FixedAsset } from 'src/app/interface/FixedAsset';

@Component({
  selector: 'app-muestras-sin-analisis',
  templateUrl: './muestras.component.html',
  styleUrls: ['./muestras.component.scss']
})
export class MuestrasComponent implements OnInit {

  fixedAssets: FixedAsset[] = [];
  eliminando: boolean = false;
  isDirector = false;

  @BlockUI() blockUI: NgBlockUI | any;
  ELEMENT_DATA: FixedAsset[] = [];

  displayedColumns: string[] = [
    'codigo', 'fechaToma', 'tipoMuestra', 'preservacion', 'tipoRecipiente', 'puntoRecoleccion', 
    'tomadoPor', 'cliente', 'buyValue','dateBuy','user', 'area','detalles'
  ];
  dataSource = new MatTableDataSource<any>();
  rol: any;

  formConsulta = this.fb.group({
    dateBuy: [''],
    assetSerial: [''],
    assetType: ['']
  });

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(
    private dialog: MatDialog,
    private sweeAlert: SweetAlert,
    private fixedAssetService: FixedAssetService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.rol = auth.getCurrentUser().roles;
    this.isDirector = this.rol == 'ROLE_USER' ? true : false;
  }

  ngOnInit(): void {
    this.listarMaestras();

  }

  listarMaestras() {
    this.blockUI.start('Cargando...');
    this.fixedAssetService.list().subscribe((response: any) => {
      this.fixedAssets = response.data;
      this.ELEMENT_DATA = response.data;
      this.dataSource = new MatTableDataSource<FixedAsset>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.blockUI.stop();
    }, (response) => {
      Swal.fire('Info', response.error.message, 'warning');
      this.blockUI.stop();
    }
    );
  }

  async consultaByParameter() {

    this.blockUI.start('Cargando...');
    this.fixedAssetService.getByTypeDateOrSerial(this.formConsulta.getRawValue()).subscribe(data => {

      if (data.status == 200) {
        if (data.data.length == 0) {
          if (!this.eliminando) {
            this.sweeAlert.info('No se encontraron registros con los parámetros consultados', '');
          }
          this.eliminando = false;
        }
        this.ELEMENT_DATA = data.data;

        this.dataSource = new MatTableDataSource<FixedAsset>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.blockUI.stop();
      } else {
        Swal.fire('', `<b>${data.message}</b>`, 'warning')
        this.blockUI.stop();
      }

    }, error => {
      this.blockUI.stop();
      Swal.fire('ERROR', error.error.message, 'warning');
    })
  }

  updateMuestra(fixedAsset: any) {
    console.log("🚀 ~ file: muestras.component.ts:145 ~ MuestrasComponent ~ updateMuestra ~ fixedAsset", fixedAsset)
    
    if(fixedAsset.user !== null) {
      fixedAsset.user_name = fixedAsset.user.username;
    }
    const dialogref = this.dialog.open(AddEditMuestraComponent, {
      data: {
        fixedAsset
      }
    })
    dialogref.afterClosed().subscribe((res) => {
      if (res) {
        this.consultaByParameter();
      }
    })
  }

  deleteMuestra(cdunimuestra: string) {

    this.sweeAlert
      .confirmacion(`¿Deseas eliminar esta muestra?`)
      .then((respuesta) => {
        if (respuesta.isConfirmed) {
          this.blockUI.start('Eliminando...');
          // this.muestraService.deleteMuestra(cdunimuestra).subscribe((rta: any) => {
          //   this.eliminando = true;
          //   Swal.fire(rta.message, '', 'success');
          //   this.consultaByParameter();
          //   this.blockUI.stop();
          // }, (error) => {
          //   this.blockUI.stop();
          //   Swal.fire('ERROR', 'Error al eliminar la muestra', 'error');
          // });
        } else if (respuesta.isDenied) {
          Swal.fire('Cancelado', '', 'info');
        }
      });
  }

  openDialogAdd() {
    // if(this.rol != 'ROLE_DIRECTOR'){
    //   this.sweeAlert.warning(`<b>Quienes pueden agregar muestras son los directores técnicos</b>`, '');
    //   return
    // }
    const dialogRef = this.dialog.open(AddEditMuestraComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.formConsulta.get('assetSerial').setValue(res.assetSerial)
        this.consultaByParameter();
      }
    });
  }

  base64ToArrayBuffer(base64: any) {
    let binaryString = window.atob(base64);
    let binaryLen = binaryString.length;
    let bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      let ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  generarReporteMuestra(cdunimuestra: string) {
    this.blockUI.start('Generando reporte...');
    // this.muestraService.generarReporteMuestra(cdunimuestra).subscribe(
    //   (rta: any) => {
    //     if (rta.status == 0) {
    //       const array = this.base64ToArrayBuffer(rta.data);
    //       const blob = new Blob([array], { type: 'application/octet-stream' });
    //       this.blockUI.stop();
    //     } else {
    //       this.blockUI.stop();
    //       Swal.fire('ERROR', 'Ha ocurrido un error', 'error');
    //     }

    //   },
    //   (error) => {
    //     this.blockUI.stop();
    //     Swal.fire('ERROR', 'Falló la generación del reporte', 'error');
    //   }
    // );
  }


  limpiarFiltros() {
    this.formConsulta.patchValue({
      dateBuy: '',
      fehastatoma: '',
      assetSerial: '',
      cdtipomuestra: '',
      assetType: '',
      cdpreservacion: '',
      cdtomadapor: '',
      cdestado: '',
      dstomadapor: '',
    });
  }
  colors(cdestado: any): any {
    if (cdestado == 34) {
      return '#e2e8f0';
    }
    if (cdestado == 39) {
      return 'rgb(252 211 77 / 65%)';
    }
    if (cdestado == 38) {
      return '#fca5a5';
    }
    if (cdestado == 37) {
      return '#d9f99d';
    }
    if (cdestado == 35) {
      return 'rgb(252 211 77 / 65%)';
    }
  }
}
