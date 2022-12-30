import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataMaestras } from 'src/app/interface/datamaestra';
import { DataMaestraService } from 'src/app/services/dataMaestra/data-maestra.service';
import { MaestraService } from 'src/app/services/maestra/maestra.service';
import { SweetAlert } from 'src/app/utils/sweetAlert.service';
import Swal from 'sweetalert2';
import { maestras } from '../../../../interface/maestras';

@Component({
  selector: 'app-add-edit-maestra',
  templateUrl: './add-edit-maestra.component.html',
  styleUrls: ['./add-edit-maestra.component.scss']
})
export class AddEditMaestraComponent implements OnInit {

  dataMaestrasForm = new FormGroup({
    nmdato: new FormControl('',),
    nmmaestro: new FormControl('', Validators.required),
    cddato: new FormControl('', Validators.required),
    dsdato: new FormControl('', Validators.required),
    dsmaestro: new FormControl('', Validators.required)
  });

  listMaestra: any[] = [];
  title:string='';
  message:string='';
  listParametro: maestras[] = [];
  
  constructor(private serviceMestra: MaestraService,
    private dialogRef : MatDialogRef<AddEditMaestraComponent>,
    private serviceDataMaestras: DataMaestraService,
    private SweetAlert: SweetAlert,
    @Inject(MAT_DIALOG_DATA) public inData: any) { 

      if(typeof inData === 'string' ){
        this.title='Agregar parámetro';
        this.message='¿Deseas agregar este parámetro?';
        return;
      }

      this.title='Editar parámetro';
      this.message='¿Deseas editar este parámetro?';
      this.dataMaestrasForm.patchValue({
        dsmaestro:inData.dataMaestras.nmmaestro,
        cddato:inData.dataMaestras.cddato,
        dsdato:inData.dataMaestras.dsdato,
        nmdato:inData.dataMaestras.nmdato
      });
     }

  ngOnInit(): void {
    
    this.getMaestra();
  }

  saveUpdate(form: DataMaestras) {
    this.SweetAlert.confirmacion(`${this.message}`).then(respuesta => {
      if (respuesta.isConfirmed) {
   
        this.serviceDataMaestras.saveUpdate(form).subscribe((data: any) => {
          
          if (data.status == 200) {
            Swal.fire(data.message, '', 'success')
            this.dialogRef.close({
              data
            });
          } else {
            Swal.fire({ icon: 'error', title: 'ERROR', text: data.message });
          }
        }, (error)=>{
          Swal.fire('ERROR', 'Error al guardar', 'error');
        });

      } else if (respuesta.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
    })
  }

  getMaestra() {
    
    this.serviceMestra.getAll().subscribe((data) => {
      
      if(typeof this.inData == 'object' && this.inData.dataMaestras.tipomaestra !=='PARAMETROS DE MUESTRA'){
        this.listMaestra = data.PARAMETROS_POR_ANALISIS; 
        this.getParametrosByAnalisis(this.listMaestra.find( l => l.nmmaestro == this.inData.dataMaestras.nmmaestro).dsmaestro);
        
      }
      if(typeof this.inData == 'object' && this.inData.dataMaestras.tipomaestra === 'PARAMETROS DE MUESTRA'){
        this.listMaestra = data.PARAMETROS_MUESTRA;
        this.getParametrosByAnalisis(this.listMaestra[0].dsmaestro);
      }

      if(this.inData === 'PARAMETROS_POR_ANALISIS'){
        this.listMaestra = data.PARAMETROS_POR_ANALISIS;
      }

      if(this.inData === 'PARAMETROS DE MUESTRA'){
        this.listMaestra=data.PARAMETROS_MUESTRA;
      }
        
    }, (error)=>{
      Swal.fire('ERROR', 'Error al cargar los parámetros', 'error');
    });
  }

  getValue(value:string){
    return this.dataMaestrasForm.get(value);
  }

  getParametrosByAnalisis(dsmaestro: any){
    
    this.serviceMestra.getParametrosByAnalisis(dsmaestro).subscribe((data)=>{
      this.listParametro = data.data
      if((typeof this.inData == 'object' && this.inData.dataMaestras.tipomaestra==='PARAMETROS DE MUESTRA')){
        this.dataMaestrasForm.get('nmmaestro')?.setValue(this.listParametro[0].nmmaestro);
      }
      if((typeof this.inData == 'object' && this.inData.dataMaestras.tipomaestra !=='PARAMETROS DE MUESTRA')){
        this.dataMaestrasForm.get('nmmaestro')?.setValue(
          this.listMaestra.find(l => l.nmmaestro == this.inData.dataMaestras.nmmaestro).nmmaestro
          )
      }
      

    })
  }

}
