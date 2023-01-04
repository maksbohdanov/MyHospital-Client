import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(private api: HttpClient) { }

  getAll(){
    return this.api.get<Doctor[]>('/doctors/');
  }
}
