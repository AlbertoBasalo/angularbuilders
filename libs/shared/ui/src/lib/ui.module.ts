import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { MessageComponent } from './components/message/message.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TrackDirective } from './directives/track.directive';
import { TruncatePipe } from './pipes/truncate.pipe';
import { BoxTemplate } from './templates/box/box.template';
import { CardTemplate } from './templates/card/card.template';
import { ModalTemplate } from './templates/modal/modal.template';
import { PageTemplate } from './templates/page/page.template';
import { PanelTemplate } from './templates/panel/panel.template';
import { SectionTemplate } from './templates/section/section.template';
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    BreadcrumbComponent,
    MenuComponent,
    MessageComponent,
    TabsComponent,
    BoxTemplate,
    CardTemplate,
    ModalTemplate,
    PanelTemplate,
    TrackDirective,
    TruncatePipe,
    PageTemplate,
    SectionTemplate,
    NotificationComponent,
    HeaderComponent,
  ],
  exports: [
    BreadcrumbComponent,
    MenuComponent,
    MessageComponent,
    TabsComponent,
    BoxTemplate,
    CardTemplate,
    ModalTemplate,
    PanelTemplate,
    TrackDirective,
    TruncatePipe,
    PageTemplate,
    SectionTemplate,
    NotificationComponent,
    HeaderComponent,
  ],
})
export class UiModule {}
