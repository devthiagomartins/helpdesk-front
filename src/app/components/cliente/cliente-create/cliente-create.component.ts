import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente : Cliente = {
    id:'',
    nome:'',
    cpf:'',
    email:'',
    senha:'',
    perfis: [],
    dataCriacao: ''
  }

  nome : FormControl = new FormControl(null,[Validators.minLength(3), Validators.required]);
  cpf : FormControl = new FormControl(null,Validators.required);
  email : FormControl = new FormControl(null,[Validators.email, Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]);
  senha : FormControl = new FormControl(null,Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router

  ) { 

  }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.nome.valid && 
    this.cpf.valid && 
    this.email.valid && 
    this.senha.valid;
  }

  create() : void {
    this.service.create(this.cliente).subscribe(() => {
      this.toast.success('Cliente cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['clientes']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message,ex.error.message);
          console.log(ex)
        });
      } else {
        this.toast.error(ex.error.message, ex.error.error);
        console.log(ex)
      }
    });
  }

  addPerfil(perfil: any): void {
    
    if(this.cliente.perfis.includes(perfil)){
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil),1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

}
