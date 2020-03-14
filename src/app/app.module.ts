import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import {AuthGuard} from './auth.guard';
import {CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HomeComponent,
    ProfileComponent,
    LogoutComponent,
    DeleteuserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,MatMomentDateModule,HttpClientModule,MatDatepickerModule,MatTableModule,MatCardModule,MatInputModule,MatGridListModule,MatFormFieldModule,FormsModule, ReactiveFormsModule,RouterModule.forRoot([{
      path:'',
      component:HomeComponent
    },
    {
      path:'login',
      component:LoginComponent
    },
    {
      path:'user',
      component:UserComponent,
      canActivate: [AuthGuard]
    },
    {
      path:'profile',
      component:ProfileComponent
    },
    {
      path:'admin',
      component:AdminComponent
    },
    
  ]), BrowserAnimationsModule
  ],
  providers: [MatDatepickerModule,
    {
    provide: 'AuthGuard',
    useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }