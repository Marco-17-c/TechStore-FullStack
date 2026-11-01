
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  rol: 'admin' | 'usuario';
}

export interface RespuestaLogin {
  mensaje: string;
  token: string;
  usuario: Usuario;
}

export interface RespuestaRegistro {
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://techstore-backend-34ob.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  iniciarSesion(
    correo: string,
    password: string
  ): Observable<RespuestaLogin> {

    return this.http.post<RespuestaLogin>(
      `${this.apiUrl}/login`,
      { correo, password }
    ).pipe(
      tap(respuesta => {
        sessionStorage.setItem('token', respuesta.token);
        sessionStorage.setItem(
          'usuario',
          JSON.stringify(respuesta.usuario)
        );
      })
    );
  }

  registrarUsuario(
    nombre: string,
    correo: string,
    password: string
  ): Observable<RespuestaRegistro> {

    return this.http.post<RespuestaRegistro>(
      `${this.apiUrl}/register`,
      { nombre, correo, password }
    );
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  obtenerToken(): string | null {
    return sessionStorage.getItem('token');
  }

  obtenerUsuario(): Usuario | null {
    const usuario = sessionStorage.getItem('usuario');

    return usuario ? JSON.parse(usuario) as Usuario : null;
  }

  esAdministrador(): boolean {
    return this.obtenerUsuario()?.rol === 'admin';
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
}
