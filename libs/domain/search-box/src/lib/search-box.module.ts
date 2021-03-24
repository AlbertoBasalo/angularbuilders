import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxWidget } from './search-box.widget';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SearchBoxWidget, SearchBoxComponent],
  exports: [SearchBoxWidget],
})
export class SearchBoxModule {}
