import { Component } from '@angular/core';
import { Outliers } from 'src/app/models/outliers';
import { DataAnalysisService } from 'src/app/services/data-analysis.service';
import Swal from 'sweetalert2';

/**
 * @class PatternsComponent
 * @description
 * The PatternsComponent class represents a component dedicated to handling user patterns and data analysis.
 */
@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent {

  /**
  * @property {File[]} files - An array to store selected files for data processing.
  */
  files: File[] = []

  /**
  * @property {Outliers[]} resultsUserPatterns - An array to store the results of user patterns data analysis.
  */
  resultsUserPatterns: Outliers[] = []

  /**
  * @property {boolean} loading - A flag to indicate whether data processing is in progress.
  */
  loading = false

  /**
   * @constructor
   * @param {DataAnalysisService} dataAnalysisService - An instance of the DataAnalysisService for processing data.
   */
  constructor(private dataAnalysisService: DataAnalysisService) { }

  /**
  * @method setFiles
  * @description
  * Sets the selected files for user patterns data processing when the user selects files through the file input.
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
  * Deletes a selected file from the list of files for user patterns data processing.
  *
  * @param {number} index - The index of the file to be deleted.
  */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
  * @method processData
  * @description
  * Initiates the data processing for user patterns by calling the DataAnalysisService with the selected files.
  * Displays the results of the user patterns analysis and handles errors if they occur.
  *
  */
  processData() {
    if (this.files.length > 0) {
      this.loading = true

      this.dataAnalysisService.getUsersPatterns(this.files).subscribe(response => {
        this.loading = false
        if (response) {
          this.resultsUserPatterns = response.results
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
