import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MetricsAverage } from 'src/app/models/metricsAverage';

@Component({
  selector: 'app-average-modal',
  templateUrl: './average-modal.component.html',
  styleUrls: ['./average-modal.component.scss']
})
export class AverageModalComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>();

  @Input() metricsAverage!:MetricsAverage

  closeModal(){
    this.closeModalEvent.emit(false)
  }

  getFormattedDate(unixTimestamp:number) {
    const date = new Date(unixTimestamp * 1000); // Multiplica por 1000 para convertir segundos a milisegundos
    return date.toISOString(); // Puedes personalizar el formato según tus necesidades
  }

  getFormattedDuration(durationInSeconds:number) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    const formattedDuration = `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
    return formattedDuration;
  }

  private padNumber(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  getFormattedDistance(distanceInMeters:number) {
    if (distanceInMeters >= 1000) {
      const kilometers = distanceInMeters / 1000;
      return `${kilometers.toFixed(2)} km`;
    } else {
      return `${distanceInMeters.toFixed(2)} m`;
    }
  }
}
