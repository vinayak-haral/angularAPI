import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  short: string;
  long?: string;
}

@Component({
  selector: 'app-begin-dashboard',
  templateUrl: './begin-dashboard.component.html',
  styleUrls: ['./begin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeginDashboardComponent implements OnInit {
  public items: GalleryItem[] = [];
  public previewItem: GalleryItem | null = null;
  public loading = false;

  constructor() {}

  ngOnInit(): void {
    // Seed with 8 items (2 rows of 4). Replace src values later with your images.
    this.items = [
      this.makeItem('1','Shiba Inu','Dog Breed','https://material.angular.io/assets/img/examples/shiba2.jpg','Shiba Inu','Small agile spitz from Japan', this.longText),
      this.makeItem('2','Golden Retriever','Dog Breed','https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1200','Golden Retriever','Friendly family dog', this.longText),
      this.makeItem('3','Husky','Dog Breed','https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1200','Husky','Energetic sled dog', this.longText),
      this.makeItem('4','Beagle','Dog Breed','https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200','Beagle','Curious scent hound', this.longText),
      this.makeItem('5','Labrador','Dog Breed','https://images.unsplash.com/photo-1507149833265-60c372daea22?w=1200','Labrador','Loyal retriever', this.longText),
      this.makeItem('6','Pug','Dog Breed','https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=1200','Pug','Compact companion', this.longText),
      this.makeItem('7','German Shepherd','Dog Breed','https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=1200','German Shepherd','Working dog', this.longText),
      this.makeItem('8','French Bulldog','Dog Breed','https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200','French Bulldog','Playful city dog', this.longText)
    ];
  }

  private makeItem(id: string, title: string, subtitle: string, src: string, alt: string, short: string, long?: string): GalleryItem {
    return { id, title, subtitle, src, alt, short, long: long ?? short };
  }

  openPreview(item: GalleryItem) {
    this.previewItem = item;
    // optional: lock scroll
    document.body.style.overflow = 'hidden';
  }

  closePreview() {
    this.previewItem = null;
    document.body.style.overflow = '';
  }

  share(item: GalleryItem) {
    // placeholder share action — replace with real share logic
    console.log('Share', item);
    alert(`Share: ${item.title}`);
  }

  loadMore() {
    this.loading = true;
    // Example: simulate loading more items (append duplicates or fetch from API)
    setTimeout(() => {
      const nextId = (this.items.length + 1).toString();
      this.items.push(this.makeItem(nextId, 'New Item', 'Category', 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=1200', 'New', 'New item short text', this.longText));
      this.loading = false;
    }, 900);
  }

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.`;
}