import { Component, Input } from '@angular/core';
import { MetricsAverage } from 'src/app/models/metricsAverage';
import { Outliers } from 'src/app/models/outliers';

/**
 * @class ResultsComponent
 * @description
 * The ResultsComponent class represents a component for displaying paginated results with options
 * to view detailed records and average metrics.
 */
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  /**
   * @property {boolean} recordModal - A flag indicating whether the detailed record modal is open or closed.
   */
  recordModal = false

  /**
  * @property {boolean} averageModal - A flag indicating whether the average metrics modal is open or closed.
  */
  averageModal = false

  /**
  * @property {number} itemsPerPage - The number of elements to display per page.
  */
  itemsPerPage = 10;

  /**
   * @property {number} currentPage - The current page being displayed.
   */
  currentPage = 1;

  /**
  * @property {Outliers[]} visibleElements - The subset of elements to display on the current page.
  */
  visibleElements!: Outliers[];

  /**
   * @property {number | null} menuOpenIndex - The index of the currently open menu, or null if no menu is open.
   */
  menuOpenIndex: number | null = null;

  /**
  * @property {Outliers} selectedRecord - The selected detailed record for display.
  */
  selectedRecord!: Outliers

  /**
   * @property {MetricsAverage} selectedRecordAverage - The selected average metrics for display.
   */
  selectedRecordAverage!: MetricsAverage

  /**
    * @property {Outliers[]} data - Input property representing the data to be displayed in the component.
    */
  @Input() data!: Outliers[]

  /**
  * @property {String} title - Input property representing the title of the results component.
  */
  @Input() title!: String

  /**
   * @property {String} subtitle - Input property representing the subtitle of the results component.
   */
  @Input() subtitle!: String

  /**
  * @method openRecordModal
  * @description
  * Opens or closes the detailed record modal and sets the selected record for display.
  *
  * @param {boolean} value - The flag indicating whether the modal should be open or closed.
  * @param {Outliers} record - The selected record to display in the modal.
  */
  openRecordModal(value: boolean, record: any) {
    this.recordModal = value
    this.selectedRecord = record
  }

  /**
   * @method openAverageModal
   * @description
   * Opens or closes the average metrics modal and sets the selected average metrics for display.
   *
   * @param {boolean} value - The flag indicating whether the modal should be open or closed.
   * @param {MetricsAverage} metricsAverage - The selected average metrics to display in the modal.
   */
  openAverageModal(value: boolean, metricsAverage: MetricsAverage) {
    this.averageModal = value
    this.selectedRecordAverage = metricsAverage
  }

  /**
   * @method getStartIndex
   * @description
   * Calculates the start index for displaying a range of results based on the current page and items per page.
   *
   * @returns The calculated start index.
  */
  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  /**
   * @method getEndIndex
   * @description
   * Calculates the end index for displaying a range of results based on the current page and items per page.
   * Limits the end index to the total number of items if it exceeds the data length.
   *
   * @returns The calculated end index.
   */
  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.data.length);
  }

  /**
    * @method toggleMenu
    * @description
    * Toggles the state of the menu for a specific element at the given index.
    *
    * @param {number} index - The index of the element for which the menu state should be toggled.
    */
  toggleMenu(index: number) {
    this.menuOpenIndex = (this.menuOpenIndex === index) ? null : index;
  }

  /**
   * @getter paginatedList
   * @description
   * Returns a paginated subset of the data based on the current page and items per page.
   *
   * @returns The paginated subset of data.
   */
  get paginatedList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  /**
  * @method onPageChange
  * @description
  * Handles a change in the current page and updates the current page accordingly.
  *
  * @param {number} page - The new page number.
  */
  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /**
   * @method onPrevious
   * @description
   * Moves to the previous page if the current page is not the first page.
   *
   */
  onPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
 * @method onNext
 * @description
 * Moves to the next page if the current page is not the last page.
 *
 */
  onNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  /**
  * @getter totalPages
  * @description
  * Calculates and returns the total number of pages based on the items per page.
  *
  * @returns The total number of pages.
  */
  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  /**
   * @getter pageNumbers
   * @description
   * Returns an array of page numbers from 1 to the total number of pages.
   *
   * @returns An array of page numbers.
   */
  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  /**
  * @getter visiblePages
  * @description
  * Returns an array of visible page numbers around the current page within a specified range.
  *
  * @returns An array of visible page numbers.
  */
  get visiblePages(): number[] {
    const result: number[] = [];

    const range = 2;

    let start = Math.max(1, this.currentPage - range);
    let end = Math.min(this.totalPages, this.currentPage + range);

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  }

}
