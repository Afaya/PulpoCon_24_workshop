import { Component } from '@angular/core';
import { TravelDetailComponent } from '../../components/travel-detail/travel-detail.component';

@Component({
  selector: 'app-travel-list',
  standalone: true,
  imports: [TravelDetailComponent],
  templateUrl: './travel-list.component.html',
  styleUrl: './travel-list.component.scss'
})
export class TravelListComponent {

}
