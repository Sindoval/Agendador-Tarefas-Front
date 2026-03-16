import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface UserRegisterPayload {
  nome: string
  email: string
  senha: string
  enderecos?: [{
    rua: string,
    numero: number,
    complemento: string,
    cidade: string,
    estado: string,
    cep: string
  }],
  telefones?: [
    {
      numero: string,
      ddd: string
    }]
}

interface UserRegisterResponse {
  nome: string,
  email: string,
  senha: string,
  enderecos: [{
    rua: string,
    numero: number,
    complemento: string,
    cidade: string,
    estado: string,
    cep: string
  }] | null,
  telefones: [
    {
      numero: string,
      ddd: string
    }] | null,
  emailAnterior: string | null,
  novoToken: string | null
}

@Injectable({
  providedIn: 'root',
})
export class User {
  private API_URL = 'http://localhost:8084';

  constructor(private http: HttpClient) { }

  register(body: UserRegisterPayload): Observable<UserRegisterResponse> {
    return this.http.post<UserRegisterResponse>(`${this.API_URL}/usuario`, body)
  }
}
