import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { SweetAlert } from 'src/app/utils/sweetAlert.service';
import Swal from 'sweetalert2';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Documento', 'Correo', 'rol', 'Acciones'];
  dataSource = new MatTableDataSource<any>();
  ELEMENT_DATA: Usuario[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  rol: any;
  @BlockUI() blockUI: NgBlockUI | any;

  constructor(
    public dialog: MatDialog,
    private utilService: SweetAlert,
    private service: UsuariosService,
    private auth: AuthService,
    private sweeAlert:SweetAlert,
    private router: Router) {
    console.log("User: ", auth.getCurrentUser());
    
    this.rol = auth.getCurrentUser().roles[0].authority;
    // if (this.rol != 'ROLE_QUIALITY') {
    //   Swal.fire('', `<b>Usted no tiene permisos para acceder a este módulo</b>`, 'warning');
    //   this.router.navigate(['/home']);
    // }
  }

  ngOnInit(): void {
    this.getAll();
  }

  openDialogAdd() {
    const dialogRef = this.dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if(res){
      this.getAll();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.blockUI.start('Cargando...');
    this.service.getaAll().subscribe((res: any) => {
      if(res.status == 200){
      this.ELEMENT_DATA = res.data;
      console.log(res);
      
      this.dataSource = new MatTableDataSource<Usuario>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.blockUI.stop();
    }else{
      this.blockUI.stop();
      Swal.fire('', res.message, "error");
    }
    });
  }

  editarUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(AddEditComponent, {
      data: { usuario }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if(res)
        this.getAll();
    });
  }

  changedStatus(usuario: Usuario, slide: any) {
    this.utilService.confirmacion('¿Deseas cambiar el estado de este cliente?')
      .then((respuesta) => {
        if (respuesta.isConfirmed) {
          usuario.cdestado = usuario.cdestado === "I" ? "A" : "I";
          this.service.changedStatus(usuario).subscribe((data: any) => {
            Swal.fire(data.message, '', 'success');
            this.getAll();
          }, error => {
            Swal.fire('ERROR', 'Error al cambiar de estado', "error")
          });
        } else {
          slide.checked = (usuario.cdestado === 'A') ? true : false;
        }
      })
  }
  deleteUser(nmid:string){
    this.sweeAlert
    .confirmacion(`¿Deseas eliminar este usuario?`)
    .then((respuesta) => {
      if (respuesta.isConfirmed) {
        this.blockUI.start('Eliminando...');
        this.service.deleteUser(nmid).subscribe((rta: any) => {
          if(rta.status == 200){
            Swal.fire(rta.message, '', 'success');
            this.getAll();
            this.blockUI.stop();
          }else{
            Swal.fire('', rta.message, 'error');
            this.getAll();
            this.blockUI.stop();
          }
        },(error) => {
          this.blockUI.stop();
          Swal.fire('ERROR', 'Error al eliminar el usuario', 'error');
        });
      }
    });
  }

}
