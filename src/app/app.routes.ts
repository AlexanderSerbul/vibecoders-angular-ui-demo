import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./demos/home').then((m) => m.HomePage),
    title: 'Material Site — каталог компонентов',
  },
  // Демо-страницы компонентов добавляются по одной выше этой строки.
  { path: '**', redirectTo: '' },
];
