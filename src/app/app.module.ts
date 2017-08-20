import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/directives/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/directives/sidebar.directive';
import { AsideToggleDirective } from './shared/directives/aside.directive';
import { BreadcrumbsComponent } from './shared/components/breadcrumb.component';
import { SharedModule } from './shared/shared.module';

//Modules
import { AlertModule } from './components/alert/alert.module';
import { PagesModule } from './components/pages/pages.module';

// Routing Module
import { AppRoutingModule } from './app.routing';

//Layouts
import { FullLayoutComponent } from './components/layouts/full-layout.component';

//Guards
import { AuthGuard } from './guards/auth.guard';

//Services
import { HttpService } from './services/http/http.service';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    SharedModule,
    AlertModule,
    PagesModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  providers: [
    AuthGuard,
    HttpService,
    AuthService,
    {
        provide: LocationStrategy,
        useClass: HashLocationStrategy,
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
