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
      <div className="text-center m-4 bg-white rounded-lg p-4">
        <div className="flex justify-center text-4xl font-bold p-2">
          Hardware Lifecycle Form
        </div>
        <p className="text-3xl p-4">Thank you!</p>
        <p className="text-2xl p-4">
          Your form has been sent to the provisioning team.
        </p>
        <p className="text-xl p-4 pb-8">You can now close this window.</p>
      </div>
    </>
  );
}
