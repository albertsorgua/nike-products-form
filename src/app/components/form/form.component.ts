import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormComponent {

  constructor(private productService: ProductService) { }

  nameExists: boolean = false;
  descriptionExists: boolean = false;

  categories: string[] = ['Shoes', 'Clothes', 'Accessories'];

  productForm = new FormGroup({
    reference: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9]*')]),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9 ]*')]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', Validators.maxLength(200)),
    category: new FormControl('', Validators.required),
    sale: new FormControl(false),
    image: new FormControl(),
  });

  onSubmit() {
    const reference = this.productForm.value.reference;

    if (reference) {
      const existingProduct = this.productService.getProduct(reference);

      if (existingProduct) {
        existingProduct.name = this.productForm.value.name ? this.productForm.value.name : ' ';
        existingProduct.price = parseFloat(!!this.productForm.value.price ? this.productForm.value.price.toString() : '0');
        existingProduct.description = this.productForm.value.description ? this.productForm.value.description : ' ';
        existingProduct.category = this.productForm.value.category ? this.productForm.value.category : ' ';
        existingProduct.sale = typeof this.productForm.value.sale === 'string' ? (this.productForm.value.sale === 'true') : !!this.productForm.value.sale;
        existingProduct.image = this.productForm.value.image ? this.productForm.value.image : ' ';

        this.productService.updateProduct(existingProduct);
      } else {
        const newName = this.productForm.value.name ?? '';
        const newDescription = this.productForm.value.description ?? '';

        if (this.productService.productNameExists(newName)) {
          this.nameExists = true;
          console.error('Error: Name already exists.');
          return;
        }
  
        if (this.productService.productDescriptionExists(newDescription)) {
          this.descriptionExists = true;
          console.error('Error: Description already exists.');
          return;
        }

        const newProduct: Product = {
          reference: reference,
          name: newName ? newName : ' ',
          price: parseFloat(!!this.productForm.value.price ? this.productForm.value.price.toString() : '0'),
          description: newDescription ? newDescription : ' ',
          category: this.productForm.value.category ? this.productForm.value.category : ' ',
          sale: typeof this.productForm.value.sale === 'string' ? (this.productForm.value.sale === 'true') : !!this.productForm.value.sale,
          image: this.productForm.value.image ? this.productForm.value.image : ' '
        };
        this.productService.addProduct(newProduct);
      }
      this.productForm.reset();
      this.nameExists = false;
      this.descriptionExists = false;
    }
  }
}