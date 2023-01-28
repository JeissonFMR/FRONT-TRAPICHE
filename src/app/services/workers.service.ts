import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { WorkerModel } from '../interfaces/workers';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  private URL: string = enviroment.api
  constructor(private http: HttpClient) { }


  getListWorkers$(): Observable<any> {
    return this.http.get(`${this.URL}/workers/`)
      .pipe(
        map(({ data }: any) => {
          return data //TODO: DESESTRUCTURING DATA
        })
      )
  }

  deleteWorker$(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/workers/${id}`)
  }

  saveWorker(worker: WorkerModel): Observable<any> {
    return this.http.post(`${this.URL}/workers/`, worker)
  }

  //TODO: OARA EDITAR
  getWorker(id: number): Observable<any> {
    return this.http.get(`${this.URL}/workers/${id}`)
      .pipe(
        map(({ data }: any) => {
          return data
        })
      )
  }

  updateWorker(id: number, worker: WorkerModel): Observable<any> {
    return this.http.put(`${this.URL}/workers/${id}`, worker)
  }

  //TODO: FIN EDITAR
}

