import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ApiService } from './api.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NgFor, RouterOutlet],
})
export class AppComponent {
  title = 'members-front';

  members = [
    {
      name: 'Member 01',
      id: 1,
      surname: 'Ciclano',
      photo: 'http://www.minhaapp.com/photo1',
    },
    {
      name: 'Member 02',
      id: 2,
      surname: 'Beltrano',
      photo: 'http://www.minhaapp.com/photo2',
    },
    {
      name: 'Member 03',
      id: 3,
      surname: 'Fulano',
      photo: 'http://www.minhaapp.com/photo3',
    },
  ];
  //Chamando o api server
  constructor(private api: ApiService) {
    this.getMembers();
  }
  // Trazendo de forma dinamica os dados da api
  getMembers = () => {
    this.api.getAllMembers().subscribe(
      (data) => {
        this.members = data;
      },
      (error) => {
        console.log('Error', error.message);
      }
    );
  };

  memberClicked = (member: { id: number }) => {
    this.api.getMember(member.id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log('Error', error.message);
      }
    );
  };
}
