import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore, } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  items: Observable<any[]>;

  message : string;
  user : string;
  @ViewChild("messageInput") messageInput : ElementRef;
  @ViewChild("userInput") userInput : ElementRef;

  constructor(public db: AngularFirestore) {
    this.items = db.collection('chat').valueChanges();
  }

  sendMessage() {
    this.user = this.userInput.nativeElement.value;
    this.message = this.messageInput.nativeElement.value;
    this.db.collection('chat').add({message: this.message, user: this.user});
  }
}