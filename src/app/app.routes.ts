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
  // Демо-страницы компонентов добавляются по одной выше этой строки.
  { path: '**', redirectTo: '' },
];
