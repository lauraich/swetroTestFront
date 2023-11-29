import { Component } from '@angular/core';

/**
 * @class NavbarComponent
 * @description
 * The NavbarComponent class represents the navigation bar component of the application.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  /**
   * @property {boolean} isMenuOpen - A flag indicating whether the menu is currently open or closed.
   */
  isMenuOpen = false;

  /**
   * @method toggleMenu
   * @description
   * Toggles the state of the menu, either opening it if closed or closing it if open.
   *
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
