import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private title = inject(Title);
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    const brand = 'Angularity';
    if (title) this.title.setTitle(`${title} | ${brand}`);
    else this.title.setTitle(brand);
  }
}
