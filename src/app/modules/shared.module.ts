import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { MaterialModule } from './material.module';
import { MenuComponent } from './menu/componet/menu/menu.component';

@NgModule({
    imports: [
        MaterialModule,
        RouterModule,
        BlockUIModule.forRoot()
    ],
    declarations: [
        MenuComponent
    ],
    exports: [
    ]
})
export class SharedModule { }
