import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListWorkersComponent } from './components/list-workers/list-workers.component';
import { AddEditWorkerComponent } from './components/add-edit-worker/add-edit-worker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';


//toastr notify


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListWorkersComponent,
    AddEditWorkerComponent,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
