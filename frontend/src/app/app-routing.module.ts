import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {SearchComponent} from './search/search.component';
import {DemandComponent} from './demand/demand.component';
import {JobComponent} from './job/job.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SearchBarComponent },
  { path: 'demand/:text', component: DemandComponent },
  { path: 'search/:text', component: SearchComponent },
  { path: 'jobs/:id', component: JobComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
