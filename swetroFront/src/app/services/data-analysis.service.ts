import { Injectable } from '@angular/core';
import { Url } from './url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = Url
@Injectable({
  providedIn: 'root'
})
export class DataAnalysisService {

  constructor(private _http: HttpClient) { }

  processData(files:File[]):Observable<any>{

    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {      
      formData.append('excel_files', files[index], files[index].name);
    }    
    
    return this._http.post(url+"process_data",formData)
  }

  getUsersPatterns(files:File[]):Observable<any>{
    
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {      
      formData.append('excel_files', files[index], files[index].name);
    }    
    
    return this._http.post(url+"check_patterns",formData)
  }
}
