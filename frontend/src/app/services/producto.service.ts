
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  _id?: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'https://techstore-backend-34ob.onrender.com/api/productos';
  
  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  obtenerProductoPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto: Producto): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto);
  }

  actualizarProducto(
    id: string,
    producto: Partial<Producto>
  ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
