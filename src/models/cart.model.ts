import {Entity, hasMany, model, property} from '@loopback/repository';
import {CartItem} from './cart-item.model';

@model({settings: {strict: false}})
export class Cart extends Entity {
  @property({
    type: 'string',
    id: true,
    mongodb: {dataType: 'ObjectId'},
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  itemIds?: string[];

  @hasMany(() => CartItem, {keyTo: 'cartId'})
  cartItems: CartItem[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart;
