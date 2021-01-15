import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JwtModule } from '@auth0/angular-jwt';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';



import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookService } from './shared/book.service';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth-guard.service';
import { MatSortModule } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
    LoginComponent,
    NavBarComponent,
    CustomerListComponent,
    HomeComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatMenuModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [AuthGuard],
            children: [ 
                          { path: 'customer', component: CustomerListComponent, canActivate: [AuthGuard]},
                          { path: 'book', component: BookListComponent, canActivate: [AuthGuard]} 
                      ]},
      { path: 'login', component: LoginComponent},
      
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: []
      }
    })


  ],
  providers: [BookService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptorService,
                multi: true
              },
              HttpClient,
             AuthGuard],
  bootstrap: [AppComponent],
  // entryComponents: [BookFormComponent]
})
export class AppModule { }
