import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterOutlet,
} from '@angular/router';
import { ApiService } from './api.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

interface Member {
  id: number;
  name: string;
  surname: string;
  phone: number;
}

@Component({
  selector: 'app-members-detail',
  standalone: true,
  imports: [NgFor, RouterOutlet, FormsModule],
  templateUrl: './members-detail.component.html',
  styleUrl: './members-detail.component.css',
})
export class MembersDetailComponent implements OnInit {
  selected_member: Member = { id: 0, name: '', surname: '', phone: 0 }; // Inicialização com um objeto vazio
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private appComponent: AppComponent
  ) {}
  // selected_member: Member | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      const idString = param.get('id');
      if (idString !== null) {
        const id = parseInt(idString, 10);
        if (!isNaN(id)) {
          this.loadMember(id);
        } else {
          console.log('Formato de ID inválido');
        }
      } else {
        console.log('ID é nulo');
      }
    });
  }

  loadMember(id: number) {
    // const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const numericId = Number(id);
      if (!isNaN(numericId)) {
        this.api.getMember(numericId).subscribe(
          (data: Member) => {
            // console.log(data);
            this.selected_member = data;
          },
          (error) => {
            console.log('Erro', error.message);
          }
        );
      } else {
        console.log('Formato de ID inválido');
      }
    } else {
      console.log('ID é nulo');
    }
  }
  update() {
    if (this.selected_member) {
      this.api.updateMember(this.selected_member).subscribe(
        (data) => {
          this.selected_member = data;
        },
        (error) => {
          console.log('Aconteceu um erro', error.message);
        }
      );
    } else {
      console.log('Nenhum membro selecionado para atualizar');
    }
  }

  newMember() {
    this.router.navigate(['new-member']);
  }

  delete() {
    if (this.selected_member) {
      this.api.deleteMember(this.selected_member.id).subscribe(
        () => {
          const index = this.appComponent.members.findIndex(
            (member) => member.id === this.selected_member.id
          );
          if (index !== -1) {
            this.appComponent.members.splice(index, 1);
          } else {
            console.log('Membro não encontrado na lista');
          }
        },
        (error: { message: any }) => {
          console.log('Aconteceu um erro', error.message);
        }
      );
    } else {
      console.log('Nenhum membro selecionado para excluir');
    }
  }
}
