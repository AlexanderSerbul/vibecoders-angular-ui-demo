import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'demo-autocomplete',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  template: `
    <div class="page">
      <h1>Автодополнение</h1>
      <p class="lead">
        Автодополнение — поле ввода, которое по мере набора подсказывает подходящие
        варианты. Печатаешь «мо» — показывает «Москва». Можно выбрать из подсказок или
        дописать вручную. Удобно для длинных списков, где быстрее напечатать, чем листать.
      </p>

      <section class="demo-section try">
        <h2>Подсказки по мере ввода</h2>
        <p class="explain">
          Начни печатать город — появятся подходящие подсказки. Выбери из них или допиши сам.
        </p>
        <div class="demo-row">
          <mat-form-field appearance="outline" class="field">
            <mat-label>Город</mat-label>
            <input
              matInput
              [matAutocomplete]="auto"
              [(ngModel)]="value"
              (input)="filter()"
              placeholder="Начните печатать…"
            />
            <mat-autocomplete #auto="matAutocomplete">
              @for (city of filtered; track city) {
                <mat-option [value]="city">{{ city }}</mat-option>
              }
            </mat-autocomplete>
          </mat-form-field>
          <span class="result">{{ value ? 'В поле: ' + value : 'Поле пустое' }}</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Автодополнение или выпадающий список?</h2>
        <p class="explain">
          <b>Автодополнение</b> — когда вариантов очень много и быстрее напечатать пару
          букв, чем листать; плюс можно ввести и своё значение. <b>Выпадающий список</b> —
          когда набор вариантов чёткий и закрытый, без свободного ввода.
        </p>
      </section>
    </div>
  `,
  styles: `
    .field {
      width: 320px;
      max-width: 100%;
    }
    .result {
      color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class AutocompletePage {
  private readonly cities = [
    'Москва',
    'Санкт-Петербург',
    'Новосибирск',
    'Екатеринбург',
    'Казань',
    'Нижний Новгород',
    'Самара',
    'Сочи',
    'Краснодар',
    'Владивосток',
  ];

  protected value = '';
  protected filtered: string[] = this.cities.slice();

  filter(): void {
    const q = this.value.toLowerCase().trim();
    this.filtered = q ? this.cities.filter((c) => c.toLowerCase().includes(q)) : this.cities.slice();
  }
}
