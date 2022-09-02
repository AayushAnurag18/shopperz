import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Nav from "../Components/nav";
import Footer from "../Components/footer";
import Image from "next/image";

const Profile = () => {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") signIn();
  }, [data]);

  if (!data) return null;

  return (
    <>
      <Nav />

      <div className=" p-4 mt-12">
        <h1 className="text-4xl m-4 font-bold text-[#cbc95b] text-center">
          Profile
        </h1>
        <div className="flex justify-start start gap-4 p-12 border-2 m-auto mt-20 bg-black rounded-xl w-2/4 ">
          <div className="border-4 border-gray-500 rounded-[50%]">
            <img
              className="w-24 rounded-[50%]"
              src={data?.user.image}
              alt="xyz"
            />
          </div>
          <div>
            <div className="p-2">
              <span className="font-bold text-red-600 text-2xl">Name : </span>
              <span className="text-2xl font-bold">{data?.user.name}</span>
            </div>
            <div className="p-2">
              <span className="text-2xl text-green-900 font-bold">
                Email :{" "}
              </span>
              <span className="text-2xl font-bold">{data?.user.email}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
