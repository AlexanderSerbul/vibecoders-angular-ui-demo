import { Component, computed, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

interface Setting {
  name: string;
  on: boolean;
}

@Component({
  selector: 'demo-slide-toggle',
  imports: [MatSlideToggleModule, MatButtonModule],
  template: `
    <div class="page">
      <h1>Переключатель</h1>
      <p class="lead">
        Переключатель — тумблер «вкл/выкл», как выключатель света. Для одной настройки
        с двумя состояниями: уведомления, тёмная тема, Wi-Fi. Обычно срабатывает сразу,
        как только переключил.
      </p>

      <section class="demo-section try">
        <h2>Базовый переключатель</h2>
        <p class="explain">Нажми — тумблер перекинется, настройка включится или выключится.</p>
        <div class="demo-row">
          <mat-slide-toggle [checked]="notifications()" (change)="notifications.set($event.checked)">
            Уведомления
          </mat-slide-toggle>
          <span class="result">{{ notifications() ? 'Вкл' : 'Выкл' }}</span>
        </div>
      </section>

      <section class="demo-section">
        <h2>Несколько настроек</h2>
        <p class="explain">Каждый переключатель сам по себе — как экран настроек в телефоне.</p>
        <div class="column">
          @for (s of settings(); track s.name; let i = $index) {
            <mat-slide-toggle [checked]="s.on" (change)="toggleSetting(i, $event.checked)">
              {{ s.name }}
            </mat-slide-toggle>
          }
        </div>
        <span class="result">Включено: {{ enabledCount() }} из {{ settings().length }}</span>
      </section>

      <section class="demo-section try">
        <h2>Срабатывает сразу</h2>
        <p class="explain">
          В отличие от галочки в форме, переключатель обычно действует мгновенно. Включи
          согласие — кнопка «Продолжить» оживёт.
        </p>
        <div class="demo-row">
          <mat-slide-toggle [checked]="agreed()" (change)="agreed.set($event.checked)">
            Я принимаю условия
          </mat-slide-toggle>
          <button matButton="filled" [disabled]="!agreed()">Продолжить</button>
        </div>
      </section>

      <section class="demo-section">
        <h2>Состояния</h2>
        <p class="explain">Переключатель можно сделать недоступным — серым и ненажимаемым.</p>
        <div class="column">
          <mat-slide-toggle disabled>Недоступно (выключено)</mat-slide-toggle>
          <mat-slide-toggle disabled checked>Недоступно (включено)</mat-slide-toggle>
        </div>
      </section>

      <section class="demo-section">
        <h2>Переключатель или чекбокс?</h2>
        <p class="explain">
          <b>Переключатель</b> — для настройки «вкл/выкл», которая срабатывает сразу
          (уведомления, тёмная тема). <b>Чекбокс</b> — для выбора в форме, который
          подтверждают позже кнопкой (согласие, пункты списка). Оба про «да/нет», но
          ощущаются по-разному.
        </p>
      </section>
    </div>
  `,
  styles: `
    .column {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .result {
      color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class SlideTogglePage {
  protected readonly notifications = signal(true);
  protected readonly agreed = signal(false);

  protected readonly settings = signal<Setting[]>([
    { name: 'Звук', on: true },
    { name: 'Вибрация', on: false },
    { name: 'Автообновление', on: true },
  ]);

  protected readonly enabledCount = computed(() => this.settings().filter((s) => s.on).length);

  toggleSetting(index: number, on: boolean): void {
    this.settings.update((list) => list.map((s, i) => (i === index ? { ...s, on } : s)));
  }
}
