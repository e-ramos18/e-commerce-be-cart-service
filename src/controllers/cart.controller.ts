import {repository} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Cart} from '../models';
import {CartRepository} from '../repositories';
import {CustomResponse} from '../types';
import {responseMessage} from '../utils/constants';
import {tryCatch} from '../utils/helpers';
import {cartResponseSchema} from './response.schema';

export class CartController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
  ) {}

  @post('/carts')
  @response(200, cartResponseSchema.createCart)
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCart',
            exclude: ['id'],
          }),
        },
      },
    })
    cart: Omit<Cart, 'id'>,
  ): Promise<CustomResponse<{}>> {
    return tryCatch(
      async () => {
        return this.cartRepository.create(cart);
      },
      null,
      responseMessage.cartCreated,
    );
  }

  @get('/carts/{userId}/user')
  @response(200, cartResponseSchema.fetchCart)
  async findByUserId(
    @param.path.string('userId') userId: string,
  ): Promise<CustomResponse<{}>> {
    return tryCatch(
      async () => {
        return this.cartRepository.findOne({
          where: {
            userId: userId,
          },
        });
      },
      null,
      responseMessage.cartFetched,
    );
  }

  @del('/carts/{id}')
  @response(204, {
    description: 'Cart DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cartRepository.deleteById(id);
  }
}
