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

  createStudent(body: any) {
    return this.httpClient.post<any>(`${url}/add`, body);
  }

  editStudent(body: any) {
    return this.httpClient.put<any>(`${url}/edit`, body);
  }

  deleteRecord(id: string) {
    return this.httpClient.delete<any>(`${url}/delete`, {params: {id: id}});
  }
}