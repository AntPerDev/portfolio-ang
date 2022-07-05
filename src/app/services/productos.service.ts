import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise<void>((resolve, reject) => {

      this.http.get('https://angular-html-5c002-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });


    });





  }


  getProducto(id: string) {

    return this.http.get(`https://angular-html-5c002-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`);

  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      //cargar productos
      this.cargarProductos().then( () => {
        // Ejecutar despues de tener los productos
        // Aplicar filtro
        this.filtrarProductos(termino);
      });

    } else {
      //aplicar el filtro
      this.filtrarProductos(termino);

    }

    


    console.log(this.productosFiltrado);

  }



  private filtrarProductos( termino:string ) {

    console.log(this.productos);

    //purgar el array para que no se queden pegadas busquedas anteriores
    this.productosFiltrado=[];

    //Hacer que el termino sea case insensitive
    termino=termino.toLowerCase();

    
    this.productos.forEach( prod => {
      
      const tituloLower = prod.titulo.toLowerCase();

      if( prod.categoria.indexOf(termino)>=0 || tituloLower.indexOf(termino)>=0 ){
        this.productosFiltrado.push( prod );
      }
    })

  }
}
