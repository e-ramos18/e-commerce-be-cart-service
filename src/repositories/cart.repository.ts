import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CartDataSource} from '../datasources';
import {Cart, CartRelations, CartItem} from '../models';
import {CartItemRepository} from './cart-item.repository';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype.id,
  CartRelations
> {

  public readonly cartItems: HasManyRepositoryFactory<CartItem, typeof Cart.prototype.id>;

  constructor(
    @inject('datasources.cart') dataSource: CartDataSource, @repository.getter('CartItemRepository') protected cartItemRepositoryGetter: Getter<CartItemRepository>,
  ) {
    super(Cart, dataSource);
    this.cartItems = this.createHasManyRepositoryFactoryFor('cartItems', cartItemRepositoryGetter,);
    this.registerInclusionResolver('cartItems', this.cartItems.inclusionResolver);
  }
}
