import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
    
  loginAdmin(event){
    event.preventDefault();
    const target=event.target
    const emailid=target.querySelector('#adminId').value
    const pwd=target.querySelector('#adminPwd').value
    
  }

}
