'use client';

import { ProductType } from '@/types/ProductType';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { useAddCartItemMutation } from '../store/apiSlice';
import React from 'react';
import { CartItemBackendType, CartItemType } from '@/types/CartItemType';
import { addCartItemToLocalStorage } from '@/util/cart-item-utils';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface AddToCartType extends ProductType {
  quantity: number;
}

export default function AddToCart({
  id,
  name,
  description,
  image,
  unit_amount,
  currency,
  quantity,
}: AddToCartType) {
  const { paymentIntentId } = useSelector(
    (state: RootState) => state.stripeReducer
  );
  //TODO: implement the use of session rather than send a request to back-end to response an error response
  const session = useSession();
  const [addCartItem, { isLoading }] = useAddCartItemMutation();

  const handleAddToCart = async () => {
    const cartItem: CartItemType = {
      name,
      description,
      image,
      currency,
      unit_amount,
      quantity,
      stripeProductId: id,
    };

    const cartItemBackend: CartItemBackendType = {
      ...cartItem,
      paymentIntentId,
    };
    try {
      if (session.status === 'unauthenticated') {
        addCartItemToLocalStorage(cartItem);
      } else {
        await addCartItem(cartItemBackend).unwrap();
      }
    } catch (err) {
      if (err) console.error(err);
    }
  };

  return (
    <button onClick={() => handleAddToCart()} disabled={isLoading}>
      Add To Cart
    </button>
  );
}
