import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FormComponent } from './components/form/form.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [ { path: '', redirectTo: 'main-page', pathMatch: 'full' },
                                { path: 'main-page', component: MainPageComponent },
                                { path: 'form', component: FormComponent },
                                { path: 'products', component: ProductsComponent },
                                { path: '**', redirectTo: 'main-page' }
                              ];