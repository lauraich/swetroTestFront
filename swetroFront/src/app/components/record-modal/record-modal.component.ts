import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Outliers } from 'src/app/models/outliers';

/**
 * @class RecordModalComponent
 * @description
 * The RecordModalComponent class represents a modal component for displaying details of a record.
 */
@Component({
  selector: 'app-record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.scss']
})
export class RecordModalComponent {

  /**
   * @property {EventEmitter<boolean>} closeModalEvent - An event emitter to notify the parent component to close the modal.
   */
  @Output() closeModalEvent = new EventEmitter<boolean>();

  /**
  * @property {Outliers} metrics - Input property representing the record details.
  */
  @Input() metrics!: Outliers

  /**
   * @method closeModal
   * @description
   * Emits an event to notify the parent component to close the modal.
   *
   */
  closeModal() {
    this.closeModalEvent.emit(false)
  }

  /**
  * @method getFormattedDate
  * @description
  * Formats a Unix timestamp into a human-readable date string.
  *
  * @param {number} unixTimestamp - The Unix timestamp to be formatted.
  * @returns {string} - The formatted date string.
  */
  getFormattedDate(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000); // Multiplica por 1000 para convertir segundos a milisegundos
    return date.toISOString(); // Puedes personalizar el formato según tus necesidades
  }

  /**
   * @method getFormattedDuration
   * @description
   * Formats a duration in seconds into a human-readable string (HH:mm:ss).
   *
   * @param {number} durationInSeconds - The duration in seconds to be formatted.
   * @returns The formatted duration string.
   */
  getFormattedDuration(durationInSeconds: number) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    const formattedDuration = `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
    return formattedDuration;
  }

  /**
   * @method padNumber
   * @description
   * Pads a number with a leading zero if it is less than 10.
   *
   * @private
   * @param {number} number - The number to be padded.
   * @returnsThe padded number as a string.
   */
  private padNumber(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  /**
   * @method getFormattedDistance
   * @description
   * Formats a distance in meters into a human-readable string (either meters or kilometers).
   *
   * @param {number} distanceInMeters - The distance in meters to be formatted.
   * @returns  The formatted distance string.
   */
  getFormattedDistance(distanceInMeters: number) {
    if (distanceInMeters >= 1000) {
      const kilometers = distanceInMeters / 1000;
      return `${kilometers.toFixed(2)} km`;
    } else {
      return `${distanceInMeters.toFixed(2)} m`;
    }
  }
}
