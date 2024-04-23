import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as ValidationConstants from "src/app/constants/ValidationConstants";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  searchForm: FormGroup = new FormGroup([]);
  @Output() searchTextBar: EventEmitter<string> = new EventEmitter<string>();
  searchText: string = '';
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.searchFormBuilder()
  }

  searchFormBuilder() {
    this.searchForm = this.formBuilder.group({
      searchInput: new FormControl("", ValidationConstants.nameValidation),
    });
  }

  onSearch() {
    // Emit the searchText value when it changes
    this.searchTextBar.emit(this.searchText);
  }
}
