import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity) private rep: Repository<ProductEntity>,
    ) {}
    async getAllProducts(): Promise<ProductEntity[]> {
        return await this.rep.find();
    }
    
    async getProduct(_id: number): Promise<ProductEntity[]> {
        return await this.rep.findByIds([_id]);
    }
    
    async createProduct(product: ProductEntity) {
        await this.rep.insert(product);
    }
    
    async updateProduct(product: ProductEntity) {
        await this.rep.update({ id: product.id }, product);
    }
    
    async deleteProduct(product: ProductEntity){
        await this.rep.delete(product);
    }


}
