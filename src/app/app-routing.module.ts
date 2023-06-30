import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './books-list/books-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'book-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'book-list' },
  { path: 'book-list', component: BookListComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
