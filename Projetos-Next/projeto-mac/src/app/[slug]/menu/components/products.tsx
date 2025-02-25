"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductsProps {
    products: Product[]
}

const Products = ({products}: ProductsProps) => {
    const {slug} = useParams<{slug: string}>()
    return ( 
        <div className="space-y-3 px-5 py-3">
            {products.map((product, index) => (
                <Link href={`/${slug}/menu/${product.id}`} className="flex items-center justify-between gap-10 py-3 border-b" key={index}>
                    <div>
                        <h3 className="text-sm font-medium">
                            {product.name}
                        </h3>
                        <p className="line-clamp-2 text-sm text-muted-foref">
                            {product.description}
                        </p>
                        <p className="pt-3 text-sm font-semibold">{Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: 'BRL'
                        }).format(product.price)}</p>
                    </div>

                        <div className="relative min-h-[82px] min-w-[120px]">
                            <Image src={product.imageUrl} alt={product.name} fill className="rounded-lg object-contain" />
                        </div>
                </Link>
            ))}
        </div>
     );
}
 
export default Products;