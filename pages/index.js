import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companyData = await fetch("/api/company", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await companyData.json();
      setCompanies(results);
    };

    const fetchApps = async () => {
      const appData = await fetch("/api/apps", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await appData.json();
      setApps(results);
    };

    fetchApps();
    fetchCompanies();
  }, []);

  return (
    <>
      <div className="flex justify-center text-4xl font-semibold p-4">
        ETS HWLC Form
      </div>
      <div className="flex justify-around items-center">
        <div className="border-2 rounded-xl p-2">
          <div className="flex justify-center items-center">
            <label className="text-xl font-semibold">Company</label>
            <select className="select rounded-md mx-4 text-lg border-2 text-black">
              <option hidden value="">
                Select a company
              </option>
              {companies.map(({ id, companyName }) => (
                <option key={id} value={id}>
                  {companyName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-6">
              <div className="flex flex-col mx-4">
                <label className="text-xl font-semibold my-1">First Name</label>
                <input
                  type="text"
                  className="p-1 border-2 rounded-lg"
                  placeholder="Jane"
                />
              </div>
              <div className="flex flex-col mx-4">
                <label className="text-xl font-semibold my-1">Last Name</label>
                <input
                  type="text"
                  className="p-1 border-2 rounded-lg"
                  placeholder="Doe"
                />
              </div>
              <div className="flex flex-col mx-4">
                <label className="text-xl font-semibold my-1">Username</label>
                <input
                  type="text"
                  className="p-1 border-2 rounded-lg"
                  placeholder="jdoe"
                />
              </div>
              <div className="flex flex-col mx-4">
                <label className="text-xl font-semibold my-1">Email</label>
                <input
                  type="email"
                  className="p-1 border-2 rounded-lg"
                  placeholder="jdoe@company.com"
                />
              </div>
              <div className="flex flex-col mx-4">
                <label className="text-xl font-semibold my-1">Password</label>
                <input
                  type="text"
                  className="p-1 border-2 rounded-lg"
                  placeholder="*******"
                />
              </div>
              <div className="flex flex-col mx-4">
                <label className="text-xl font-semibold my-1">
                  Confirm Password
                </label>
                <input
                  type="text"
                  className="p-1 border-2 rounded-lg"
                  placeholder="*******"
                />
              </div>
              <div className="flex flex-col mx-4">
                <label className="text-xl font-semibold my-1">Device Tag</label>
                <input
                  type="text"
                  className="p-1 border-2 rounded-lg"
                  placeholder="PAL-LT10101"
                />
              </div>
              <div className="flex flex-col mx-4">
                <label className="text-xl font-semibold my-1">
                  Device Serial Number
                </label>
                <input
                  type="text"
                  className="p-1 border-2 rounded-lg"
                  placeholder="5A4BAZ89J"
                />
              </div>
            </div>
          </div>
          <div className="mx-10">
            <label className="text-xl font-semibold">Apps Needed</label>
            <div className="grid grid-cols-2 gap-6 my-4">
              {apps.map(({ id, appName }) => (
                <div key={id} className="flex items-center mx-6">
                  <input type="checkbox" value={id} className="mr-2" />
                  {appName}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mx-10 my-4">
            <label className="text-xl font-semibold my-1">Other Apps</label>
            <input
              type="text"
              className="p-1 border-2 rounded-lg"
              placeholder="Google Earth..."
            />
          </div>
          <div className="flex mx-10">
            <div>
              <label className="text-xl font-semibold">Notes</label>
              <textarea
                name="notes"
                rows="5"
                cols="55"
                className="p-1 border-2 rounded-lg mt-2 block w-full"
              ></textarea>
            </div>
          </div>
          <div className="text-center p-4">
            <button className="border-2 border-gray-400 rounded-lg p-1 bg-gray-400 font-bold">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
