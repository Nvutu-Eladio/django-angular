import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

interface MemberResponse {
  id: number;
  name: string;
  surname: string;
  photo: string;
}

@Component({
  selector: 'app-new-member',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-member.component.html',
  styleUrl: './new-member.component.css',
})
export class NewMemberComponent {
  member = { name: '', surname: '', phone: '' };

  constructor(private api: ApiService, private appComponent: AppComponent) {}

  ngOnInit() {}

  save() {
    if (this.member) {
      this.api.saveNewMember(this.member).subscribe(
        (data: MemberResponse) => {
          // console.log(data);
          this.appComponent.members.push(data);
        },
        (error: any) => {
          console.log('Aconteceu um erro', error.message);
        }
      );
    } else {
      console.log('Nenhum membro selecionado para atualizar');
    }
  }
}
