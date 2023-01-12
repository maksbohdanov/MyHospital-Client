import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private api: HttpClient) { }

  makeAppointment(model: Appointment){
    return this.api.post('/appointments/', model);
  }
}
