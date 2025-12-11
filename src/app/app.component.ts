import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NumbersBarComponent } from './numbers-bar';

@Component({
  selector: 'app-root',
  imports: [NumbersBarComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
