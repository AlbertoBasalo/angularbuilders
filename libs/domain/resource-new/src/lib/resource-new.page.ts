import { SeoService } from '@ab/global';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './models/category';
import { Resource } from './models/resource';
import { ResourceNewService } from './resource-new.service';

@Component({
  templateUrl: './resource-new.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceNewPage implements OnInit {
  categories$!: Observable<Category[]>;
  constructor(private service: ResourceNewService, seo: SeoService) {
    seo.updateSeoTags({
      title: 'Add a new resource',
      description: '404',
      image: '',
      url: '',
    });
  }

  ngOnInit(): void {
    this.categories$ = this.service.getCategories$();
  }

  onSend(newResource: Resource) {
    this.service.postNewResource$(newResource).subscribe();
  }
}
