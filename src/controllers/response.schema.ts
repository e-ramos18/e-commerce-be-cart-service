import {getModelSchemaRef} from '@loopback/rest';
import {Cart} from '../models';

export const cartResponseSchema = {
  createCart: {
    description: 'Cart model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(Cart, {includeRelations: true}),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  fetchCart: {
    description: 'Cart model instance',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            data: getModelSchemaRef(Cart, {includeRelations: true}),
            message: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};
