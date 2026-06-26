import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'demo-slider',
  imports: [FormsModule, MatSliderModule],
  template: `
    <div class="page">
      <h1>Слайдер</h1>
      <p class="lead">
        Слайдер — ползунок, который тянешь по линии, чтобы выбрать число из диапазона:
        громкость, яркость, цена. Удобно, когда важна не точная цифра, а «примерно сколько».
      </p>

      <section class="demo-section try">
        <h2>Базовый слайдер</h2>
        <p class="explain">Потяни ползунок (или ткни на линию) — число справа меняется сразу.</p>
        <div class="slider-row">
          <mat-slider min="0" max="100" step="1" discrete>
            <input matSliderThumb [(ngModel)]="volume" aria-label="Громкость" />
          </mat-slider>
          <span class="result">Громкость: {{ volume }}%</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Шаги и метки</h2>
        <p class="explain">
          Слайдер может «прыгать» по шагам (например, по целым) и показывать метки —
          удобно для оценок или ограниченного набора значений.
        </p>
        <div class="slider-row">
          <mat-slider min="0" max="5" step="1" discrete showTickMarks>
            <input matSliderThumb [(ngModel)]="rating" aria-label="Оценка" />
          </mat-slider>
          <span class="result">Оценка: {{ rating }}</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Диапазон — два ползунка</h2>
        <p class="explain">Два ползунка задают «от» и «до» — например, фильтр по цене.</p>
        <div class="slider-row">
          <mat-slider min="0" max="1000" step="50" discrete>
            <input matSliderStartThumb [(ngModel)]="priceMin" aria-label="Цена от" />
            <input matSliderEndThumb [(ngModel)]="priceMax" aria-label="Цена до" />
          </mat-slider>
          <span class="result">От {{ priceMin }} до {{ priceMax }} ₽</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Недоступный слайдер</h2>
        <p class="explain">Слайдер можно отключить — он станет серым и не будет двигаться.</p>
        <mat-slider min="0" max="100" disabled>
          <input matSliderThumb value="60" aria-label="Недоступный слайдер" />
        </mat-slider>
      </section>

      <section class="demo-section">
        <h2>Слайдер или поле ввода?</h2>
        <p class="explain">
          <b>Слайдер</b> — когда важно «примерно» и приятно тянуть: громкость, яркость,
          диапазон цены. <b>Поле ввода</b> — когда нужна точная цифра (ввести ровно
          «1437»). Часто их ставят рядом.
        </p>
      </section>
    </div>
  `,
  styles: `
    .slider-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
    }
    mat-slider {
      width: 280px;
      max-width: 100%;
    }
    .result {
      color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class SliderPage {
  protected volume = 40;
  protected rating = 3;
  protected priceMin = 200;
  protected priceMax = 800;
}
