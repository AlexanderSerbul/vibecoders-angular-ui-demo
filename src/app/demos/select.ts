import { Component, computed, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'demo-select',
  imports: [MatFormFieldModule, MatSelectModule],
  template: `
    <div class="page">
      <h1>Выпадающий список</h1>
      <p class="lead">
        Выпадающий список — поле, которое по клику разворачивает список вариантов.
        Удобно, когда вариантов много (города, страны) и незачем показывать их все
        сразу: нажал — выбрал. Бывает и с выбором нескольких.
      </p>

      <section class="demo-section try">
        <h2>Базовый выбор</h2>
        <p class="explain">Нажми на поле — раскроется список. Выбери город — он подставится в поле.</p>
        <div class="demo-row">
          <mat-form-field appearance="outline" class="field">
            <mat-label>Город</mat-label>
            <mat-select [value]="city()" (selectionChange)="city.set($event.value)">
              <mat-option value="msk">Москва</mat-option>
              <mat-option value="spb">Санкт-Петербург</mat-option>
              <mat-option value="nsk">Новосибирск</mat-option>
              <mat-option value="ekb">Екатеринбург</mat-option>
            </mat-select>
          </mat-form-field>
          <span class="result">Выбран город: {{ cityLabel() }}</span>
        </div>
      </section>

      <section class="demo-section try">
        <h2>Выбор нескольких</h2>
        <p class="explain">
          С пометкой «несколько» (<code class="api">multiple</code>) можно отметить
          сразу несколько пунктов — у каждого появится галочка.
        </p>
        <div class="demo-row">
          <mat-form-field appearance="outline" class="field">
            <mat-label>Интересы</mat-label>
            <mat-select multiple [value]="interests()" (selectionChange)="interests.set($event.value)">
              <mat-option value="music">Музыка</mat-option>
              <mat-option value="sport">Спорт</mat-option>
              <mat-option value="travel">Путешествия</mat-option>
              <mat-option value="cooking">Готовка</mat-option>
            </mat-select>
          </mat-form-field>
          <span class="result multi">Выбрано: {{ interestsLabel() }}</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Группы вариантов</h2>
        <p class="explain">Длинный список можно разбить на группы с заголовками.</p>
        <mat-form-field appearance="outline" class="field">
          <mat-label>Город</mat-label>
          <mat-select value="msk">
            <mat-optgroup label="Россия">
              <mat-option value="msk">Москва</mat-option>
              <mat-option value="spb">Санкт-Петербург</mat-option>
            </mat-optgroup>
            <mat-optgroup label="Беларусь">
              <mat-option value="minsk">Минск</mat-option>
            </mat-optgroup>
            <mat-optgroup label="Казахстан">
              <mat-option value="ala">Алматы</mat-option>
            </mat-optgroup>
          </mat-select>
        </mat-form-field>
      </section>

      <section class="demo-section">
        <h2>Состояния</h2>
        <p class="explain">Список целиком или отдельный его пункт можно отключить.</p>
        <div class="demo-row">
          <mat-form-field appearance="outline" class="field">
            <mat-label>Тариф</mat-label>
            <mat-select value="base">
              <mat-option value="base">Базовый</mat-option>
              <mat-option value="pro" disabled>Про — скоро</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline" class="field">
            <mat-label>Недоступно</mat-label>
            <mat-select disabled value="x">
              <mat-option value="x">Нельзя поменять</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </section>

      <section class="demo-section">
        <h2>Список или радио-кнопки?</h2>
        <p class="explain">
          <b>Выпадающий список</b> — когда вариантов много или хочется сэкономить место
          (список спрятан до клика). <b>Радио-кнопки</b> — когда вариантов мало (2–5) и
          лучше показать их все сразу, не пряча.
        </p>
      </section>
    </div>
  `,
  styles: `
    .field {
      width: 280px;
      max-width: 100%;
    }
    .result {
      color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class SelectPage {
  protected readonly city = signal('msk');
  protected readonly interests = signal<string[]>([]);

  private readonly cityNames: Record<string, string> = {
    msk: 'Москва',
    spb: 'Санкт-Петербург',
    nsk: 'Новосибирск',
    ekb: 'Екатеринбург',
  };
  private readonly interestNames: Record<string, string> = {
    music: 'Музыка',
    sport: 'Спорт',
    travel: 'Путешествия',
    cooking: 'Готовка',
  };

  protected readonly cityLabel = computed(() => this.cityNames[this.city()] ?? '—');
  protected readonly interestsLabel = computed(() => {
    const names = this.interests().map((v) => this.interestNames[v]);
    return names.length ? names.join(', ') : '—';
  });
}
