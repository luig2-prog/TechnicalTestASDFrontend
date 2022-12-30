import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import Swal, {SweetAlertIcon} from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SweetAlert {

  public success(message:string, title: string):void{
    this.showAlert(title, message, 'success');
  }
  public info(message:string, title: string):void{
    this.showAlert(title, message, 'info');
  }
  public error(message:string, title: string):void{
    return this.showAlert(title, message, 'error', );
  }
  public warning(message:string, title: string):void{
    this.showAlert(title, message, 'warning');
  }
  private showAlert(
    title:string,
    message:string,
    icon:SweetAlertIcon
    ): void {
      Swal.fire(title,message,icon);
  }

  confirmacion(mensaje : string){
    return Swal.fire({
      confirmButtonColor: "#0E314F",
      cancelButtonColor: "#4b5157",
      title: mensaje,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText : 'Cancelar',
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

}
