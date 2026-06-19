'use client';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
}

export function AddToCartSection({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0],
    });
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0],
    });
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col gap-3 pt-2">
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="w-full border-2 border-gray-900 text-gray-900 font-medium py-3 rounded-xl hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Get this Solution
      </button>
      <button
        onClick={handleBuyNow}
        disabled={product.stock === 0}
        className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Start with this Plan
      </button>
    </div>
  );
}
