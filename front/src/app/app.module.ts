import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ImagePipe } from './pipes/image.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ItemsComponent } from './ui/items/items.component';
import { ItemComponent } from './ui/item/item.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { ValidatePhoneDirective } from './directives/validate-phone.directive';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import { MatSelectModule } from '@angular/material/select';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { itemsReducer } from './store/items.reduser';
import { ItemsEffects } from './store/items.effects';
import { categoriesReducer } from './store/categories.reducer';
import { CategoriesEffects } from './store/categories.effects';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RegisterComponent,
    LoginComponent,
    CenteredCardComponent,
    FileInputComponent,
    ImagePipe,
    ItemsComponent,
    ItemComponent,
    SidebarComponent,
    HomeComponent,
    ValidatePhoneDirective,
    EditItemComponent,
    ItemDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    StoreModule.forRoot({users: usersReducer, items: itemsReducer, categories: categoriesReducer}, {metaReducers}),
    EffectsModule.forRoot([UsersEffects, ItemsEffects, CategoriesEffects]),
    MatProgressSpinnerModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
