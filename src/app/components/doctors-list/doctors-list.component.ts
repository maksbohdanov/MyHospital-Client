import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit{
  allDoctors: Doctor[] = [];
  doctors: Doctor[] = [];
  specializations?: string[];
  fullName = '';
  spec = '';
  constructor(private doctorService: DoctorService,
    private router: Router){}

  ngOnInit(): void {
    this.getDoctors();  
  }


  getDoctors(){
    this.doctorService.getAll()
      .subscribe(doctors => {
        this.allDoctors = doctors;
        this.doctors = doctors;
        
        let allSpec = this.doctors?.map(function (item) {
          return item.specialization;
        });     
        this.specializations = [...new Set(allSpec)]
      });
  }

  moveToDoctorPage(id: number){
    this.router.navigate(['doctors/' + id])
  }

  filter(){
    this.filterByName();
    this.filterBySpec();
  }

  filterByName(){   
    this.doctors = [...this.allDoctors.filter(doctor =>
      doctor.lastName.concat(" ", doctor.firstName, " ", doctor.middleName).toLocaleLowerCase()
        .includes(this.fullName.toLocaleLowerCase()))];
  }

  filterBySpec(){
    if(this.spec === 'Спеціалізації' || this.spec === ''){
      return;
    }

    if(this.fullName === ''){
      this.doctors =  [...this.allDoctors.filter(doctor =>
        doctor.specialization === this.spec)];
    }
    else{
      this.doctors =  [...this.doctors.filter(doctor =>
        doctor.specialization === this.spec)];
    }
  }
}
