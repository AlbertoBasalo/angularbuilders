import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MenuComponent } from './components/menu/menu.component';
import { MessageComponent } from './components/message/message.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { BoxTemplate } from './templates/box/box.template';
import { CardTemplate } from './templates/card/card.template';
import { ModalTemplate } from './templates/modal/modal.template';
import { PanelTemplate } from './templates/panel/panel.template';
import { TrackDirective } from './directives/track.directive';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [BreadcrumbComponent, MenuComponent, MessageComponent, TabsComponent, BoxTemplate, CardTemplate, ModalTemplate, PanelTemplate, TrackDirective, TruncatePipe],
  exports: [BreadcrumbComponent, MenuComponent, MessageComponent, TabsComponent, BoxTemplate, CardTemplate, ModalTemplate, PanelTemplate, TrackDirective, TruncatePipe],
})
export class UiModule {}
