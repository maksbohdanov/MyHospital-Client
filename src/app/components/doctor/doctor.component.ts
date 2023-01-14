import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Doctor } from 'src/app/models/doctor.model';
import { Favor } from 'src/app/models/favor.model';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { FavorService } from 'src/app/services/favor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})

export class DoctorComponent implements OnInit, AfterViewInit{
  @ViewChild("inputDate") inputDate!: ElementRef;
  
  closeResult!: string;
  favors: Favor[] = [];
  favorNames!: string[];
  favor = '';
  doctorId!: string;
  doctor!: Doctor;
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
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private appointmentService: AppointmentService,
    private favorService: FavorService){} 
  

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.doctorId = params['id'];
      this.getDoctor();
      this.getFavors();
      this.getAllDoctors();
    });
  }

  ngAfterViewInit(): void {
    this.inputDate.nativeElement.min = new Date().toISOString().split("T")[0];  
  }
  

  getDoctor(){
    this.doctorService.getById(this.doctorId)
      .subscribe(doctor => this.doctor = doctor);
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

  onValueChanged(value:string){
    this.favor = value;
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

  checkSelectedFavor(){
    return this.favor === "Первинна консультація" ||
           this.favor === "Повторна консультація"
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

