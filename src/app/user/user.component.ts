import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { FormsModule, ReactiveFormsModule,FormBuilder,FormGroup } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';

import { Router } from '@angular/router';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';private spinnerService: Ng4LoadingSpinnerService,


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  myForm: FormGroup;

  constructor(private auth:AuthService,private router:Router,private fb: FormBuilder) {
    this.myForm =this.fb.group({
      activity:'',
      startdate:'',
      enddate:'',
      starttime:'',
      endtime:''
    });
    this.setClickedRow = function(index){
      this.selectedRow = index;
    }
  }
  setClickedRow:any;
  selectedRow:any;
  inputVar:string;
  id:any;
  value :string;
  users:any;
  records:any;
  edit=false;
  recordid="";
  private cardData: string [];
  datasource:any;
  ngOnInit(): void {
    this.users=JSON.parse(localStorage.getItem("users"));
    this.auth.data=JSON.parse(localStorage.getItem("users"));
    this.id=JSON.parse(localStorage.getItem("users")).ID_Account;
    this.value= 'Clear me';
  }
  
  // show(){
  //   this.spinnerService.show();
  //   setTimeout(()=>this.spinnerService.hide(),3000)
  // }

  getActivityRecords(event){
    event.preventDefault();
    this.records=this.auth.displayActivityRecord(this.id).subscribe((response)=>{
      if(response.success==1){
        this.cardData=response.activities as string [];
        this.datasource = new MatTableDataSource(this.cardData);
      }
    })
  }

  activityrecord(event){
    event.preventDefault();
    const target=event.target
    const activityname=target.querySelector('#activityname').value
    const startdate=target.querySelector('#startdate').value
    const enddate=target.querySelector('#enddate').value
    const starttime=target.querySelector('#starttime').value
    const endtime=target.querySelector('#endtime').value

    if(this.recordid){
      this.auth.performEditActivity(activityname,startdate,enddate,starttime,endtime,this.id,this.recordid).subscribe((response)=>{
        console.log(response);
        if(response.success==1){
          alert("details updated");
          // console.log(response);
        }else{
          alert("unable to update the value");
        }
        this.recordid="";
        
      });
      return;
    }

    this.auth.addActivityRecord(activityname,startdate,enddate,starttime,endtime,this.id).subscribe((response)=>{
      if(response.success===0){
        alert('user not deleted');
      }else{
        console.log(response);
      }
    });
    this.myForm.reset();
  }

  editRecord(data){

    const activityname=data.activity_name
    const startdate=data.start_date
    const enddate=data.end_date
    const starttime=data.start_time
    const endtime=data.end_time

    this.auth.editActivityRecord(activityname,startdate,enddate,starttime,endtime,this.id).subscribe((response)=>{
        if(response.success==1){
          this.edit=true;
          this.recordid=response.recordid;
          console.log(this.recordid);
        }
    });
    this.inputVar=activityname;
  }

  deleteActivity(data){

    const activityname=data.activity_name
    const startdate=data.start_date
    const enddate=data.end_date
    const starttime=data.start_time
    const endtime=data.end_time

    this.auth.deleteActivityRecord(activityname,startdate,enddate,starttime,endtime,this.id).subscribe((response)=>{
        if(response.success==1){
          console.log(response);
        }else{
          console.log(response);
      }
    });

  }

  resetForm(){
    this.myForm.reset();
    this.recordid="";
    this.selectedRow=-1;
  }

  OnLogout(){
    this.auth.logout();
  }
}
