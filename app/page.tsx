import { api } from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';

import { HeroBanner } from '@/components/layout/HeroBanner';
import { Testimonials } from '@/components/marketing/Testimonials';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { FooterSection } from '@/components/marketing/FooterSection';

async function getProducts() {
  try {
    const res = await api.get('/products?limit=12');
    return res.data.products;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <HeroBanner />

      <div className="max-w-6xl mx-auto px-4">
        <section id="products" className="mb-10 scroll-mt-6">
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-500">Free shipping on orders over €50 · Secure checkout · Auto account creation</p>
        </section>

        {products.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No products available yet.</p>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p: {
              id: string; slug: string; name: string;
              price: string; description?: string; images: string[]; stock: number;
            }) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </section>
        )}
      </div>

      {/* --- Marketing Sections from Concept A --- */}
      <div className="max-w-6xl mx-auto px-4">
        <Testimonials />
      </div>
      <CtaBanner />
      <FooterSection />
    </>
  );
}
