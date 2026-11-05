import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SapEntryFrontEnd';
  constructor(private route: Router) {
  }
  ngOnInit() {
    // Ensure the DOM is fully loaded before adding event listeners
    this.addSmoothScroll();
  }

  addSmoothScroll() {
    const contactLink = document.querySelector('a[href="#footer"]');
    if (contactLink) {
      contactLink.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const footerElement = document.querySelector('#footer');
        if (footerElement) {
          footerElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
  enter() {
    this.route.navigate(['search-parts']);
  }
}
