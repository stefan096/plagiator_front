import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { HInterceptorService } from './h-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { NgbModule, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './component/users/login/login.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ViewUsersComponent } from './component/users/view-users/view-users.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RoleService } from './service/role.service';
import { RegistrationComponent } from './component/users/registration/registration.component';
import { PasswordValidation } from './component/users/registration/passwordValidation.directive';

import { RegistrationLinkComponent } from './component/users/registration-link/registration-link.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SearchService } from './service/search.service';
import { OldDocumentsComponent } from './component/old-documents/old-documents.component';
import { UploadFileService } from './service/upload-file.service';
import { NewDocumentComponent } from './component/new-document/new-document.component';
import { PaperService } from './service/paper.service';
import { PaperDetailsComponent } from './component/paper-details/paper-details.component';
import { DocumentsComponent } from './component/documents/documents.component';
import { ConstantsService } from './service/constants.service';



const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'registracija/aktiviranjeNaloga/:userId', component: RegistrationLinkComponent},
  { path: 'home', component: HomePageComponent},
  { path: 'users', component: ViewUsersComponent},
  { path: 'old-documents', component: OldDocumentsComponent},
  { path: 'new-document/:plagiatorId', component: NewDocumentComponent},
  { path: 'new-document', component: NewDocumentComponent},
  { path: 'documents', component: DocumentsComponent},
  { path: 'new-document/:paperId/details', component: PaperDetailsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    HomePageComponent,
    ViewUsersComponent,
    PasswordValidation,
    RegistrationComponent,
    RegistrationLinkComponent,
    NavbarComponent,
    OldDocumentsComponent,
    NewDocumentComponent,
    PaperDetailsComponent,
    DocumentsComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: true } // <-- debugging purposes only
    )
  ],
  providers: [ //registrujem servise obaveznoo!!!!!!
    AuthService,
    UserService,
    RoleService,
    NgbActiveModal,
    SearchService,
    UploadFileService,
    PaperService,
    ConstantsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
