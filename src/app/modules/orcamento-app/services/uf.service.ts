import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Uf } from 'src/app/models/uf';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UfService {

  private urlUfFunction = `${environment.urlFunctionUf}/api/estados`;
  private functionKey = environment.functionKey;
  private headerKey = environment.headerKey;

  constructor(private _http: HttpClient) { }

  getUf(): Observable<Uf[]> {
    var httpRequest = new HttpHeaders()
      .set(this.headerKey, this.functionKey);    
    return this._http.get<Uf[]>(this.urlUfFunction, { 'headers': httpRequest });
  }
}
