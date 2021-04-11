import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationComponent } from './notification/notification.component';
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavbarComponent, FooterComponent, NotificationComponent],
  exports: [NavbarComponent, FooterComponent],
})
export class LayoutModule {}
