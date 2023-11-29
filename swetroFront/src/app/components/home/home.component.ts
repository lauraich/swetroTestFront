import { Component, ElementRef, ViewChild } from '@angular/core';
import { Outliers } from 'src/app/models/outliers';
import { DataAnalysisService } from 'src/app/services/data-analysis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    files:File[] =[]
    resultsDataAnalysis:Outliers[] = []
    loading=false
    @ViewChild('fileInput') fileInput!: ElementRef;

    constructor(private dataAnalysisService:DataAnalysisService){}

    setFiles(event: any){
      const files: File[] = Array.from(event.target.files);
      if (files.length > 0) {
        this.files=files        
      }
    }

    deleteFile(index:number){
      this.files.splice(index,1);
    }

    processData(){
      if(this.files.length>0){
        this.loading=true
        this.dataAnalysisService.processData(this.files).subscribe(response=>{
          this.loading=false
          if(response){
            this.resultsDataAnalysis= response.results                 
          }
        },(err)=>{
          this.loading=false          
          Swal.fire({
            title:"An error has occurred",
            text:err.error.error,
            icon:"error"
          })
          
        })
      }
    }
    
}
