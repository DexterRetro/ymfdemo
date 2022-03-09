import { MembershipNavComponent } from './pages/membership/membership-nav/membership-nav.component';
import { MembershipSettingsComponent } from './pages/membership/membership-nav/membership-settings/membership-settings.component';
import { MembershipHomeComponent } from './pages/membership/membership-nav/membership-home/membership-home.component';
import { MembershipAdminComponent } from './pages/membership/admin/membership-admin/membership-admin.component';
import { MembershipAdminBlogComponent } from './pages/membership/admin/membership-admin-blog/membership-admin-blog.component';
import { MembershipSignUpComponent } from './pages/membership/membership-sign-up/membership-sign-up.component';
import { MembershipLogInComponent } from './pages/membership/membership-log-in/membership-log-in.component';


import { AboutExpandedComponent } from './pages/about-expanded/about-expanded.component';

import { HomeComponent } from './pages/home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInGuardGuard } from './guards/log-in-guard.guard';
import { SignUpValidationComponent } from './pages/membership/sign-up-validation/sign-up-validation.component';
import { BlogFullViewComponent } from './pages/blog/blog-full-view/blog-full-view.component';
import { BlogListComponent } from './pages/blog/blog-list/blog-list.component';
import { TestpageComponent } from './pages/testpage/testpage.component';
import { MembershipAdminFinancesComponent } from './pages/membership/admin/membership-admin-finances/membership-admin-finances.component';
import { MembershipBlogComponent } from './pages/membership/membership-nav/membership-blog/membership-blog.component';
import { AuthLogInComponent } from './pages/membership/auth-log-in/auth-log-in.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'test',
    component:TestpageComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },{
    path:'about/:id',
    component:AboutExpandedComponent
  },
  {
    path:'blog',
    children:[
      {
        path:'',
        redirectTo:'list',
        pathMatch:'full'
      },
      {
        path:'list',
        component:BlogListComponent
      },{
        path:':id',
        component:BlogFullViewComponent
      }
    ]
  },
  {
    path: 'member',
    children: [
      {
        path: '',
        redirectTo: 'loggedIn',
        pathMatch: 'full',
      },
      {
        path:'authenticate',
        component:AuthLogInComponent
      },
      {
        path: 'loggedIn',
        component: MembershipNavComponent,
        canActivate:[LogInGuardGuard],
        children: [
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
          },
          {
            path: 'home',
            component: MembershipHomeComponent,
          },
          {
            path: 'settings',
            component: MembershipSettingsComponent,
          },{
            path:'blog',
            component:MembershipBlogComponent
          },
          {
            path: 'admin',
            children: [
              {
                path: '',
                redirectTo: 'members',
                pathMatch: 'full',
              },
              {
                path: 'members',
                component: MembershipAdminComponent,
              },
              {
                path: 'blog',
                component: MembershipAdminBlogComponent,
              },
              {
                path:'finance',
                component:MembershipAdminFinancesComponent
              }
            ],
          },
        ],
      },
      {
        path: 'signUp',
        component: MembershipSignUpComponent,
      },
      {
        path: 'logIn',
        component: MembershipLogInComponent,
      },
      {
        path:'validation',
        component:SignUpValidationComponent
      }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
