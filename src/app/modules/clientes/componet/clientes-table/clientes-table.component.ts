
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SweetAlert } from '../../../../utils/sweetAlert.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditClientComponent } from '../add-edit-client/add-edit-client.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-clientes-table',
  templateUrl: './clientes-table.component.html',
  styleUrls: ['./clientes-table.component.scss']
})
export class ClientesTableComponent implements OnInit {


  @BlockUI() blockUI: NgBlockUI | any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['identificacion', 'nombreCliente','telefono','correo', 'detalles'];
  ELEMENT_DATA:any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;


  constructor(
    private fb:FormBuilder,
    private sweeAlert:SweetAlert,
    private clienteService:ClienteService,
    private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.blockUI.start('Cargando...');
    this.clienteService.getaAll().subscribe((res: any) => {
      console.log(res);
      if(res.status == 200){
      this.ELEMENT_DATA = res.data;
      console.log(res);
      
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.blockUI.stop();
    }else{
      this.blockUI.stop();
      Swal.fire('', res.message, "error");
    }
    });
  }

  openDialogAdd() {

    const dialogRef = this.dialog.open(AddEditClientComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if(res){
        this.getAll();
      }
    });
  }

  changedStatus(cliente:any, slide: any) {
    this.sweeAlert.confirmacion('¿Deseas cambiar el estado de este cliente?')
      .then((respuesta) => {
        if (respuesta.isConfirmed) {
          cliente.cdestado = cliente.cdestado === "I" ? "A" : "I";
          this.clienteService.changedStatus(cliente).subscribe((data: any) => {
            Swal.fire(data.message, '', 'success');
            this.getAll();
          }, error => {
            Swal.fire('ERROR', 'Error al cambiar de estado', "error")
          });
        } else {
          slide.checked = (cliente.cdestado === 'A') ? true : false;
        }
      })
  }

  editarCliente(cliente: any) {
    const dialogRef = this.dialog.open(AddEditClientComponent, {
      data: { cliente }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if(res)
        this.getAll();
    });
  }

}
