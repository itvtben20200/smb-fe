'use client';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number | string;
  description?: string;
  images: string[];
  stock: number;
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  const price = Number(product.price);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price,
      quantity: 1,
      image: product.images?.[0],
    });
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price,
      quantity: 1,
      image: product.images?.[0],
    });
    router.push('/checkout');
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col">
      {/* Product image — links to product page */}
      <Link href={`/products/${product.slug}`} className="relative h-52 bg-gray-100 overflow-hidden block">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </Link>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`} className="hover:underline">
          <h2 className="font-semibold text-gray-900 mb-1">{product.name}</h2>
        </Link>
        {product.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{product.description}</p>
        )}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-gray-900">€{price.toFixed(2)}</span>
            <span className="text-xs text-gray-400 font-normal">/ per month</span>
          </div>
          {product.stock <= 10 && product.stock > 0 && (
            <span className="text-xs text-orange-500 font-medium">Only {product.stock} left</span>
          )}
          {product.stock === 0 && (
            <span className="text-xs text-red-500 font-medium">Out of stock</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 border border-gray-900 text-gray-900 text-sm py-2 rounded-lg hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Get this Solution
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex-1 bg-gray-900 text-white text-sm py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Start with this Plan
          </button>
        </div>
      </div>
    </div>
  );
}
