import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./demos/home').then((m) => m.HomePage),
    title: 'Angular 22 для вайбкодера',
  },
  {
    path: 'buttons',
    loadComponent: () => import('./demos/buttons').then((m) => m.ButtonsPage),
    title: 'Кнопки',
  },
  {
    path: 'button-toggle',
    loadComponent: () => import('./demos/button-toggle').then((m) => m.ButtonTogglePage),
    title: 'Кнопки-переключатели',
  },
  {
    path: 'icon',
    loadComponent: () => import('./demos/icon').then((m) => m.IconPage),
    title: 'Иконки',
  },
  {
    path: 'badge',
    loadComponent: () => import('./demos/badge').then((m) => m.BadgePage),
    title: 'Бейдж',
  },
  {
    path: 'progress-spinner',
    loadComponent: () => import('./demos/progress-spinner').then((m) => m.ProgressSpinnerPage),
    title: 'Прогресс (круг)',
  },
  {
    path: 'progress-bar',
    loadComponent: () => import('./demos/progress-bar').then((m) => m.ProgressBarPage),
    title: 'Прогресс (полоса)',
  },
  {
    path: 'dialog',
    loadComponent: () => import('./demos/dialog').then((m) => m.DialogPage),
    title: 'Диалог',
  },
  {
    path: 'snackbar',
    loadComponent: () => import('./demos/snackbar').then((m) => m.SnackbarPage),
    title: 'Снэкбар',
  },
  {
    path: 'tooltip',
    loadComponent: () => import('./demos/tooltip').then((m) => m.TooltipPage),
    title: 'Подсказка',
  },
  // Демо-страницы компонентов добавляются по одной выше этой строки.
  { path: '**', redirectTo: '' },
];
