'use client';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

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
      {/* Product image */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
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
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-semibold text-gray-900 mb-1">{product.name}</h2>
        {product.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{product.description}</p>
        )}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">€{price.toFixed(2)}</span>
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
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex-1 bg-gray-900 text-white text-sm py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
