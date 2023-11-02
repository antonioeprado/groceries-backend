import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDTO } from './dto/find-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post('/families')
  async findAllByFamily(@Body() findFamilyDto: FindProductsDTO) {
    const productsArray: any[] = [];
    for (const id of findFamilyDto.familyIds) {
      const result = await this.productsService.findAllByFamilyId(+id);
      productsArray.push(
        result.map((product) => {
          return {
            id: product.id,
            name: product.name,
            familyName: product.List.Owner.Family?.name,
            userName: product.Member.Member.name,
            createdAt: product.createdAt,
            familyId: product.List.Owner.Family?.id,
          };
        }),
      );
    }
    return productsArray.flat();
  }

  @Get('/user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.productsService.findAllByUserId(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
