import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  image: string;
  heading: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'Gallifrey';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AppRootUploadDialogComponent, {
      width: '100vw'
    });
  }
}

@Component({
  selector: 'app-upload-post-component',
  template: '<app-upload-post></app-upload-post>'
})
export class AppRootUploadDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AppRootUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
