import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AlertModule } from './../alert/alert.module';
import { SharedModule } from './../../shared/shared.module';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './component/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { TabsModule } from 'ng2-bootstrap/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    AlertModule,
    SharedModule,
    ProfileRoutingModule
  ],
  providers: [ ProfileService ],
  declarations: [ ProfileComponent ],
  exports: [ ProfileComponent ]
})
export class ProfileModule { }
