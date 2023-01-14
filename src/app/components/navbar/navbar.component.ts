import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/models/appointment.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Favor } from 'src/app/models/favor.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { FavorService } from 'src/app/services/favor.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  closeResult!: string;
  favor = '';
  favors: Favor[] = [];
  favorNames!: string[];
  doctors!: Doctor[];
  doctorNames!: string[];
  
  form: any = {
    date: null,
    patientName: null,
    patientPhone: null,
    favor: null,
    doctor: null
  };

  constructor(private doctorService: DoctorService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private appointmentService: AppointmentService,
    private favorService: FavorService){}

  ngOnInit(): void {
    this.getFavors();
    this.getAllDoctors();
  }

    getAllDoctors(){
      this.doctorService.getAll()
        .subscribe(doctors => {
          this.doctors = doctors;
          this.doctorNames = this.doctors.map(function (item){
            return item.lastName + ' ' + item.firstName + ' ' + item.middleName;
          });
        });
    }
  
    getFavors(){
      this.favorService.getAll()
        .subscribe(favors =>{ 
          this.favors = favors.slice(0, 6);
          this.favorNames = this.favors.map(function (item) {
            return item.favorName;
          }); 
        })
    }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit(){
    let newAppointment : Appointment = {
      date: this.form.date,
      patientName: this.form.patientName,
      patientPhone: this.form.patientPhone,
      favorId: this.favors.find(x => x.favorName === this.favor)?.id,
      doctorId: this.doctors.find(x => x.lastName + ' ' + x.firstName + ' ' + x.middleName ===
                                  this.form.doctor)?.id    
    }
   
    this.appointmentService.makeAppointment(newAppointment)
    .subscribe({
      next: () =>{
        this.toastr.success("Ви успішно записані на прийом.");
        this.modalService.dismissAll();
      },
      error: () => {
        this.toastr.error("Не вдалося записатися на прийом.");
      }
    })
  }
  
  onValueChanged(value:string){
    this.favor = value;
  }

  checkSelectedFavor(){
    return this.favor === "Первинна консультація" ||
           this.favor === "Повторна консультація"
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
