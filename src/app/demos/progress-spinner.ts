import { Component, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'demo-progress-spinner',
  imports: [MatProgressSpinnerModule, MatButtonToggleModule],
  template: `
    <div class="page">
      <h1>Прогресс — круг</h1>
      <p class="lead">
        Крутящийся кружок — знак «подождите, идёт работа»: загрузка страницы,
        отправка формы, получение данных. Показывает, что приложение не зависло,
        а занято делом.
      </p>

      <section class="demo-section">
        <h2>Когда не знаешь, сколько ждать <code class="api">mat-spinner</code></h2>
        <p class="explain">
          Просто крутится, пока дело не сделано. Так показывают любую загрузку,
          длительность которой заранее неизвестна. Размер можно задать любой.
        </p>
        <div class="demo-row">
          <mat-spinner></mat-spinner>
          <mat-spinner [diameter]="44"></mat-spinner>
          <mat-spinner [diameter]="28"></mat-spinner>
        </div>
      </section>

      <section class="demo-section">
        <h2>Когда знаешь процент <code class="api">mode="determinate"</code></h2>
        <p class="explain">
          Если известно, сколько готово (например, загрузка файла) — дуга
          заполняется до нужного процента. Переключи:
        </p>
        <div class="demo-row">
          <mat-button-toggle-group
            [value]="pct().toString()"
            (change)="pct.set(+$event.value)"
            hideSingleSelectionIndicator
            aria-label="Процент готовности"
          >
            <mat-button-toggle value="0">0%</mat-button-toggle>
            <mat-button-toggle value="25">25%</mat-button-toggle>
            <mat-button-toggle value="50">50%</mat-button-toggle>
            <mat-button-toggle value="75">75%</mat-button-toggle>
            <mat-button-toggle value="100">100%</mat-button-toggle>
          </mat-button-toggle-group>
        </div>
        <div class="demo-row">
          <mat-progress-spinner mode="determinate" [value]="pct()"></mat-progress-spinner>
          <span class="value-label">Заполнено: {{ pct() }}%</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Круг или полоса?</h2>
        <p class="explain">
          Круг удобен, когда загрузка идёт «на месте» — внутри кнопки, карточки,
          по центру экрана. Если хочется показать понятную шкалу заполнения во всю
          ширину — берите <b>полосу</b> (соседний пункт меню).
        </p>
      </section>
    </div>
  `,
  styles: `
    .value-label {
      color: var(--mat-sys-on-surface-variant);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class ProgressSpinnerPage {
  protected readonly pct = signal(50);
}
