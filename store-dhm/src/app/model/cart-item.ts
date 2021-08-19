import { Product } from './product';

export class CartItem {
    id: number;
    nameproduct: string;
    image: string;
    quantity: number;
    price: number;
    size: any;
    forEach: any;

    constructor(product: Product) {
        this.id = product.id;
        this.nameproduct = product.nameproduct;
        this.image = product.image;
        this.price = product.price;
        this.quantity = 1;
        this.size = product.size;
    }
}
