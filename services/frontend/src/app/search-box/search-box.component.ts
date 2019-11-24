import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.styl']
})
export class SearchBoxComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<SearchBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit() {
  }

}
