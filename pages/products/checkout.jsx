import React, { useEffect, useState } from "react";
import Nav from "../../Components/nav";
import Footer from "../../Components/footer";
import { useRouter } from "next/router";

const Checkout = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [buy, setBuy] = useState(true);

  const fetchData = async () => {
    const res = await fetch(`/api/product/${router.query.productid}`);
    const data = await res.json();

    if (res.status !== 200) return setData({ ...data, error: true });

    data.image = JSON.parse(data.image);
    data.description = JSON.parse(data.description);

    setData(data);
  };

  useEffect(() => {
    router.isReady && fetchData();
  }, [router]);

  if (!data) return null;

  return (
    <>
      <Nav />

      <div
        className={
          buy
            ? `hidden`
            : `bg-black grid place-items-center  m-auto my-40 p-8 w-[60%] gap-2 rounded-full text-2xl font-bold text-white`
        }
      >
        Order Placed Successfully.
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setBuy(false);
        }}
        className={
          buy
            ? `bg-red-200 grid text-black place-items-center m-auto my-40 p-8 w-[60%] gap-2 rounded-full`
            : `hidden`
        }
      >
        <h1 className="m-2 p-2 text-2xl font-bold place-items-start text-center">
          Fill up the Shipping Details for {data.name}
        </h1>
        <div className="flex gap-1 text-black">
          <input
            className="w-[25rem] rounded-lg  border-black border text-xl p-1 placeholder:px-2"
            placeholder="Full name "
            type="text"
            name="name"
            id="name"
            required
          />
          <input
            className="w-[25rem] rounded-lg border-black border text-xl p-1 placeholder:px-2"
            placeholder="Mobile Number "
            type="number"
            name=""
            id=""
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            className="w-[20rem] rounded-lg border-black border text-xl p-1 placeholder:px-2 "
            placeholder="House Number"
            type="text"
            name="address"
            id="address"
            required
          />
          <input
            className="w-[30rem] rounded-lg border-black border text-xl p-1 placeholder:px-2 "
            placeholder="Street/Landmark"
            type="text"
            name="address"
            id="address"
            required
          />
        </div>

        <div className="flex justify-evenly gap-2">
          <input
            className="w-[17rem] rounded-lg border-black border text-xl p-1 placeholder:pxbuysetOrderbuy(false)-2"
            placeholder="City"
            type="text"
            name="city"
            id="city"
            required
          />
          <input
            className="w-[16rem] rounded-lg border-black border text-xl p-1 placeholder:px-2"
            placeholder="State"
            type="text"
            name="state"
            id="state"
            required
          />
          <input
            className="w-[16rem] rounded-lg border-black border text-xl p-1 placeholder:px-2"
            placeholder="PinCode"
            type="number"
            name="pin"
            id="pin"
            required
          />
        </div>
        <div className="w-[50rem] flex justify-between p-4">
          <h1 className="text-xl font-semibold">
            Payment Method: <span className="text-blue-700 font-bold">COD</span>
          </h1>
          <div className="text-xl font-semibold w-60 ">
            <h5 className="float-right text-blue-700 font-bold">
              &#8377; {data.price * router.query.quantity}
            </h5>
            <h5>Cart Total: </h5>
            <h5 className="float-right text-blue-700 font-bold">
              &#8377; {data.price * router.query.quantity}
            </h5>
            <h5>Total Payable: </h5>
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 active:bg-red-700 place-self-center rounded-lg text-black transition-all duration-300 p-3 text-xl font-semibold hover:scale-110"
        >
          Proceed to Checkout
        </button>
      </form>
      <Footer />
    </>
  );
};

export default Checkout;
