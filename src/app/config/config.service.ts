import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  
 
  constructor(private http: HttpClient) { }

  // getUsers(){
  //     return this.http.post('http://localhost:8080/users/34?pwd=Raj@1');
  // }
}