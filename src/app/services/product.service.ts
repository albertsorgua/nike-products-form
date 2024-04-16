import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];

  constructor() { }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProduct(reference: string): Product {
    return this.products.find(product => product.reference === reference) as Product;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  updateProduct(product: Product): void {
    const index = this.products.findIndex(p => p.reference === product.reference);
    this.products[index] = product;
  }

  deleteProduct(reference: string): void {
    this.products = this.products.filter(product => product.reference !== reference);
  }

  productNameExists(name: string): boolean {
    return this.products.some(product => product.name === name);
  }

  productDescriptionExists(description: string): boolean {
    return this.products.some(product => product.description === description);
  }
}
