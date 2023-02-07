import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


// const url = "http://192.168.0.15:3000";
// const url = "http://192.168.0.106:3000";
const url = "https://granja-back.vercel.app";

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

  getAchievements() {
    return this.httpClient.get<any>(`${url}/achievements`);
  }
  
  getReports() {
    return this.httpClient.get<any>(`${url}/reports`);
  }

  getIcons() {
    return this.httpClient.get<any>(`${url}/icons`);
  }

  getVerificationReportExistence(body: any) {
    return this.httpClient.post<any>(`${url}/verify-existence-of-report`, body);
  }

  getOneReport(id: string) {
    return this.httpClient.get<any>(`${url}/one-report`, {params: {id}});
  }

  createStudent(body: any) {
    return this.httpClient.post<any>(`${url}/add`, body);
  }

  createTeacher(body: any) {
    return this.httpClient.post<any>(`${url}/add-teacher`, body);
  }

  createReport(body: any) {
    return this.httpClient.post<any>(`${url}/report`, body);
  }

  createAchievement(body: any) {
    return this.httpClient.post<any>(`${url}/add-achievement`, body);
  }

  rateStudents(body: any) {
    return this.httpClient.put<any>(`${url}/rate-students`, body);
  }

  editReport(body: any) {
    return this.httpClient.put<any>(`${url}/edit-report`, body);
  }

  editStudent(body: any) {
    return this.httpClient.put<any>(`${url}/edit`, body);
  }

  editTeacher(body: any) {
    return this.httpClient.put<any>(`${url}/edit-teacher`, body);
  }

  editAchievement(body: any) {
    return this.httpClient.put<any>(`${url}/edit-achievement`, body);
  }

  deleteRecord(id: string) {
    return this.httpClient.delete<any>(`${url}/delete`, {params: {id}});
  }

  deleteTeacher(id: string) {
    return this.httpClient.delete<any>(`${url}/delete-teacher`, {params: {id}});
  }

  deleteReport(id: string) {
    return this.httpClient.delete<any>(`${url}/delete-report`, {params: {id}});
  }
}