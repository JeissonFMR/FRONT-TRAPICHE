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
          console.log(data);
          return data //TODO: DESESTRUCTURING DATA
        })
      )
  }

  deleteWorker$(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/workers/${id}`)
  }

  saveWorker(name: string, last_name: string, age: string, work: string, description: string, photo: File): Observable<any> {

    const body = new FormData();
    body.append('image', photo);
    body.append('name', name);
    body.append('last_name', last_name);
    body.append('age', age);
    body.append('work', work);
    body.append('description', description);

    return this.http.post(`${this.URL}/workers/`, body)
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

  updateWorker(id: number, name: string, last_name: string, age: string, work: string, description: string): Observable<any> {
    return this.http.put(`${this.URL}/workers/${id}`, { name, last_name, age, work, description })
  }


}

