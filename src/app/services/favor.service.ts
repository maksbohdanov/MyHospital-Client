import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Favor } from '../models/favor.model';

@Injectable({
  providedIn: 'root'
})
export class FavorService {

  constructor(private api: HttpClient) { }

  getAll(){
    return this.api.get<Favor[]>('/favors/');
  }
}
