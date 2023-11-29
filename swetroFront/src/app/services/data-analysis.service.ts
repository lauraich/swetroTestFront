import { Injectable } from '@angular/core';
import { Url } from './url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @constant {string} url - The base URL for server communication. Replace with the actual server URL.
 */
const url = Url

/**
 * @class DataAnalysisService
 * @description
 * The DataAnalysisService class provides methods for processing data and checking patterns.
 */
@Injectable({
  providedIn: 'root'
})
export class DataAnalysisService {
  /**
    * @constructor
    * @param {HttpClient} _http - An instance of the HttpClient for making HTTP requests.
    */
  constructor(private _http: HttpClient) { }

  /**
  * @method processData
  * @description
  * Processes the provided files by sending them to the server for data analysis.
  *
  * @param {File[]} files - An array of files to be processed.
  * @returns {Observable<any>} - An Observable containing the server response.
  */
  processData(files: File[]): Observable<any> {

    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append('excel_files', files[index], files[index].name);
    }

    return this._http.post(url + "process_data", formData)
  }

  /**
   * @method getUsersPatterns
   * @description
   * Retrieves user patterns by sending the provided files to the server.
   *
   * @param {File[]} files - An array of files to be analyzed for user patterns.
   * @returns {Observable<any>} - An Observable containing the server response.
   */
  getUsersPatterns(files: File[]): Observable<any> {

    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append('excel_files', files[index], files[index].name);
    }

    return this._http.post(url + "check_patterns", formData)
  }
}
