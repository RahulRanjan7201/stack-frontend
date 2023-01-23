import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StackService {
  REST_API: string = 'https://imanager-assignment.onrender.com/';
  constructor(private httpClient: HttpClient) { }
  getStacks() {
    return this.httpClient.get(`${this.REST_API}`);
  }
  addStack(value:any) : Observable<any> {
    return this.httpClient
    .put(this.REST_API, value)
  }
  popStack() : Observable<any> {
    return this.httpClient
    .delete(this.REST_API)
  }
}
