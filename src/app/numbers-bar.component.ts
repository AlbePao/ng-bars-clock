import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';

const BLOCK_HEIGHT = 64;

@Component({
  selector: 'app-numbers-bar',
  templateUrl: './numbers-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .numbers-bar-shadow {
      box-shadow:
        8px 8px 12px #615a56,
        -8px -8px 12px #dadada;
    }

    .marker-shadow {
      box-shadow:
        10px 10px 18px #6f6f6f,
        -10px -10px 18px #afafaf;
    }
  `,
  host: {
    class: 'absolute transition-all duration-300 ease-out',
    '[style.top]': 'barTop()',
  },
})
export class NumbersBarComponent {
  readonly value = input.required({ transform: numberAttribute });
  readonly min = input.required({ transform: numberAttribute });
  readonly max = input.required({ transform: numberAttribute });

  numbersArray = computed(() => {
    const min = this.min();
    const max = this.max();

    // Sort min and max
    const start = Math.min(min, max);
    const end = Math.max(min, max);

    if (start === end) {
      return [start];
    }

    // We have at leat one value, so length starts to 1
    let length = 1;

    if ((start <= 0 && end > 0) || (start === 0 && end > 0) || (start < 0 && end === 0)) {
      const minValue = Math.abs(start);
      const maxValue = Math.abs(end);
      length += minValue + maxValue;
    } else if (start > 0 && end > 0) {
      length += end - start;
    }

    let startingPoint = start;

    return Array.from({ length }, () => startingPoint++);
  });

  barTop = computed(() => {
    const currentValueIndex = this.numbersArray().findIndex((value) => value === this.value());
    const currentValueHeight = currentValueIndex * BLOCK_HEIGHT;

    return `calc(50% - ${BLOCK_HEIGHT / 2}px - ${currentValueHeight}px)`;
  });
}
