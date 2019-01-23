import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { JobListComponent } from './job-list/job-list.component';
import { HttpClientModule } from '@angular/common/http';
import { JobService } from './services/job.service';
import { JobAddFormComponent } from './job-add-form/job-add-form.component';
import { DayAgoPipe } from './pipes/day-ago.pipe';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AboutComponent } from './about/about.component';
import { ToShortDatePipe } from './pipes/to-short-date.pipe';
import { SearchResultComponent } from './search-result/search-result.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes = [
  {path: '', component: HomeComponent},
  {path: 'jobs/add', component: JobAddFormComponent},
  {path: 'jobs/:id', component: JobDetailsComponent},
  {path: 'jobs', component: JobListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'userProfile', component: UserProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JobListComponent,
    JobAddFormComponent,
    DayAgoPipe,
    HomeComponent,
    JobDetailsComponent,
    AboutComponent,
    ToShortDatePipe,
    SearchResultComponent,
    AuthenticationComponent,
    RegisterComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
