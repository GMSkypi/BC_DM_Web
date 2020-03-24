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
import { ArchBoxComponent } from './main/archBox/archBox.component';
import { FolderManipulationComponent } from './main/folderManipulation/folderManipulation.component';
import { DetailProductInfoComponent } from './main/search/searchResult/expadnColumn/detailProductInfo/detailProductInfo.component';
import { BlocateBarComponent } from './main/imputBars/blocateBar/blocateBar.component';
import { LogBarComponent } from './main/imputBars/logBar/logBar.component';
import { PickUpBarComponent } from './main/imputBars/pickUpBar/pickUpBar.component';
import { ReturnBarComponent } from './main/imputBars/returnBar/returnBar.component';
import { ErrorPopUpComponent } from 'src/popUp/errorPopUp/errorPopUp.component';
import { ArchBarComponent } from './main/imputBars/archBar/archBar.component';
import { SnackBarComponent } from 'src/popUp/snackBar/snackBar.component';
import { UnauthorizedPopUpComponent } from 'src/popUp/unauthorizedPopUp/unauthorizedPopUp.component';





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
    ArchBoxComponent,
    FolderManipulationComponent,
    DetailProductInfoComponent,
    BlocateBarComponent,
    LogBarComponent,
    PickUpBarComponent,
    ReturnBarComponent,
    ErrorPopUpComponent,
    ArchBarComponent,
    SnackBarComponent,
    UnauthorizedPopUpComponent,

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
    MatSelectModule,

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
  bootstrap: [AppComponent],
  entryComponents: [ ErrorPopUpComponent , SnackBarComponent, UnauthorizedPopUpComponent]
})
export class AppModule { }
