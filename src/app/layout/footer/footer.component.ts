import { Component } from '@angular/core';

@Component({
  selector: 'wc-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
