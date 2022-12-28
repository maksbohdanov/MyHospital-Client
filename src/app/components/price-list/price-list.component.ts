import { Component, OnInit } from '@angular/core';
import { Favor } from 'src/app/models/favor.model';
import { FavorService } from 'src/app/services/favor.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit{
  favors?: Favor[];
  specializations?: string[];
  constructor(private favorService: FavorService){}

  ngOnInit(): void {
    this.getFavors();  
  }


  getFavors(){
    this.favorService.getAll()
      .subscribe(favors => {
        this.favors = favors;
        
        let allSpec = this.favors?.map(function (item) {
          console.log(item.specialization)
          return item.specialization;
        });     
        this.specializations = [...new Set(allSpec)]
      });
  }

  getFavorsBySpec(spec:string){
    return this.favors?.reverse().filter(function (item) {
      return item.specialization === spec;
    });
  }
}
