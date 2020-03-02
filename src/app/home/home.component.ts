import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerform: FormGroup;
  constructor(private fb: FormBuilder,private Auth:AuthService,private router:Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm() {
    this.registerform = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      phone: ['', Validators.required ],
      email: ['', Validators.required ],
      admin: ['', Validators.required ],
      password:['', Validators.required ]
    });
  }
  registeruser(event){    
    event.preventDefault();
    const target=event.target
    const firstname=target.querySelector('#fname').value
    const lastname=target.querySelector('#lname').value
    const contact=target.querySelector('#contactno').value
    const emailid=target.querySelector('#emailid').value
    const adminemail=target.querySelector('#adminemail').value
    const pwd=target.querySelector('#pwd').value
    // console.log(firstname+lastname)

    this.Auth.addUserDetails(firstname, lastname,contact,emailid,adminemail,pwd)
    .subscribe((response) =>{
      if(response.success===1){
        console.log(response);
        alert('user added');
        this.registerform.reset();

        // setTimeout (()=>{ //timer is not working in angular
        //   document.getElementById('form-content').innerHTML='<p style="font-family: \'Montserrat\', sans-serif; font-size: x-large;color: blanchedalmond;padding-left: 350px;">You have been succesfully registered.</p>';
        // },
        // 3000);
        // localStorage.setItem('jwt_token',JSON.stringify(response));
      }else{
        // alert(response.message);
      }
    });
  }

}
