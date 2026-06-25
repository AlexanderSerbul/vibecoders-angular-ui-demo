import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

interface ShareAction {
  id: string;
  icon: string;
  label: string;
}

/** Содержимое нижнего листа — список действий «Поделиться». */
@Component({
  selector: 'demo-share-sheet',
  imports: [MatListModule, MatIconModule],
  template: `
    <h3 class="sheet-title">Поделиться отчётом</h3>
    <mat-action-list>
      @for (a of actions; track a.id) {
        <button mat-list-item (click)="choose(a.label)">
          <mat-icon matListItemIcon>{{ a.icon }}</mat-icon>
          <span matListItemTitle>{{ a.label }}</span>
        </button>
      }
    </mat-action-list>
  `,
  styles: `
    .sheet-title {
      margin: 0.5rem 1rem;
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class ShareSheet {
  private readonly ref = inject(MatBottomSheetRef);

  protected readonly actions: ShareAction[] = [
    { id: 'wa', icon: 'chat', label: 'WhatsApp' },
    { id: 'tg', icon: 'send', label: 'Telegram' },
    { id: 'mail', icon: 'mail', label: 'Почта' },
    { id: 'copy', icon: 'content_copy', label: 'Копировать ссылку' },
  ];

  choose(label: string): void {
    this.ref.dismiss(label);
  }
}

@Component({
  selector: 'demo-bottom-sheet',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Нижний лист</h1>
      <p class="lead">
        Нижний лист — панель, которая выезжает снизу экрана. Чаще всего в ней список
        действий: «Поделиться через…», «Открыть в…». Особенно удобно на телефоне:
        большим пальцем дотянуться до низа проще, чем тянуться вверх.
      </p>

      <section class="demo-section try">
        <h2>Список действий</h2>
        <p class="explain">
          Классика — меню «Поделиться». Нажми кнопку: снизу выедет панель с вариантами.
          Выберешь один — он вернётся на страницу, а панель закроется.
        </p>
        <div class="demo-row">
          <button matButton="filled" (click)="share()">
            <mat-icon>share</mat-icon> Поделиться
          </button>
          @if (result()) {
            <span class="result">{{ result() }}</span>
          }
        </div>
      </section>

      <section class="demo-section">
        <h2>Нижний лист, меню или диалог?</h2>
        <p class="explain">
          <b>Нижний лист</b> — список действий снизу, удобно на телефоне.
          <b>Меню</b> — маленький выпадающий список рядом с кнопкой (такое у нас в
          шапке). <b>Диалог</b> — окно по центру, которое блокирует и ждёт ответа. Для
          набора действий на мобильном берите нижний лист.
        </p>
      </section>
    </div>
  `,
  styles: `
    .result {
      color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class BottomSheetPage {
  private readonly bottomSheet = inject(MatBottomSheet);
  protected readonly result = signal('');

  share(): void {
    this.bottomSheet
      .open(ShareSheet)
      .afterDismissed()
      .subscribe((choice) => {
        if (choice) this.result.set(`Поделились через: ${choice}`);
      });
  }
}
