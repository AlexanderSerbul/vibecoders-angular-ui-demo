import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

interface NavItem {
  label: string;
  path: string;
  ready: boolean;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly brand = 'Material Site';

  // Каталог компонентов по официальным категориям Angular Material.
  // ready: false => пункт виден как «скоро» и неактивен. Когда добавляем
  // страницу компонента — ставим ready: true и заводим маршрут в app.routes.ts.
  protected readonly sections: NavSection[] = [
    {
      label: 'Поля и контролы форм',
      items: [
        { label: 'Поле ввода', path: 'form-field', ready: false },
        { label: 'Выпадающий список', path: 'select', ready: false },
        { label: 'Автодополнение', path: 'autocomplete', ready: false },
        { label: 'Чекбокс', path: 'checkbox', ready: false },
        { label: 'Радио-кнопки', path: 'radio', ready: false },
        { label: 'Переключатель', path: 'slide-toggle', ready: false },
        { label: 'Слайдер', path: 'slider', ready: false },
        { label: 'Дата', path: 'datepicker', ready: false },
        { label: 'Чипы', path: 'chips', ready: false },
      ],
    },
    {
      label: 'Навигация',
      items: [
        { label: 'Меню', path: 'menu', ready: false },
        { label: 'Боковая панель', path: 'sidenav', ready: false },
        { label: 'Тулбар', path: 'toolbar', ready: false },
      ],
    },
    {
      label: 'Макет',
      items: [
        { label: 'Карточка', path: 'cards', ready: false },
        { label: 'Вкладки', path: 'tabs', ready: false },
        { label: 'Раскрывающиеся панели', path: 'expansion', ready: false },
        { label: 'Списки', path: 'list', ready: false },
        { label: 'Шаги', path: 'stepper', ready: false },
        { label: 'Дерево', path: 'tree', ready: false },
        { label: 'Разделитель', path: 'divider', ready: false },
      ],
    },
    {
      label: 'Кнопки и индикаторы',
      items: [
        { label: 'Кнопки', path: 'buttons', ready: true },
        { label: 'Кнопки-переключатели', path: 'button-toggle', ready: false },
        { label: 'Иконки', path: 'icon', ready: false },
        { label: 'Бейдж', path: 'badge', ready: false },
        { label: 'Прогресс (круг)', path: 'progress-spinner', ready: false },
        { label: 'Прогресс (полоса)', path: 'progress-bar', ready: false },
      ],
    },
    {
      label: 'Поповеры и модалки',
      items: [
        { label: 'Диалог', path: 'dialog', ready: false },
        { label: 'Нижний лист', path: 'bottom-sheet', ready: false },
        { label: 'Снэкбар', path: 'snackbar', ready: false },
        { label: 'Подсказка', path: 'tooltip', ready: false },
      ],
    },
    {
      label: 'Таблицы данных',
      items: [
        { label: 'Таблица', path: 'table', ready: false },
        { label: 'Пагинатор', path: 'paginator', ready: false },
        { label: 'Сортировка', path: 'sort', ready: false },
      ],
    },
  ];
}
