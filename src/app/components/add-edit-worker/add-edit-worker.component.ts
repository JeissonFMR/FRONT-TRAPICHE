import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { WorkerModel } from '../../interfaces/workers';
import { WorkersService } from '../../services/workers.service';

@Component({
  selector: 'app-add-edit-worker',
  templateUrl: './add-edit-worker.component.html',
  styleUrls: ['./add-edit-worker.component.css']
})
export class AddEditWorkerComponent {
  form: FormGroup = new FormGroup({})
  loading: boolean = false
  // id: number; //donde se almacenara el id que pasa por parametro
  operacion: string = 'Agregar '
  src: string = ''
  name_banana: string = ''

  photoSelected: any;
  file: any;
  //TODO: CONTRUCTOR
  //aRoute: ActivatedRoute para obtener el id de editar
  constructor(private fb: FormBuilder, private _workerService: WorkersService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      last_name: ['', [Validators.required, , Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      work: ['', Validators.required],
      description: ['', Validators.required],
    })

    //app routing obtener el numero para ver si es editar o agregar
    // this.id = Number(aRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {

  }


  addWorker(name: HTMLInputElement, last_name: HTMLInputElement, age: HTMLInputElement, work: HTMLInputElement, description: HTMLInputElement) {

    this._workerService.saveWorker(name.value, last_name.value, age.value, work.value, description.value, this.file)
      .subscribe((res) => {
        this.loading = false
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tu trabajador ha sido creado!',
          showConfirmButton: false,
          timer: 1000
        })
        this.router.navigate(['/'])
      }, err => console.log(err))
  }

  //obtener los datos del formulario para editar
  getWorker(id: number) {
    this.router.navigate(['/edit', id])
  }


  getFile($event: any): void {
    if ($event.target.files && $event.target.files[0]) {
      this.file = <File>$event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

}
