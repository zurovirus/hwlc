import "@/styles/globals.css";
require("dotenv").config();

export default function App({ Component, pageProps }) {
  return (
    <div className="flex justify-center bg-sky-700">
      <div className="max-w-7xl w-full max-h-full min-h-screen text-black">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
