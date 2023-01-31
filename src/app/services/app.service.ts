import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const url = "http://192.168.0.15:3000";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getAllStudents() {
    return this.httpClient.get<any>(`${url}/students`);
  }

  getGroupAges() {
    return this.httpClient.get<any>(`${url}/group-ages`);
  }
}