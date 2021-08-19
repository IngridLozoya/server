import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductEntity } from './product.entity';
import { ProductsService } from './products.service';
import { diskStorage } from 'multer';
import { customName } from 'src/utils/custoName';

@Controller('products')
export class ProductsController {
    constructor(private service: ProductsService) {}

    @Get()
    getAllProducts(){
        return this.service.getAllProducts()
    }

    @Get('.id')
    getProduct(@Param() params){
        return this.service.getProduct(params.id)
    }
    
    @Post()
    addProduct(@Body() product: ProductEntity) {
        return this.service.createProduct(product);
    }

    @Post('udpload')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './avatars',
          filename: customName,
        }),
      }),
    )
    async uploadFile(@Body() user: ProductEntity, @UploadedFile() file) {
      await this.service.createProduct(JSON.parse(JSON.stringify(user)));
  
      const response = {
        originalName: file.originalName,
        finalName: file.filename,
      };
      return {
        status: HttpStatus.OK,
        message: 'image has been uploaded',
        data: response,
      };
    }

    @Put()
    updateProduct(@Body() product: ProductEntity){
        return this.service.updateProduct(product);
    }

    @Delete('.id')
    deleteProduct(@Param() params){
        return this.service.deleteProduct(params.id);
    }

    
}
