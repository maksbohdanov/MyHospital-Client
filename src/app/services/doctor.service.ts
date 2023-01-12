import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private api: HttpClient) { }

  getById(id:string){
    return this.api.get<Doctor>('/doctors/' + id);
  }
  getAll(){
    return this.api.get<Doctor[]>('/doctors/');
  }
}
