import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  val;
  user = new BehaviorSubject<User>(null);
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public generated_token:any;

  constructor(private http:HttpClient,private router:Router) { }

	public isLoggedIn: boolean = false;
  public data;

  addUserDetails(firstname, lastname,contactno,emailid,adminemail,password){
    //post these details to api server return 
    return this.http.post('http://localhost:8080/users', {
      firstname, lastname,contactno,emailid,adminemail,password
    },this._options);
  }

  getUserDetails(email,password){
    //post these details to api server return 
    return this.http.post('http://localhost:8080/user', {
      email,
      password
    },this._options);
  }

  addActivityRecord(activity,startdate,enddate,starttime,endtime,id){
    return this.http.post('http://localhost:8080/activity',{
      activity,startdate,enddate,starttime,endtime,id
    },this._options);
  }

  displayActivityRecord(id){
    return this.http.post('http://localhost:8080/activities',{
      id
    },this._options);
  }

  editActivityRecord(activityname,startdate,enddate,starttime,endtime,id){
    return this.http.put('http://localhost:8080/activity',{
      activityname,startdate,enddate,starttime,endtime,id
    },this._options);
  }

  performEditActivity(activityname,startdate,enddate,starttime,endtime,id,recordid){

    this.val=this.http.post('http://localhost:8080/activity',{
      activityname,startdate,enddate,starttime,endtime,id,recordid
    },this._options);
    // console.log(this.val);
    return this.val;

  }

  deleteActivityRecord(activityname,startdate,enddate,starttime,endtime,id){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        "activityname": activityname,
        "startdate":startdate,
        "enddate":enddate,
        "starttime":starttime,
        "endtime":endtime,
        "id":id
      }
    }
    return this.http.delete('http://localhost:8080/activity',options);
  }


  logout() {
    this.router.navigate(['/login']);
    this.isLoggedIn=false;
    localStorage.removeItem('users');
  }
}
