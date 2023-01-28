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
  id: number; //donde se almacenara el id que pasa por parametro
  operacion: string = 'Agregar '
  src: string = ''
  name_banana: string = ''


  //TODO: CONTRUCTOR
  //aRoute: ActivatedRoute para obtener el id de editar
  constructor(private fb: FormBuilder, private _workerService: WorkersService, private router: Router, private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      last_name: ['', [Validators.required, , Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      photo: [''],
      work: ['', Validators.required],
      description: ['', Validators.required],
    })

    //app routing obtener el numero para ver si es editar o agregar
    this.id = Number(aRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      //Es editar
      this.operacion = 'Editar '
      this.getWorker(this.id)
    }
  }


  addWorker() {
    const { name, last_name, age, photo, work, description } = this.form.value
    // console.log(name, last_name, age, photo, work, description);
    const worker: WorkerModel = {
      name: name,
      last_name,
      age,
      photo,
      work,
      description,
    }

    if (this.id !== 0) {
      //TODO: Es editar
      this.loading = true
      worker.id = this.id
      this._workerService.updateWorker(this.id, worker)
        .subscribe(() => {
          this.loading = false
          this.router.navigate(['/'])
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Tu trabajador ${worker.name} ha sido actualizado!`,
            showConfirmButton: false,
            timer: 1000
          })
        })
    } else {
      //TODO: Es agregar
      this.loading = true
      this._workerService.saveWorker(worker)
        .subscribe(() => {
          this.loading = false
          this.router.navigate(['/'])
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Tu trabajador ${worker.name} ha sido registrado!`,
            showConfirmButton: false,
            timer: 1000
          })
        })
    }

  }

  //obtener los datos del formulario para editar
  getWorker(id: number) {
    this.loading = true
    this._workerService.getWorker(id)
      .subscribe((data: WorkerModel) => {
        console.log(data);
        this.loading = false
        this.form.patchValue({
          name: data.name,
          last_name: data.last_name,
          age: data.age,
          photo: data.photo,
          work: data.work,
          description: data.description
        })
      })
  }
}


