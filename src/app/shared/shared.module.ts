import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowErrorComponent } from './components/show.error.component';
import { UploadComponent } from './components/upload.component';
import { SelectComponent } from './components/select.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ShowErrorComponent, UploadComponent, SelectComponent ],
  exports: [ ShowErrorComponent,  UploadComponent, SelectComponent ]
})
export class SharedModule { }
