import React, { useEffect, useState } from "react";
import Footer from "../../Components/footer";
import Nav from "../../Components/nav";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

const Product = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/product");
    const { result } = await res.json();
    const categories = [...new Set(result.map((e) => e.category))];
    const { category } = router.query;

    if (category)
      categories = categories.filter(
        (e) => e.toLowerCase() === category.toLowerCase()
      );

    setProducts(result);
    setCategories(categories);
  };

  useEffect(() => {
    router.isReady && fetchProducts();
  }, [router]);

  return (
    <>
      <Nav />

      {categories?.map((category) => (
        <React.Fragment key={category}>
          <h1 className=" text-center mx-12 font-extrabold text-4xl m-2 mt-20">
            {category}
          </h1>

          <div className="grid grid-cols-3 justify-center justify-items-center my-4">
            {products
              .filter((e) => e.category === category)
              .map((product) => (
                <div
                  key={product._id}
                  className="w-[22rem] flex flex-col items-center gap-2  bg-white p-3 rounded-xl shadow-2xl m-2 "
                >
                  <Link href={`/products/${product._id}`}>
                    <img
                      className="w-[16rem] aspect-square object-contain cursor-pointer "
                      src={JSON.parse(product.image)[0]}
                    />
                  </Link>
                  <p className="font-semibold text-center">{product.name}</p>
                  <p className="text-red-900 font-semibold">
                    &#8377;{product.price}
                  </p>
                  <button
                    className="bg-white text-black  p-2 px-3 hover:scale-[1.2] active:scale-95 font-semibold transition-all duration-300 rounded-xl border-t-2 border-b-2 border-red-800 "
                    onClick={() => {
                      if (session) {
                        router.push(
                          `/products/checkout?productid=${product._id}&quantity=1`
                        );
                      } else {
                        signIn();
                      }
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              ))}
          </div>
        </React.Fragment>
      ))}

      <div className="h-24 m-16 p-4 grid place-items-center">
        <h1 className="text-2xl font-extrabold p-2">
          {categories
            ? categories.length > 0
              ? ""
              : "Oops we don't have this category yet"
            : "Loading..."}
        </h1>
      </div>

      <Footer />
    </>
  );
};

export default Product;
