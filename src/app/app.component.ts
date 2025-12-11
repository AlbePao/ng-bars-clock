import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { NumbersBarComponent } from './numbers-bar.component';

@Component({
  selector: 'app-root',
  imports: [NumbersBarComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex h-full w-full flex-row items-center justify-center gap-32 overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-700',
  },
})
export class AppComponent implements OnInit {
  currentTime = signal(this.getCurrentTime());
  currentHours = computed(() => this.currentTime()[0]);
  currentMinutes = computed(() => this.currentTime()[1]);
  currentSeconds = computed(() => this.currentTime()[2]);

  ngOnInit(): void {
    setInterval(() => {
      this.currentTime.set(this.getCurrentTime());
    }, 1000);
  }

  getCurrentTime(): string[] {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return [hours, minutes, seconds];
  }
}
