import { Component, ViewChild, afterNextRender } from '@angular/core';
import { MatTree, MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface FileNode {
  name: string;
  children?: FileNode[];
}

@Component({
  selector: 'demo-tree',
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page">
      <h1>Дерево</h1>
      <p class="lead">
        Дерево показывает вложенность: папки и подпапки, категории и подкатегории.
        У веток есть «стрелка» — нажми, и ветка раскроется или свернётся. Так удобно
        показывать структуру, где одно вложено в другое, не вываливая сразу всё.
      </p>

      <section class="demo-section try">
        <h2>Дерево папок</h2>
        <p class="explain">
          Это структура папок проекта. Нажимай на папки, чтобы раскрывать и сворачивать
          ветки, или разверни всё разом кнопками. Вложенность показана отступом слева.
        </p>
        <div class="tree-actions">
          <button matButton (click)="tree.expandAll()">Развернуть всё</button>
          <button matButton (click)="tree.collapseAll()">Свернуть всё</button>
        </div>
        <mat-tree #tree="matTree" [dataSource]="data" [childrenAccessor]="childrenAccessor" class="tree">
          <mat-tree-node *matTreeNodeDef="let node">
            <span class="toggle-spacer"></span>
            <mat-icon class="node-icon file">description</mat-icon>
            <span>{{ node.name }}</span>
          </mat-tree-node>

          <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild">
            <div class="tree-row">
              <button
                matIconButton
                matTreeNodeToggle
                [attr.aria-label]="(tree.isExpanded(node) ? 'Свернуть ' : 'Раскрыть ') + node.name"
              >
                <mat-icon>{{ tree.isExpanded(node) ? 'expand_more' : 'chevron_right' }}</mat-icon>
              </button>
              <mat-icon class="node-icon folder">{{ tree.isExpanded(node) ? 'folder_open' : 'folder' }}</mat-icon>
              <span>{{ node.name }}</span>
            </div>
            <div role="group" [class.hidden]="!tree.isExpanded(node)">
              <ng-container matTreeNodeOutlet></ng-container>
            </div>
          </mat-nested-tree-node>
        </mat-tree>
      </section>

      <section class="demo-section">
        <h2>Когда дерево?</h2>
        <p class="explain">
          Дерево нужно, когда у данных <b>несколько уровней вложенности</b> и глубина
          заранее неизвестна: папки с файлами, разделы со подразделами, ответы на
          комментарии. Если уровень всего один — хватит обычного <b>списка</b>, он проще.
        </p>
      </section>
    </div>
  `,
  styles: `
    .tree-actions {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }
    .tree {
      max-width: 460px;
    }
    .tree-row {
      display: flex;
      align-items: center;
      min-height: 44px;
    }
    .toggle-spacer {
      display: inline-block;
      width: 40px;
    }
    .node-icon {
      margin-right: 6px;
      vertical-align: middle;
    }
    .node-icon.folder {
      color: var(--mat-sys-primary);
    }
    .node-icon.file {
      color: var(--mat-sys-on-surface-variant);
    }
    div[role='group'] {
      padding-left: 24px;
    }
    .hidden {
      display: none;
    }
  `,
})
export class TreePage {
  @ViewChild(MatTree) private tree?: MatTree<FileNode>;

  protected readonly childrenAccessor = (node: FileNode) => node.children ?? [];
  protected readonly hasChild = (_: number, node: FileNode) => !!node.children?.length;

  protected readonly data: FileNode[] = [
    {
      name: 'Проект',
      children: [
        {
          name: 'src',
          children: [
            { name: 'app', children: [{ name: 'app.ts' }, { name: 'app.html' }] },
            { name: 'main.ts' },
          ],
        },
        { name: 'e2e', children: [{ name: 'home.spec.ts' }] },
        { name: 'package.json' },
      ],
    },
  ];

  constructor() {
    // Разворачиваем дерево при первом показе, чтобы сразу была видна вся структура.
    afterNextRender(() => this.tree?.expandAll());
  }
}
