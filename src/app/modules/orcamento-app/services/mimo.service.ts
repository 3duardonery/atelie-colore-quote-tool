import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mimo } from 'src/app/models/mimo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MimoService {
  
  private urlUfFunction = `${environment.urlFunctionUf}/api`;
  private functionKey = environment.functionKey;
  private headerKey = environment.headerKey;

  constructor(private _http: HttpClient) { }

  saveMimo(mimo: Mimo): Observable<Mimo> {
    var httpRequest = new HttpHeaders()
      .set(this.headerKey, this.functionKey);    

      //, { 'headers': httpRequest }
    return this._http.post<Mimo>(`${this.urlUfFunction}/criar-mimo`, mimo);
  }

  getMimos(key: string): Observable<Mimo[]> {
    var httpRequest = new HttpHeaders()
      .set(this.headerKey, this.functionKey);    
    return this._http.get<Mimo[]>(`${this.urlUfFunction}/obter-mimos`, { 'headers': httpRequest, params: { 'mimo': key } });
  }
}
