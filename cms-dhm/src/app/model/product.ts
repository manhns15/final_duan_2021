export class Product {
    id: number;
    nameproduct: string;
    price: number;
    image: string;
    status: number;
    size: any;

    constructor(id: any, nameproduct: any, price: any, image: any, status: any, size: any) {
        this.id = id;
        this.nameproduct = nameproduct;
        this.price = price;
        this.image = image;
        this.status = status;
        this.size = size;
    }
}