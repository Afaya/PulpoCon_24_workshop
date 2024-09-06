import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TravelListComponent } from './views/travel-list/travel-list.component';
import { TravelEditionComponent } from './views/travel-edition/travel-edition.component';
import { Page404ViewComponent } from './views/page404-view/page404-view.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'travels', component: TravelListComponent },
    { path: 'travel-edit/:id', component: TravelEditionComponent },
    { path: '*', component: Page404ViewComponent },
];
