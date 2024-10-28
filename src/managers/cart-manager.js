import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { productsManager } from './products-manager.js';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart() {
        try {
            const cart = {
                id: uuidv4(),
                products: [],
            };
        const cartsFile = await this.getAllCarts();
        cartsFile.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
        return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                return carts ? JSON.parse(carts) : [];
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCartById (id){
        try {
            const carts = await this.getAllCarts();
            const cartFound = carts.find((c) => c.id === id);
            if (!cartFound) throw new Error('cart not found');
            return cartFound;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // async addToCart (cartId, prodId){
    //     try {
    //         const existingProd = await productsManager.getProdById(prodId); 
    //         if(!existingProd) throw new Error ('product does not exist');
    //         const existingCart = await this.getCartById(cartId);
    //         if(!existingCart) throw new Error ('cart does not exist');
    //         const carts =  await this.getAllCarts();
    //         const prodInCart = existingCart.products.find(p => p.id === prodId);
    //         if(!prodInCart) {
    //             const prod = {
    //                 id : prodId,
    //                 quantity: 1
    //             }
    //             existingCart.products.push(prod);
    //         }else existingCart.quantity += 1;

    //         const updatedCarts = carts.map(cart => {
    //             if(cart.id === cartId) return existingCart;
    //             return cart;
    //         })

    //         await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
    //         return existingCart;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    async addToCart (cartId, prodId) {
        const product = await productsManager.getAllProd();
        if (!product) throw new Error('Product does not exist');

        const carts =  await this.getAllCarts();

        const cart = carts.find(c => c.id === cartId);
        if(!cart) throw new Error('Cart does not exist');

        const prodInCart = cart.products.find(p => p.id === prodId);
        if(!prodInCart){
            const prod = {
                id: prodId,
                quantity: 1
            }
            cart.products.push(prod);
        }else prodInCart.quantity += 1;

        await fs.promises.writeFile(this.path, JSON.stringify(carts));
        return cart;
    }


}

export const cartManager = new CartManager(path.join(process.cwd(), 'src/data/carts.json'));