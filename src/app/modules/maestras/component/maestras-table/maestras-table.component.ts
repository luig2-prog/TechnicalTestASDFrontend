import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataMaestras } from 'src/app/interface/datamaestra';
import { maestras } from 'src/app/interface/maestras';
import { DataMaestraService } from 'src/app/services/dataMaestra/data-maestra.service';
import { MaestraService } from 'src/app/services/maestra/maestra.service';
import { SweetAlert } from 'src/app/utils/sweetAlert.service';
import Swal from 'sweetalert2';
import { AddEditMaestraComponent } from '../add-edit-maestra/add-edit-maestra.component';

@Component({
  selector: 'app-maestras-table',
  templateUrl: './maestras-table.component.html',
  styleUrls: ['./maestras-table.component.scss']
})
export class MaestrasTableComponent implements OnInit {

  dataSource = new MatTableDataSource<DataMaestras>();
  dataSourceI = new MatTableDataSource<DataMaestras>();
  listaParametrosMuestra: maestras[] = [];
  listaAnalisis: maestras[] = [];
  busquedaRecienteParametrosMuestra: any;
  BusquedaRecienteParametrosAnalisis: any;
  ELEMENT_DATA: DataMaestras[] = [];
  ELEMENT_DATAI: DataMaestras[] = [];
  displayedColumns: string[] = ['codigo', 'nombre', 'acciones'];
  listParametro: maestras[] = [];
  tipoAnalisis: string = '';

  @ViewChild('paginatorparams') paginator: MatPaginator | any;
  @ViewChild('paginatorequipo') paginatorI: MatPaginator | any;
  constructor(private maestraService: MaestraService,
              private serviceDataMaestras: DataMaestraService,
              private dialog:MatDialog,
              private sweeAlert:SweetAlert) { }

  ngOnInit(): void {
    this.getMaestra();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterI(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceI.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceI.paginator) {
      this.dataSourceI.paginator.firstPage();
    }
  }

  openDialogAdd(tipo:string) {
    
    const dialogref = this.dialog.open(AddEditMaestraComponent,{
      data:tipo
    });
    dialogref.afterClosed().subscribe((res) => {
      
      if(res){
        this.getParametrosMuestra(this.busquedaRecienteParametrosMuestra);}
    });
  }

  openDialogAddI(tipo:string) {
    const dialogref = this.dialog.open(AddEditMaestraComponent,{
      data:tipo
    });
    dialogref.afterClosed().subscribe((res) => {
      if(res){        
        this.getAnalisis(res.data.data.nmmaestro);
      }
    });
  }

  editarDataMaestra(dataMaestras: DataMaestras) {
    const dialogref = this.dialog.open(AddEditMaestraComponent, {
      data: { dataMaestras },
    });
    dialogref.afterClosed().subscribe((result) => {
      console.log(result);
      if(result){
        this.getParametrosMuestra(this.busquedaRecienteParametrosMuestra);
      }
    });
  }

  editarDataMaestraI(dataMaestras: DataMaestras) {
    const dialogref = this.dialog.open(AddEditMaestraComponent, {
      data: { dataMaestras },
    });
    dialogref.afterClosed().subscribe((result) => {
      if(result){
        this.getAnalisis(this.BusquedaRecienteParametrosAnalisis);
      }
    });
  }

  delete(id: number) {
    this.sweeAlert
      .confirmacion('¿Deseas eliminar el registro?')
      .then((respuesta) => {
        if (respuesta.isConfirmed) {
          this.serviceDataMaestras.delete(id).subscribe((rta: any) => {
            Swal.fire('Registro eliminado!', '', 'success');
            this.getParametrosMuestra(this.busquedaRecienteParametrosMuestra);
          });
        } else if (respuesta.isDenied) {
          Swal.fire('Cancelado', '', 'info');
        }
      });
  }

  deleteI(id: number) {
    this.sweeAlert
      .confirmacion('¿Deseas eliminar el registro?')
      .then((respuesta) => {
        if (respuesta.isConfirmed) {
          this.serviceDataMaestras.delete(id).subscribe((rta: any) => {
            if(rta.status ==200){
            Swal.fire('Registro eliminado!', '', 'success');
            this.getAnalisis(this.BusquedaRecienteParametrosAnalisis);
            }else{
              Swal.fire('',rta.message, 'error');
            }
          });
        } 
      });
  }

  getMaestra() {
    this.maestraService.getAll().subscribe((rta) => {
        this.listaParametrosMuestra = rta.PARAMETROS_MUESTRA;
        this.listaAnalisis = rta.PARAMETROS_POR_ANALISIS;
    });
  }

  getParametrosMuestra(id: any) {
    this.busquedaRecienteParametrosMuestra = id;
    this.maestraService.getXId(id).subscribe((rta) => {
      if(rta.status == 200){
      this.ELEMENT_DATA = rta.data;
      this.dataSource = new MatTableDataSource<DataMaestras>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      }else{
        Swal.fire('',rta.message, 'error');
      }
    });
  }

  getAnalisis(id: any) {
    this.BusquedaRecienteParametrosAnalisis = id;
    this.maestraService.getXId(id).subscribe((rta) => {
      if(rta.status == 200){
      this.ELEMENT_DATAI = rta.data;
      this.dataSourceI = new MatTableDataSource<DataMaestras>(this.ELEMENT_DATAI);
      this.dataSourceI.paginator = this.paginatorI;
      }else{
        Swal.fire('',rta.message, 'error');
      }
    });
  }
  
  getParametrosByAnalisis(dsmaestro: any){
    this.tipoAnalisis = dsmaestro;
    this.maestraService.getParametrosByAnalisis(dsmaestro).subscribe((data)=>{
      if(data.status == 200){
      this.listParametro = data.data
      }else{
        Swal.fire('',data.message, 'error');
      }
    })
  }
}
