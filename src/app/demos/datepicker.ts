import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'demo-datepicker',
  imports: [DatePipe, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }],
  template: `
    <div class="page">
      <h1>Дата</h1>
      <p class="lead">
        Поле даты — поле, куда выбираешь дату: день рождения, дату брони, срок. Можно
        ввести вручную или нажать на значок календаря и выбрать день во всплывающем
        календарике.
      </p>

      <section class="demo-section try">
        <h2>Выбор даты</h2>
        <p class="explain">Нажми на значок календаря справа — откроется календарь. Выбери день.</p>
        <div class="demo-row">
          <mat-form-field appearance="outline" class="field">
            <mat-label>Дата рождения</mat-label>
            <input matInput [matDatepicker]="picker" [(ngModel)]="birthday" />
            <mat-datepicker-toggle matIconSuffix [for]="picker" />
            <mat-datepicker #picker />
          </mat-form-field>
          <span class="result">
            {{ birthday ? 'Выбрано: ' + (birthday | date: 'dd.MM.yyyy') : 'Дата не выбрана' }}
          </span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Диапазон дат</h2>
        <p class="explain">Два поля — «от» и «до». Удобно для брони: заезд и выезд.</p>
        <mat-form-field appearance="outline" class="field-wide">
          <mat-label>Период брони</mat-label>
          <mat-date-range-input [rangePicker]="rangePicker">
            <input matStartDate [(ngModel)]="checkIn" placeholder="Заезд" />
            <input matEndDate [(ngModel)]="checkOut" placeholder="Выезд" />
          </mat-date-range-input>
          <mat-datepicker-toggle matIconSuffix [for]="rangePicker" />
          <mat-date-range-picker #rangePicker />
        </mat-form-field>
      </section>

      <section class="demo-section">
        <h2>Ограничения</h2>
        <p class="explain">
          Можно запретить выбирать некоторые даты — например, оставить только ближайший
          месяц. Прошлое и далёкое будущее станут серыми и недоступными.
        </p>
        <mat-form-field appearance="outline" class="field">
          <mat-label>Дата записи</mat-label>
          <input matInput [matDatepicker]="picker2" [min]="today" [max]="maxDate" [(ngModel)]="appointment" />
          <mat-datepicker-toggle matIconSuffix [for]="picker2" />
          <mat-datepicker #picker2 />
        </mat-form-field>
      </section>

      <section class="demo-section">
        <h2>Зачем поле даты, а не обычный текст?</h2>
        <p class="explain">
          Календарь не даёт ввести несуществующую дату (вроде «32 февраля»), показывает
          дни недели и подсвечивает сегодня, а ограничения сразу прячут неподходящие
          даты. При этом печатать вручную тоже можно — одно другому не мешает.
        </p>
      </section>
    </div>
  `,
  styles: `
    .field {
      width: 260px;
      max-width: 100%;
    }
    .field-wide {
      width: 320px;
      max-width: 100%;
    }
    .result {
      color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class DatepickerPage {
  protected birthday: Date | null = null;
  protected checkIn: Date | null = null;
  protected checkOut: Date | null = null;
  protected appointment: Date | null = null;

  protected readonly today = new Date();
  protected readonly maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
}
