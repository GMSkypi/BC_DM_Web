import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './httpInterceptor.service';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AuthenticationService } from './login/authentication.service';
import { GuardService } from './login/guard.service';
import { TopbarComponent } from './main/topbar/topbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './main/search/searchBar/searchBar.component';
import { SearchResultComponent } from './main/search/searchResult/searchResult.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {
  MatExpansionModule,
  MatInputModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatRadioModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatCheckboxModule, 
  MatSelectModule
} from '@angular/material';
import { ExpadnColumnComponent } from './main/search/searchResult/expadnColumn/expadnColumn.component';
import { CrtDocFBarComponent } from './main/imputBars/crtDocFBar/crtDocFBar.component';
import { CrtDocABarComponent } from './main/imputBars/crtDocABar/crtDocABar.component';
import { SessionExpiredInterceptor } from './sessionExpiredInterceptor.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    TopbarComponent,
    SearchBarComponent,
    SearchResultComponent,
    ExpadnColumnComponent,
    CrtDocABarComponent,
    CrtDocFBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatSnackBarModule, 
    MatCheckboxModule,
    MatSelectModule
    ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    } ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionExpiredInterceptor,
      multi: true
    } ,
    AuthenticationService, GuardService
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
