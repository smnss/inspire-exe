import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../modals/products';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {

  @Input() set selectedBook(book: Book) {
    this.book = book;
    if (book)
    this.createBookForm.setValue({ ...this.book })
  }
  get customer(): Book { return this.book; };
  createBookForm: FormGroup;
  @Output() bookUpdate: EventEmitter<{ book: Book, isEdit: boolean }> = new EventEmitter<{ book: Book, isEdit: boolean }>();

  @Output() popupView: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  book!: Book;
  constructor(
  ) {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.createBookForm = new FormGroup({
      imageUrl: new FormControl('', [Validators.required, Validators.pattern(urlRegex)]),
      title: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      purchaseLink: new FormControl('', [Validators.required, Validators.pattern(urlRegex)]),
      PublishDate: new FormControl('', [Validators.required, Validators.maxLength(4)])
    });
  }

  addBook() {
    if(this.book) {
      this.bookUpdate.emit({book: this.createBookForm.value, isEdit: true});
      window.alert("The book has been Updated!");
    } else {
      this.bookUpdate.emit({book: this.createBookForm.value, isEdit: false});
      window.alert("The book has been added!");
    }
    this.closeForm();
  }
  ngOnInit() {
    console.log(this.selectedBook);

    if (this.selectedBook) {
      this.createBookForm.setValue({ ...this.book })
    }
  };

  closeForm(): void {
    this.popupView.emit(false);
  };


}