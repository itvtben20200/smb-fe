import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { AddToCartSection } from '@/components/product/AddToCartSection';
import { ProductSections } from '@/components/product/ProductSections';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number | string;
  description?: string;
  images: string[];
  stock: number;
  features?: string[];
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await api.get(`/products/${slug}`);
    return res.data;
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const price = Number(product.price);

  return (
    <>
      {/* ── Hero section (constrained) ── */}
      <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-1">
        <Link href="/" className="hover:text-gray-700 transition">Home</Link>
        <span>/</span>
        <Link href="/#products" className="hover:text-gray-700 transition">Products</Link>
        <span>/</span>
        <span className="text-gray-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left — Image gallery */}
        <div className="space-y-4">
          {product.images?.[0] ? (
            <>
              <div className="rounded-2xl overflow-hidden bg-white border aspect-square">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <div key={i} className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border bg-white">
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl bg-gray-100 border aspect-square flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>

        {/* Right — Product details */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-gray-900">€{price.toFixed(2)}</span>
              <span className="text-gray-400 text-sm">/ per month</span>
            </div>
          </div>

          {/* Stock badge */}
          {product.stock === 0 ? (
            <span className="inline-flex items-center gap-1 text-sm text-red-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              Out of stock
            </span>
          ) : product.stock <= 10 ? (
            <span className="inline-flex items-center gap-1 text-sm text-orange-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
              Only {product.stock} left
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              In stock
            </span>
          )}

          {/* Description — each sentence as its own paragraph */}
          {product.description && (
            <div className="space-y-2">
              {product.description
                .split(/(?<=\.)(\s+)(?=[A-ZÄÖÜ])/)
                .filter((s) => s.trim().length > 2)
                .map((sentence, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed text-sm">{sentence.trim()}</p>
                ))}
            </div>
          )}

          {/* Features list */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Was ist enthalten</h3>
              <ul className="space-y-2">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 text-green-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            </div>
          )}

          {/* Add to cart / Buy now — client component */}
          <AddToCartSection product={{ id: product.id, name: product.name, price, images: product.images, stock: product.stock }} />
        </div>
      </div>
      </div>

      {/* ── Sections 3–7 (full-width capable) ── */}
      <ProductSections slug={product.slug} features={product.features ?? []} />
    </>
  );
}
