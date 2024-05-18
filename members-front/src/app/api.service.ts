import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Member {
  id?: number;
  name: string;
  surname: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8000/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<any> {
    return this.http.get(this.baseUrl + 'members/', {
      headers: this.httpHeaders,
    });
  }

  getMember(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'members/' + id + '/', {
      headers: this.httpHeaders,
    });
  }

  saveNewMember(member: Member): Observable<any> {
    return this.http.post(this.baseUrl + 'members/', member, {
      headers: this.httpHeaders,
    });
  }
}
