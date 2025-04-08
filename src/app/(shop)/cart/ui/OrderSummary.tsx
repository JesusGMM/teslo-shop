"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [summary, setSummary] = useState({
    itemsInCart: 0,
    subTotal: 0,
    tax: 0,
    total: 0
  });
  
  useEffect(() => {
    const { itemsInCart, subTotal, tax, total } = useCartStore.getState().getSummaryInformation();
    setSummary({ itemsInCart, subTotal, tax, total });
    if (itemsInCart === 0)
      router.replace('/empty');
    
    setLoaded(true);

  }, []);
  

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {summary.itemsInCart === 1 ? "1 artículo" : `${summary.itemsInCart} artículos`}
      </span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(summary.subTotal)}</span>

      <span>Impuestos (19%)</span>
      <span className="text-right">{currencyFormat(summary.tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(summary.total)}</span>
    </div>
  );
};
