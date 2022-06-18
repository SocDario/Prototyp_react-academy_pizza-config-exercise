/** @jsxImportSource @emotion/react */
import styles from './Configurator.styles';
import React, { useEffect, useState } from 'react';
import { Discount, Header } from 'shared';
import { Footer, SizeSelector, Topping } from 'modules/configurator';
import {
  baconIcon,
  chilliIcon,
  cornIcon,
  eggIcon,
  meatIcon,
  pineappleIcon,
  shroomsIcon,
  deleteIcon,
} from './assets';

export const Configurator: React.FC = () => {
  const toppingData = [
    {
      id: 1,
      name: 'Chilli',
      img: chilliIcon,
      price: 1,
    },
    {
      id: 2,
      name: 'Corn',
      img: cornIcon,
      price: 1,
    },
    {
      id: 3,
      name: 'Egg',
      img: eggIcon,
      price: 1.5,
    },
    {
      id: 4,
      name: 'Pineapple',
      img: pineappleIcon,
      price: 1.5,
    },
    {
      id: 5,
      name: 'Meat',
      img: meatIcon,
      price: 2,
    },
    {
      id: 6,
      name: 'Shrooms',
      img: shroomsIcon,
      price: 1.5,
    },
    {
      id: 7,
      name: 'Bacon',
      img: baconIcon,
      price: 2.5,
    },
  ];
  const pizzaSizeData = [
    {
      id: 1,
      size: 'S',
      price: 10,
    },
    {
      id: 2,
      size: 'M',
      price: 15,
    },
    {
      id: 3,
      size: 'L',
      price: 20,
    },
  ];
  const discountData = [
    {
      discountId: 'discount50',
      discountValue: 0.5,
    },
    {
      discountId: 'discount10',
      discountValue: 0.1,
    },
  ];

  const [toppingSum, setToppingSum] = useState<number>(0);
  const [sizePrice, setSizePrice] = useState<number>(10);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [isValidDiscount, setIsValidDiscount] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<string>('');
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  function toppingsSum(sum: number) {
    setToppingSum(toppingSum + sum);
  }

  function sizeSum(sum: number) {
    setSizePrice(sum);
  }

  function discountSum(sum: number, isValid: boolean, message: string) {
    setDiscountValue(sum);
    setIsValidDiscount(isValid);
    setInfoMessage(message);
  }

  function handleImgClick() {
    if (isValidDiscount) {
      setInfoMessage('');
      setDiscountValue(0);
      return;
    }
    setInfoMessage('');
  }

  useEffect(() => {
    const pizzaCost = sizePrice + toppingSum;
    const discountTotal = pizzaCost * discountValue;
    setCurrentPrice(pizzaCost - discountTotal);
  }, [discountValue, toppingSum, sizePrice]);

  return (
    <div css={styles.wrapper}>
      <Header />
      <h1>Toppings! Toppings!</h1>
      <Topping topping={toppingData} onChange={toppingsSum} />
      <p css={styles.total__price}>Total price +${toppingSum}</p>
      <h1>Pizza! Pizza! size</h1>
      <SizeSelector sizes={pizzaSizeData} onChange={sizeSum} />
      <h1>Get the discount</h1>
      <Discount discounts={discountData} onChange={discountSum} />
      <div css={styles.discount__container(isValidDiscount)}>
        <p>{infoMessage}</p>
        <img
          src={infoMessage === '' ? '' : deleteIcon}
          onClick={handleImgClick}
        />
      </div>
      <Footer currentPrice={currentPrice} />
    </div>
  );
};
