
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Decision } from '../constants/decision.enum';
import { IResultResponse } from '../constants/resultResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getResult(playerDecision: Decision): Observable<IResultResponse> {
    const url = 'http://localhost:8080/api/result';
    let queryParams = new HttpParams();
    queryParams = queryParams.append("playerDecision", playerDecision);

    return this.http.get<IResultResponse>(url, { params: queryParams });
  }

}
