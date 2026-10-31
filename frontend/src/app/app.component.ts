
import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from './services/producto.service';
import { AuthService, Usuario } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  productos: Producto[] = [];
  cargando = false;
  error = '';
  mensaje = '';

  nuevoProducto: Producto = this.productoVacio();
  productoEditandoId: string | null = null;
  productoEditado: Producto = this.productoVacio();

  usuario: Usuario | null = null;
autenticado = false;
esAdmin = false;

correo = '';
password = '';
errorLogin = '';

constructor(
  private productoService: ProductoService,
  private authService: AuthService
) {
  this.usuario = this.authService.obtenerUsuario();
  this.autenticado = this.authService.estaAutenticado();
  this.esAdmin = this.authService.esAdministrador();
}

ngOnInit(): void {
  if (this.autenticado) {
    this.cargarProductos();
  }
}

// Iniciar sesión
iniciarSesion(): void {
  this.errorLogin = '';

  this.authService.iniciarSesion(
    this.correo,
    this.password
  ).subscribe({
    next: (respuesta) => {
      this.usuario = respuesta.usuario;
      this.autenticado = true;
      this.esAdmin = respuesta.usuario.rol === 'admin';

      this.correo = '';
      this.password = '';

      this.cargarProductos();
    },
    error: (err) => {
      this.errorLogin =
        err.error?.mensaje ||
        'No se pudo iniciar sesión. Verifica tus credenciales.';
    }
  });
}

// Cerrar sesión
cerrarSesion(): void {
  this.authService.cerrarSesion();

  this.usuario = null;
  this.autenticado = false;
  this.esAdmin = false;

  this.productos = [];
  this.mensaje = '';
  this.error = '';
  this.errorLogin = '';
}

  productoVacio(): Producto {
    return {
      nombre: '',
      categoria: '',
      precio: 0,
      stock: 0,
      descripcion: ''
    };
  }

  cargarProductos(): void {
    this.cargando = true;
    this.error = '';

    this.productoService.obtenerProductos().subscribe({
      next: (datos) => {
        this.productos = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar los productos.';
        this.cargando = false;
      }
    });
  }

  registrarProducto(): void {
    this.error = '';
    this.mensaje = '';

    this.productoService.crearProducto(this.nuevoProducto).subscribe({
      next: () => {
        this.mensaje = 'Producto registrado correctamente.';
        this.nuevoProducto = this.productoVacio();
        this.cargarProductos();
      },
      error: (err) => {
        console.error(err);
        this.error = err.error?.error || 'No se pudo registrar el producto.';
      }
    });
  }
  
editarProducto(producto: Producto): void {
  if (!producto._id) {
    return;
  }

  this.productoEditandoId = producto._id;
  this.productoEditado = { ...producto };
  this.mensaje = '';
  this.error = '';
}

cancelarEdicion(): void {
  this.productoEditandoId = null;
  this.productoEditado = this.productoVacio();
}

guardarEdicion(): void {
  if (!this.productoEditandoId) {
    return;
  }

  this.error = '';
  this.mensaje = '';

  this.productoService.actualizarProducto(
    this.productoEditandoId,
    this.productoEditado
  ).subscribe({
    next: () => {
      this.mensaje = 'Producto actualizado correctamente.';
      this.cancelarEdicion();
      this.cargarProductos();
    },
    error: (err) => {
      console.error(err);
      this.error = err.error?.error || 'No se pudo actualizar el producto.';
    }
  });
}

eliminarProducto(producto: Producto): void {
  if (!producto._id) {
    return;
  }

  const confirmar = window.confirm(
    `¿Estás seguro de eliminar "${producto.nombre}"?`
  );

  if (!confirmar) {
    return;
  }

  this.error = '';
  this.mensaje = '';

  this.productoService.eliminarProducto(producto._id).subscribe({
    next: () => {
      this.mensaje = 'Producto eliminado correctamente.';
      this.cargarProductos();
    },
    error: (err) => {
      console.error(err);
      this.error = 'No se pudo eliminar el producto.';
    }
  });
}

}
