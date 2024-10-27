import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";

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
            const cartsFound = carts.find((c) => c.id === id);
            if (!cartsFound) throw new Error('product not found');
            return cartsFound;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const cartManager = new CartManager(path.join(process.cwd(), "src/data/carts.json"));