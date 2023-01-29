import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WorkersService } from 'src/app/services/workers.service';
import { WorkerModel } from '../../interfaces/workers';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrls: ['./list-workers.component.css']
})
export class ListWorkersComponent {
  listWorker: WorkerModel[] = []

  loading: boolean = false;
  constructor(private _workerService: WorkersService, private router: Router) {

  }

  ngOnInit(): void {
    this.getListAllWorker()
  }

  getListAllWorker() {
    this.loading = true
    setTimeout(() => {
      //lo agrego en en timeout para que se muestra el
      this._workerService.getListWorkers$()
        .subscribe((data) => {
          this.listWorker = data
          // console.log(data);
          this.loading = false
        }, err => { console.log(err); })

    }, 500);
  }

  deleteWork(id: number) {
    console.log(id);
    this.loading = true
    this._workerService.deleteWorker$(id)
      .subscribe((res) => {
        this.loading = false
        this.getListAllWorker()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tu trabajador ha sido eliminado!',
          showConfirmButton: false,
          timer: 1000
        })
      }, err => console.log(err))
  }

}
