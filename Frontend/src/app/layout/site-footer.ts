import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Portfolio } from '../core/portfolio';

@Component({
  selector: 'app-site-footer',
  imports: [TranslocoPipe],
  templateUrl: './site-footer.html',
})
export class SiteFooter {
  private readonly portfolio = inject(Portfolio);
  protected readonly profile = this.portfolio.profile;
  protected readonly year = new Date().getFullYear();
}
