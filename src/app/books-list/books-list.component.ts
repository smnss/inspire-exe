import { OnInit, Component } from '@angular/core';
import { Author, Book } from '../modals/products';
import { BooksService } from '../services/books.service';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BookListComponent implements OnInit {
  author!: Author;
  selectedBook!: Book | null;
  selectedIndex!: number | null;
  popupVisibility: boolean = false;
  constructor(private booksService: BooksService) { }

  getBooks(): void {
    this.booksService.getBooks()
      .subscribe(author => this.author = author);
  }
  ngOnInit() {
    this.getBooks();
  }

  deleteBook(index: number) {
    var check = window.confirm('Do you removed this item?');
    if (check === true) {
      this.author!.books.splice(index, 1);
      window.alert('The Book has been removed.')
    }
  }

  editBook(book: Book, index: number) {
    this.selectedBook = Object.assign({}, book);
    this.selectedIndex = index;
    this.decidePopupView(true);
  }

  addBook() {
    this.selectedBook = null;
    this.selectedIndex = null;
    this.decidePopupView(true);
  }

  updateBookList(arg: { book: Book, isEdit: boolean }) {
    if (!arg.isEdit) {
      this.author!.books.push(arg.book);
    } else {
      const onEditModeBook = this.author!.books[this.selectedIndex!];
      Object.assign(onEditModeBook, arg.book);
    }
  }

  decidePopupView(flag: boolean) {
    this.popupVisibility = flag;
  }



}
