import Image from "next/image";

export default function Submission() {
  return (
    <>
      <div className="flex justify-center">
        <Image
          src="/images/ETS_Logo.png"
          alt="ETS Logo"
          width={250}
          height={250}
          className="rounded-full my-2"
        />
      </div>
      <div className="flex justify-center text-3xl font-bold mb-2 text-white">
        HWLC Form
      </div>
      <div className="text-center m-4 bg-white rounded-lg p-2">
        <p className="text-4xl p-4">Thank you!</p>
        <p className="text-2xl p-4">
          Your form has been to the Provisioning team
        </p>
        <p className="text-xl p-4 pb-8">You can now close this window</p>
      </div>
    </>
  );
}
