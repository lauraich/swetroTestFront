import { Component, Input } from '@angular/core';
import { MetricsAverage } from 'src/app/models/metricsAverage';
import { Outliers } from 'src/app/models/outliers';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  recordModal = false

  averageModal = false

  itemsPerPage = 10; // Número de elementos por página
  currentPage = 1; // Página actual

  visibleElements!: Outliers[];
  
  menuOpenIndex: number | null = null;
  
  selectedRecord!:Outliers

  selectedRecordAverage!:MetricsAverage


  @Input() data!: Outliers[]

  @Input() title!: String

  @Input() subtitle!: String

  openRecordModal(value:boolean,record:any){
    this.recordModal=value
    this.selectedRecord=record
  }

  openAverageModal(value:boolean,metricsAverage:MetricsAverage){
    this.averageModal=value
    this.selectedRecordAverage=metricsAverage
  }
  

  toggleMenu(index: number) {
    this.menuOpenIndex = (this.menuOpenIndex === index) ? null : index;
  }

  get paginatedList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get visiblePages(): number[] {
    const result: number[] = [];

    // Puedes ajustar el rango según tus necesidades
    const range = 2;

    let start = Math.max(1, this.currentPage - range);
    let end = Math.min(this.totalPages, this.currentPage + range);

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  }

}
