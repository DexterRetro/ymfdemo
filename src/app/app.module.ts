import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { ShareModule } from 'ngx-sharebuttons';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatStepperModule} from '@angular/material/stepper'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutExpandedComponent } from './pages/about-expanded/about-expanded.component';
import { MembershipLogInComponent } from './pages/membership/membership-log-in/membership-log-in.component';
import { MembershipSignUpComponent } from './pages/membership/membership-sign-up/membership-sign-up.component';
import { MembershipHomeComponent } from './pages/membership/membership-nav/membership-home/membership-home.component';
import { MembershipAdminComponent } from './pages/membership/admin/membership-admin/membership-admin.component';
import { Articleviewpopup, MembershipAdminBlogComponent } from './pages/membership/admin/membership-admin-blog/membership-admin-blog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MembershipSettingsComponent } from './pages/membership/membership-nav/membership-settings/membership-settings.component';
import { MembershipNavComponent, MembersPopUpPayment } from './pages/membership/membership-nav/membership-nav.component';
import { SignUpValidationComponent } from './pages/membership/sign-up-validation/sign-up-validation.component';
import { BlogListComponent } from './pages/blog/blog-list/blog-list.component';
import { BlogFullViewComponent } from './pages/blog/blog-full-view/blog-full-view.component';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MembershipAdminFinancesComponent } from './pages/membership/admin/membership-admin-finances/membership-admin-finances.component';
import {MembershipBlogComponent } from './pages/membership/membership-nav/membership-blog/membership-blog.component';
import { TestpageComponent } from './pages/testpage/testpage.component';
import { VerifyNewUserpopup } from './templates/VerifyNewUserPopup/VerifyNewUser-popup';
import { VerifyOldUserpopup } from './templates/VerifyOldUserPopup/VerifyOldUser-popup';
import { Paymentprocessing } from './templates/paymentProcessing/Payment-processing';
import { AuthLogInComponent } from './pages/membership/auth-log-in/auth-log-in.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { BlogUploadPopup } from './templates/BlogUploadPopup/BlogUpload-popup';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutExpandedComponent,
    MembershipLogInComponent,
    MembershipSignUpComponent,
    MembershipHomeComponent,
    MembershipAdminComponent,
    MembershipAdminBlogComponent,
    MembershipSettingsComponent,
    MembershipNavComponent,
    SignUpValidationComponent,
    BlogListComponent,
    BlogFullViewComponent,
    MembershipAdminFinancesComponent,
    MembershipBlogComponent,
    TestpageComponent,
    Articleviewpopup,
    VerifyNewUserpopup,
    VerifyOldUserpopup,
    MembersPopUpPayment,
    AuthLogInComponent,
    Paymentprocessing,
    GalleryComponent,
    BlogUploadPopup

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatStepperModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatBadgeModule,
    NgxChartsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ShareModule
    
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS,
    useClass: ErrorCatchingInterceptor,
    multi: true},
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
