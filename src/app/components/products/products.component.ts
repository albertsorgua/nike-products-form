import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent { 

  products: Product[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }

  search(term: string): void {
    // Si el término de búsqueda está vacío, mostrar todos los productos
    if (!term.trim()) {
      this.products = this.productService.getAllProducts();
      return;
    }

    // Filtrar los productos que coincidan con el término de búsqueda
    this.products = this.productService.getAllProducts().filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
