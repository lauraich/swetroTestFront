import { Component, ElementRef, ViewChild } from '@angular/core';
import { Outliers } from 'src/app/models/outliers';
import { DataAnalysisService } from 'src/app/services/data-analysis.service';
import Swal from 'sweetalert2';

/**
 * @class HomeComponent
 * @description
 * The HomeComponent class represents the home page component.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  /**
   * @property {File[]} files - An array to store selected files for data processing.
   */
  files: File[] = []
  /**
   * @property {Outliers[]} resultsDataAnalysis - An array to store the results of data analysis.
   */
  resultsDataAnalysis: Outliers[] = []
  /**
  * @property {boolean} loading - A flag to indicate whether data processing is in progress.
  */
  loading = false
  //@ViewChild('fileInput') fileInput!: ElementRef;

  /**
   * @constructor
   * @param {DataAnalysisService} dataAnalysisService - An instance of the DataAnalysisService for processing data.
   */
  constructor(private dataAnalysisService: DataAnalysisService) { }


  /**
    * @method setFiles
    * @description
    * Sets the selected files for data processing when the user selects files through the file input.
    *
    * @param {any} event - The event object triggered by the file input change.
    */
  setFiles(event: any) {
    const files: File[] = Array.from(event.target.files);
    if (files.length > 0) {
      this.files = files
    }
  }

  /**
  * @method deleteFile
  * @description
  * Deletes a selected file from the list of files for data processing.
  *
  * @param {number} index - The index of the file to be deleted.
  */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
  * @method processData
  * @description
  * Initiates the data processing by calling the DataAnalysisService with the selected files.
  * Displays the results of the data analysis and handles errors if they occur.
  *
  */
  processData() {
    if (this.files.length > 0) {
      this.loading = true
      this.dataAnalysisService.processData(this.files).subscribe(response => {
        this.loading = false
        if (response) {
          this.resultsDataAnalysis = response.results
        }
      }, (err) => {
        this.loading = false
        Swal.fire({
          title: "An error has occurred",
          text: err.error.error,
          icon: "error"
        })

      })
    }
  }

}
