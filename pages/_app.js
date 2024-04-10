import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex justify-center bg-white text-black">
      <div className="max-w-7xl w-full max-h-full min-h-screen">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
