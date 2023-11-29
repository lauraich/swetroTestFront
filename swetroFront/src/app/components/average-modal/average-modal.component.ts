import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MetricsAverage } from 'src/app/models/metricsAverage';

/**
 * @class AverageModalComponent
 * @description
 * Component representing the modal displaying the information of the averages of a user's metrics.
 */
@Component({
  selector: 'app-average-modal',
  templateUrl: './average-modal.component.html',
  styleUrls: ['./average-modal.component.scss']
})
export class AverageModalComponent {
  /**
 * This component emits an event to close the modal.
 *
 * @output closeModalEvent - Event emitted to close the modal. It emits a boolean value indicating whether to close the modal or not.
 *
 * @input metricsAverage - Input property that holds metrics data for average values.
 */
  @Output() closeModalEvent = new EventEmitter<boolean>();

  @Input() metricsAverage!: MetricsAverage

  /**
 * Closes the modal by emitting a false value through the `closeModalEvent` emitter.
 */
  closeModal() {
    this.closeModalEvent.emit(false)
  }

  /**
 * Formats a Unix timestamp into a readable date string.
 *
 * @param unixTimestamp - The Unix timestamp to be formatted.
 * @returns The formatted date string.
 */
  getFormattedDate(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000);
    return date.toISOString();
  }

  /**
 * Formats a duration in seconds into a human-readable time format (HH:mm:ss).
 *
 * @param durationInSeconds - The duration in seconds to be formatted.
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
 * Pads a number with a leading zero if it is less than 10.
 *
 * @param number - The number to be padded.
 * @returns The padded number as a string.
 */
  private padNumber(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  /**
 * Formats a distance in meters into a human-readable format.
 *
 * @param distanceInMeters - The distance in meters to be formatted.
 * @returns The formatted distance string (either in meters or kilometers).
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
