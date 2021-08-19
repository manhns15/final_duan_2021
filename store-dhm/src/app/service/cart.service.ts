import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Subject } from 'rxjs';
import { CartItem } from '../model/cart-item';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cartItems: CartItem[] = [];
    totalPrice: Subject<number> = new Subject<number>();
    totalQty: Subject<number> = new Subject<number>();
    constructor(
    ) { }
    addCart(obj: any, arr: any[] ) {
      // tslint:disable-next-line:one-variable-per-declaration
      if (arr === null){
        this.cartItems.push(obj);
        localStorage.setItem('Cart', JSON.stringify(this.cartItems));
      }else{
        arr.push(obj);
        localStorage.setItem('Cart', JSON.stringify(arr));
      }
      this.CartTotal();
    }
    // tinh tong va so luong
    CartTotal() {
        const listDataCart = JSON.parse(localStorage.getItem('Cart')!);
        console.log('listDataCart', listDataCart);
        let totalPriceValue = 0;
        let totalQtyValue = 0;
        if (listDataCart) {
          for (const item of listDataCart) {
            totalPriceValue += item.priceProductDetail * item.product.priceProduct;
            totalQtyValue += item.priceProductDetail;
          }
          this.totalQty.next(totalQtyValue);
          this.totalPrice.next(totalPriceValue);
          this.logCartData(totalPriceValue, totalQtyValue);
        }
    }
    logCartData(totalPriceValue: number, totalQuantityValue: number) {
      const listDataCart = JSON.parse(localStorage.getItem('Cart')!);
      for (const items of listDataCart) {
            const subTotalPrice = items.quantityProduct * items.product.priceProduct;
            console.log(`name: ${items.id}, quantity=${items.quantityProduct}, unnitPrice=${items.product.priceProduct} , subTotalPrice=${subTotalPrice}`);

        }
      console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
      console.log('-----------');
    }
    addQuantity(theCartItem: any, arr: any) {
      if (arr.length > 0){
        arr.map((e: any) => {
          if (e.id === theCartItem.id){
            // tslint:disable-next-line:no-unused-expression label-position
            priceProductDetail : theCartItem.priceProductDetail++;
          }
        });
      }
      console.log('arr', arr);
      // console.log('theCartItem', theCartItem);
      localStorage.setItem('Cart', JSON.stringify(arr));
    }
    decrementQuantity(theCartItem: any, arr: any) {
      if (arr.length > 0){
        arr.map((e: any) => {
          if (e.id === theCartItem.id){
            // tslint:disable-next-line:no-unused-expression label-position
            priceProductDetail : theCartItem.priceProductDetail--;
          }
        });
      }
      localStorage.setItem('Cart', JSON.stringify(arr));
    }
}

