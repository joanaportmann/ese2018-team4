import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {SearchComponent} from './search/search.component';
import {DemandComponent} from './demand/demand.component';
import {JobComponent} from './job/job.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AvailableJobsComponent } from './available-jobs/available-jobs.component';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SalaryCalculatorComponent } from './salary-calculator/salary-calculator.component';
import { CareerTippsComponent } from './career-tipps/career-tipps.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'demand/:text', component: DemandComponent },
  { path: 'search/:text', component: SearchComponent },
  { path: 'jobs/:id', component: JobComponent},
  { path: 'myprofile', component: ProfileEditorComponent},
  { path: 'myjobs', component: CreateJobComponent},
  { path: 'aboutus', component: AboutUsComponent},
  { path: 'home', component: AvailableJobsComponent},
  { path: 'approvejob', component: EditJobsComponent},
  { path: 'approveuser', component: EditUserComponent},
  { path: 'salaryCalculator', component: SalaryCalculatorComponent},
  { path: 'careerTipps', component: CareerTippsComponent},
  { path: 'changePassword', component: ChangePasswordComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
