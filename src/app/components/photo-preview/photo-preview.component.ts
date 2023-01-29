import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { WorkerModel } from 'src/app/interfaces/workers';
import { WorkersService } from 'src/app/services/workers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent {

  id: any;
  worker!: WorkerModel;

  loading: boolean = false

  constructor(private activateRoute: ActivatedRoute, private router: Router, private __workerService: WorkersService) {

  }

  ngOnInit(): void {
    this.getWorkerForUpdate();
  }

  getWorkerForUpdate() {
    this.activateRoute.params.subscribe((params) => {
      this.id = params['id']
      this.__workerService.getWorker(this.id)
        .subscribe((res) => {
          this.worker = res
          console.log(this.worker);
        }, err => console.log(err))
    })
  }

  updateWorker(name: HTMLInputElement, last_name: HTMLInputElement, age: HTMLInputElement, work: HTMLInputElement, description: HTMLInputElement): boolean {

    this.__workerService.updateWorker(this.id, name.value, last_name.value, age.value, work.value, description.value)
      .subscribe(res => {
        this.loading = false
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tu trabajador ha sido actualizado!',
          showConfirmButton: false,
          timer: 1000
        })
        this.router.navigate(['/'])
      })
    return false
  }

}
