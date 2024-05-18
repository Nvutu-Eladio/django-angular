import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MembersDetailComponent } from './members-detail.component';

interface Member {
  id: number;
  name: string;
  surname: string;
  phone: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8000/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getMember(id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'members/' + id + '/', {
      headers: this.httpHeaders,
    });
  }

  updateMember(member: Member): Observable<any> {
    let body = {
      name: member.name,
      surname: member.surname,
      phone: member.phone,
    };
    return this.http.put(this.baseUrl + 'members/' + member.id + '/', body, {
      headers: this.httpHeaders,
    });
  }

  deleteMember(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'members/' + id + '/', {
      headers: this.httpHeaders,
    });
  }
}
