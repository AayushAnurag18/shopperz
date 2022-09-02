import React, { useState } from "react";
import Nav from "../Components/nav";
import Image from "next/image";
import landingimg from "../Assets/bggg.jpg";
import Head from "next/head";
import Link from "next/link";
import Footer from "../Components/footer";
import { useSession } from "next-auth/react";

export default function Home() {
  const data = useSession();

  return (
    <>
      <Nav />
      <div>
        <div className="fixed">
          <Image src={landingimg} alt="" />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center absolute top-[50%] right-[3rem] -translate-x-1/2 -translate-y-1/2 ">
          <h1 className="bg-black text-white text-3xl w-[24rem] p-6 text-center font-extrabold rounded-xl">
            Books we have...📚📕
          </h1>
          <Link href={"/products?category=finance"}>
            <a className="bg-orange-500 hover:scale-[1.2] hover:bg-orange-600 ease-in duration-300 text-white text-3xl w-[16rem] p-4 py-6 text-center font-bold rounded-xl">
              Finance Books
            </a>
          </Link>

          <Link href={"/products?category=comic"}>
            <a className="bg-white hover:scale-[1.2] text-blue-900 ease-in duration-300 text-3xl w-[16rem] p-4 py-6 text-center font-bold rounded-xl">
              Comic Books
            </a>
          </Link>

          <Link href={"/products?category=Fantasy"}>
            <a className="bg-green-700 hover:scale-[1.2] hover:bg-green-900 ease-in duration-300 text-white text-3xl w-[16rem] p-4 py-6 text-center font-bold rounded-xl">
              Fantasy Books
            </a>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
