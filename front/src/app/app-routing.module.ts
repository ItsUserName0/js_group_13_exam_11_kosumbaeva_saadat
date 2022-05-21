import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ItemsComponent } from './ui/items/items.component';
import { HomeComponent } from './pages/home/home.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: '', component: ItemsComponent},
      {path: 'items/category/:id', component: ItemsComponent},
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'items/new', component: EditItemComponent},
  {path: 'items/:id', component: ItemDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
