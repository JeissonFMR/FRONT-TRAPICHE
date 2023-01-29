import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditWorkerComponent } from './components/add-edit-worker/add-edit-worker.component';
import { ListWorkersComponent } from './components/list-workers/list-workers.component';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';

const routes: Routes = [
  {
    path: '',
    component: ListWorkersComponent
  },
  {
    path: 'add',
    component: AddEditWorkerComponent
  },
  {
    path: 'edit/:id',
    component: PhotoPreviewComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
