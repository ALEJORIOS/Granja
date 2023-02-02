import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


const url = "http://192.168.0.15:3000";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  token = new BehaviorSubject<string>("");

  constructor(private httpClient: HttpClient) { }

  login(credentials: any) {
    return this.httpClient.post<any>(`${url}/login`, credentials);
  }

  verifyToken(token: any) {
    return this.httpClient.post<any>(`${url}/verifyJWT`, token);
  }

  getAllStudents() {
    return this.httpClient.get<any>(`${url}/students`);
  }

  getAllTeachers() {
    return this.httpClient.get<any>(`${url}/teachers`);
  }

  getGroupAges() {
    return this.httpClient.get<any>(`${url}/group-ages`);
  }

  createStudent(body: any) {
    return this.httpClient.post<any>(`${url}/add`, body);
  }

  createTeacher(body: any) {
    return this.httpClient.post<any>(`${url}/add-teacher`, body);
  }

  editStudent(body: any) {
    return this.httpClient.put<any>(`${url}/edit`, body);
  }

  editTeacher(body: any) {
    return this.httpClient.put<any>(`${url}/edit-teacher`, body);
  }

  deleteRecord(id: string) {
    return this.httpClient.delete<any>(`${url}/delete`, {params: {id: id}});
  }

  deleteTeacher(id: string) {
    return this.httpClient.delete<any>(`${url}/delete-teacher`, {params: {id: id}});
  }
}