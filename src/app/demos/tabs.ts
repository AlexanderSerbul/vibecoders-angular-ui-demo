import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'demo-tabs',
  imports: [MatTabsModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Вкладки</h1>
      <p class="lead">
        Вкладки — это переключатели между несколькими «экранами» в одном месте.
        Показывается только один, остальные ждут за своими заголовками. Удобно, когда
        контента много, а места мало: вместо длинной простыни — пара аккуратных вкладок.
        Как вкладки в браузере.
      </p>

      <section class="demo-section try">
        <h2>Вкладки в действии</h2>
        <p class="explain">
          Нажимай заголовки сверху — содержимое под ними меняется, а строка ниже
          показывает, что открыто. В один момент видна только одна вкладка.
        </p>
        <mat-tab-group [selectedIndex]="index()" (selectedIndexChange)="index.set($event)">
          <mat-tab label="Описание">
            <div class="tab-body">
              <p>
                Беспроводные наушники с мягкими амбушюрами. Лёгкие, удобно сидят
                и не давят даже за долгий день.
              </p>
            </div>
          </mat-tab>
          <mat-tab label="Характеристики">
            <div class="tab-body">
              <ul>
                <li>Вес: 240 г</li>
                <li>Время работы: 30 часов</li>
                <li>Зарядка: USB‑C</li>
              </ul>
            </div>
          </mat-tab>
          <mat-tab label="Отзывы">
            <div class="tab-body">
              <p>★★★★★ — «Звук чистый, бас на месте». Игорь</p>
              <p>★★★★☆ — «Отличные за свои деньги». Марина</p>
            </div>
          </mat-tab>
        </mat-tab-group>
        <p class="result">Сейчас открыта: <b>«{{ labels[index()] }}»</b></p>
      </section>

      <section class="demo-section">
        <h2>Заголовки с иконками</h2>
        <p class="explain">
          В заголовок вкладки можно добавить иконку — так разделы легче различать
          с одного взгляда.
        </p>
        <mat-tab-group>
          <mat-tab>
            <ng-template mat-tab-label><mat-icon class="tab-icon">home</mat-icon> Главная</ng-template>
            <div class="tab-body"><p>Сводка и последние события.</p></div>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label><mat-icon class="tab-icon">person</mat-icon> Профиль</ng-template>
            <div class="tab-body"><p>Имя, фото и контакты.</p></div>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label><mat-icon class="tab-icon">settings</mat-icon> Настройки</ng-template>
            <div class="tab-body"><p>Уведомления, тема и язык.</p></div>
          </mat-tab>
        </mat-tab-group>
      </section>

      <section class="demo-section">
        <h2>Когда вкладки?</h2>
        <p class="explain">
          Вкладки хороши, когда у одного объекта несколько <b>равноправных</b> разделов
          и между ними часто прыгают туда‑сюда: описание / характеристики / отзывы.
          Если шаги идут <b>строго по порядку</b> (как оформление заказа) — это
          <b>шаги</b>, а не вкладки. А для перехода между крупными частями приложения
          лучше <b>меню</b> или <b>боковая панель</b>.
        </p>
      </section>
    </div>
  `,
  styles: `
    .tab-body {
      padding: 1.25rem 0.25rem;
    }
    .tab-body ul {
      margin: 0;
      padding-left: 1.2rem;
    }
    .tab-icon {
      margin-right: 0.4rem;
      vertical-align: middle;
    }
    .result {
      margin-top: 1rem;
    }
  `,
})
export class TabsPage {
  protected readonly index = signal(0);
  protected readonly labels = ['Описание', 'Характеристики', 'Отзывы'];
}
