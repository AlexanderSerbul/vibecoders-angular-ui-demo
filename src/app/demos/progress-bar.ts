import { Component, OnDestroy, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'demo-progress-bar',
  imports: [MatProgressBarModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Прогресс — полоса</h1>
      <p class="lead">
        Полоска, которая заполняется слева направо. То же «идёт работа», но в виде
        понятной горизонтальной шкалы — удобно для загрузки файлов и установки.
      </p>

      <section class="demo-section">
        <h2>Когда не знаешь, сколько ждать <code class="api">mode="indeterminate"</code></h2>
        <p class="explain">Бегущая полоса без конца — пока идёт неизвестно-долгая загрузка.</p>
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </section>

      <section class="demo-section try">
        <h2>Попробуйте сами — загрузка с процентом</h2>
        <p class="explain">
          Когда известно, сколько готово — полоса заполняется до процента
          (<code class="api">mode="determinate"</code>). Нажмите «Запустить» — увидите,
          как она наполняется до 100%.
        </p>
        <mat-progress-bar mode="determinate" [value]="progress()"></mat-progress-bar>
        <div class="demo-row status-row">
          <button matButton="filled" (click)="start()" [disabled]="running()">
            <mat-icon>cloud_upload</mat-icon> Запустить загрузку
          </button>
          @if (progress() === 100) {
            <span class="done"><mat-icon>check_circle</mat-icon> Готово</span>
          } @else {
            <span class="value-label">{{ progress() }}%</span>
          }
        </div>
      </section>

      <section class="demo-section">
        <h2>С буфером <code class="api">mode="buffer"</code></h2>
        <p class="explain">
          Две полосы сразу: сплошная — что уже загружено, точечная впереди — что
          подгружается «про запас». Так показывают, например, буферизацию видео.
        </p>
        <mat-progress-bar mode="buffer" [value]="40" [bufferValue]="70"></mat-progress-bar>
      </section>
    </div>
  `,
  styles: `
    mat-progress-bar {
      margin: 0.5rem 0;
    }
    .status-row {
      margin-top: 1rem;
    }
    .value-label {
      color: var(--mat-sys-on-surface-variant);
      font: var(--mat-sys-title-medium);
    }
    .done {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--mat-sys-primary);
      font: var(--mat-sys-title-medium);
    }
  `,
})
export class ProgressBarPage implements OnDestroy {
  protected readonly progress = signal(0);
  protected readonly running = signal(false);
  private timer: ReturnType<typeof setInterval> | undefined;

  start(): void {
    if (this.running()) return;
    this.progress.set(0);
    this.running.set(true);
    this.timer = setInterval(() => {
      this.progress.update((p) => {
        const next = Math.min(100, p + 5);
        if (next >= 100) {
          clearInterval(this.timer);
          this.running.set(false);
        }
        return next;
      });
    }, 150);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
