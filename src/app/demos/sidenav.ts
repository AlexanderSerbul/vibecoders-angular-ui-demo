import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

type SidenavMode = 'over' | 'side' | 'push';

@Component({
  selector: 'demo-sidenav',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonToggleModule,
  ],
  template: `
    <div class="page">
      <h1>Боковая панель</h1>
      <p class="lead">
        Боковая панель — панель, которая выезжает сбоку (обычно слева). В ней держат
        навигацию или настройки. На большом экране может стоять рядом с контентом
        постоянно, на телефоне — выезжать поверх по кнопке-меню. Как боковое меню в Gmail.
      </p>

      <section class="demo-section">
        <h2>Режим</h2>
        <p class="explain">
          Переключи режим и понажимай «Меню»: <b>over</b> — выезжает поверх с затемнением,
          <b>side</b> — стоит рядом и раздвигает контент, <b>push</b> — выезжает и сдвигает контент вбок.
        </p>
        <mat-button-toggle-group
          [value]="mode()"
          (change)="mode.set($event.value)"
          hideSingleSelectionIndicator
          aria-label="Режим панели"
        >
          <mat-button-toggle value="over">over</mat-button-toggle>
          <mat-button-toggle value="side">side</mat-button-toggle>
          <mat-button-toggle value="push">push</mat-button-toggle>
        </mat-button-toggle-group>
      </section>

      <section class="demo-section try">
        <h2>Боковая панель в действии</h2>
        <p class="explain">Нажми «Меню» в шапке, затем выбери раздел в панели.</p>
        <div class="demo-frame">
          <mat-sidenav-container class="container">
            <mat-sidenav
              [mode]="mode()"
              [opened]="opened()"
              (openedChange)="opened.set($event)"
              class="sidenav"
            >
              <mat-action-list>
                @for (item of navItems; track item.label) {
                  <button mat-list-item (click)="select(item.label)">
                    <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                    <span matListItemTitle>{{ item.label }}</span>
                  </button>
                }
              </mat-action-list>
            </mat-sidenav>

            <mat-sidenav-content>
              <mat-toolbar class="frame-bar">
                <button matIconButton (click)="opened.set(!opened())" aria-label="Открыть боковую панель">
                  <mat-icon>menu</mat-icon>
                </button>
                <span>{{ current() }}</span>
              </mat-toolbar>
              <div class="frame-body">
                <p>Здесь содержимое раздела «{{ current() }}».</p>
              </div>
            </mat-sidenav-content>
          </mat-sidenav-container>
        </div>
      </section>

      <section class="demo-section">
        <h2>Когда боковая панель?</h2>
        <p class="explain">
          Боковая панель хороша для <b>навигации между разделами</b> приложения, особенно
          когда их много. На телефоне она выезжает по кнопке-меню, на десктопе может
          стоять рядом постоянно. Для короткого списка <b>действий</b> снизу лучше нижний
          лист, а для пары пунктов рядом с кнопкой — обычное меню.
        </p>
      </section>
    </div>
  `,
  styles: `
    .demo-frame {
      height: 320px;
      border: 1px solid var(--mat-sys-outline-variant);
      border-radius: 12px;
      overflow: hidden;
    }
    .container {
      height: 100%;
    }
    .sidenav {
      width: 220px;
    }
    .frame-bar {
      gap: 0.5rem;
    }
    .frame-body {
      padding: 1.5rem;
    }
  `,
})
export class SidenavPage {
  protected readonly mode = signal<SidenavMode>('over');
  protected readonly opened = signal(false);
  protected readonly current = signal('Главная');

  protected readonly navItems = [
    { icon: 'home', label: 'Главная' },
    { icon: 'inbox', label: 'Входящие' },
    { icon: 'star', label: 'Избранное' },
    { icon: 'settings', label: 'Настройки' },
  ];

  select(label: string): void {
    this.current.set(label);
    if (this.mode() !== 'side') this.opened.set(false);
  }
}
