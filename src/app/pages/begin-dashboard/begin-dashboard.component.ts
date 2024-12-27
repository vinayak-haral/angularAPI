import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-begin-dashboard',
  templateUrl: './begin-dashboard.component.html',
  styleUrls: ['./begin-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeginDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
}
