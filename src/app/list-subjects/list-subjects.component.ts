import { Component, OnInit } from '@angular/core';
import {TalkModal} from '../payload/TalkModal';
import {TalkserviceService} from '../services/talkservice.service';
import {throwError} from 'rxjs';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../shared/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationMessage} from '../payload/ConfirmationMessage';

@Component({
  selector: 'app-list-subjects',
  templateUrl: './list-subjects.component.html',
  styleUrls: ['./list-subjects.component.css']
})
export class ListSubjectsComponent implements OnInit {

  subtalk$: Array<TalkModal> = [];
  @BlockUI() blockUI: NgBlockUI;
  data: ConfirmationMessage;
  constructor(private talkService: TalkserviceService,
              private toasterService: ToastrService,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.data = {
      title : 'Are you sure want to Delete the Subject?',
      message : 'Deleting the subject will delete all the associated Posts and its corresponding data.'
    };
    this.blockUI.start();
    this.talkService.getAllTalks().subscribe( talks => {
        this.subtalk$ = talks;
        this.blockUI.stop();
      },
      error => {
        throwError(error);
        this.blockUI.stop();
      });
  }


  deleteSubject(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      data: this.data,
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.talkService.deleteSubject(id).subscribe(
          data => {
            this.talkService.getAllTalks().subscribe( talks => {
                this.subtalk$ = this.subtalk$.slice();
                this.subtalk$ = talks;
              },
              error => {
                this.toasterService.error(error.error.message);
              });
          }, error => {
            this.toasterService.error(error.error.message);
          }
        );
      }
    });
  }
}
