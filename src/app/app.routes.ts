import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./demos/home').then((m) => m.HomePage),
    title: 'Material Site — каталог компонентов',
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
  // Демо-страницы компонентов добавляются по одной выше этой строки.
  { path: '**', redirectTo: '' },
];
