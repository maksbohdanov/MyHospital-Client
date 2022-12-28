import { Component, OnInit } from '@angular/core';
import { Favor } from 'src/app/models/favor.model';
import { FavorService } from 'src/app/services/favor.service';

@Component({
  selector: 'app-favors',
  templateUrl: './favors.component.html',
  styleUrls: ['./favors.component.css']
})
export class FavorsComponent implements OnInit{
  favors?: Favor[];
  constructor(private favorService: FavorService){}

  ngOnInit(): void {
    this.getFavors();
  }

  getFavors(){
    this.favorService.getAll()
      .subscribe(favors => this.favors = favors.slice(0, 6));
  }
}
