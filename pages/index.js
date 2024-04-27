import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Image from "next/image";

const schema = Yup.object({
  company: Yup.string().required("Company is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Must be a valid email"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  deviceTag: Yup.string().required("Tag is required"),
  deviceSerial: Yup.string().required("Serial number is required"),
  monitors: Yup.number().required("Monitors are required"),
  printer: Yup.string().optional(),
  otherPeripherals: Yup.string().optional(),
  otherApps: Yup.string().optional(),
  notes: Yup.string().optional(),
}).required();

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [apps, setApps] = useState([]);
  const [userApps, setUserApps] = useState([]);
  const [peripherals, setPeripherals] = useState([]);
  const [userPeripherals, setUserPeripherals] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(true);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const monitorOptions = [1, 2, 3, 4, 5];

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

    const fetchPeripherals = async () => {
      const peripheralData = await fetch("/api/peripherals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await peripheralData.json();
      setPeripherals(results);
    };

    fetchPeripherals();
    fetchApps();
    fetchCompanies();
  }, []);

  const checkboxHandler = (table, value) => {
    if (table == "peripherals") {
      if (userPeripherals.includes(value)) {
        setUserPeripherals((previousPeripherals) => {
          return previousPeripherals.filter(
            (peripheral) => peripheral !== value
          );
        });
      } else {
        setUserPeripherals((previousPeripherals) => [
          ...previousPeripherals,
          value,
        ]);
      }
    } else {
      if (userApps.includes(value)) {
        setUserApps((previousApps) => {
          return previousApps.filter((app) => app !== value);
        });
      } else {
        setUserApps((previousApps) => [...previousApps, value]);
      }
    }
  };

  const errorHandler = () => {
    setError((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    setIsSubmitting((prevState) => !prevState);
    const dataToSubmit = {
      ...data,
      selectedPeripherals: userPeripherals,
      selectedApps: userApps,
    };

    const formData = await fetch("/api/userForm/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dataToSubmit),
    });

    if (formData.ok) {
      setIsSubmitting((prevState) => !prevState);
      console.log("Data Submitted!");
      router.push("/success");
    } else {
      setIsSubmitting((prevState) => !prevState);
    }
  };

  return (
    <>
      {error && (
        <div className="flex justify-between font-semibold mb-4 items-center bg-red-600 rounded-lg text-white">
          <p className="mx-auto ">An error has occurred... Try again later.</p>
          <button
            autoFocus
            onClick={errorHandler}
            className="mx-3 font-bold -mt-1 text-center hover:text-black hover:font-bold"
          >
            x
          </button>
        </div>
      )}
      <div className="flex justify-center">
        <Image
          src="/images/ETS_Logo.png"
          alt="ETS Logo"
          width={250}
          height={250}
          className="rounded-full my-2"
        />
      </div>
      <div className="flex justify-center mx-auto p-2">
        <form
          className="rounded-xl p-4 mb-2 bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center text-4xl font-bold p-2">
            Hardware Lifecycle Form
          </div>
          <div className="flex flex-col text-center">
            <label className="text-xl font-semibold mb-1">Company</label>
            <select
              className="select rounded-md mx-auto text-lg border-2 text-center text-black"
              id="company"
              name="company"
              {...register("company")}
            >
              <option hidden value="">
                Select a company
              </option>
              {companies.map(({ id, companyName }) => (
                <option key={id} value={id}>
                  {companyName}
                </option>
              ))}
            </select>
            <div className="text-error sm:text-sm text-red-700 mx-1">
              {errors.company?.message}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-6">
            <div className="flex flex-col mx-4">
              <label className="text-xl font-semibold my-1">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                {...register("firstName")}
                className={`p-1 border-2 rounded-lg ${
                  errors.firstName && "border-red-700"
                }`}
                placeholder="Jane"
              />
              <div className="text-error sm:text-sm text-red-700 mx-1">
                {errors.firstName?.message}
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-xl font-semibold my-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                {...register("lastName")}
                className={`p-1 border-2 rounded-lg ${
                  errors.lastName && "border-red-700"
                }`}
                placeholder="Doe"
              />
              <div className="text-error sm:text-sm text-red-700 mx-1">
                {errors.lastName?.message}
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-xl font-semibold my-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                {...register("username")}
                className={`p-1 border-2 rounded-lg ${
                  errors.username && "border-red-700"
                }`}
                placeholder="jdoe"
              />
              <div className="text-error sm:text-sm text-red-700 mx-1">
                {errors.username?.message}
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-xl font-semibold my-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                {...register("email")}
                className={`p-1 border-2 rounded-lg ${
                  errors.email && "border-red-700"
                }`}
                placeholder="jdoe@company.com"
              />
              <div className="text-error sm:text-sm text-red-700 mx-1">
                {errors.email?.message}
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-xl font-semibold my-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password")}
                className={`p-1 border-2 rounded-lg ${
                  errors.password && "border-red-700"
                }`}
                placeholder="*******"
              />
              <div className="text-error sm:text-sm text-red-700 mx-1">
                {errors.password?.message}
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-xl font-semibold my-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                {...register("confirmPassword")}
                className={`p-1 border-2 rounded-lg ${
                  errors.confirmPassword && "border-red-700"
                }`}
                placeholder="*******"
              />
              <div className="text-error sm:text-sm text-red-700 mx-1">
                {errors.confirmPassword?.message}
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-xl font-semibold my-1">PC Tag #</label>
              <input
                type="text"
                id="deviceTag"
                name="deviceTag"
                {...register("deviceTag")}
                className={`p-1 border-2 rounded-lg ${
                  errors.deviceTag && "border-red-700"
                }`}
                placeholder="PAL-LT10101"
              />
              <div className="text-error sm:text-sm text-red-700 mx-1">
                {errors.deviceTag?.message}
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-xl font-semibold my-1">PC Serial #</label>
              <input
                type="text"
                id="deviceSerial"
                name="deviceSerial"
                {...register("deviceSerial")}
                className={`p-1 border-2 rounded-lg ${
                  errors.deviceSerial && "border-red-700"
                }`}
                placeholder="5A4BAZ89J"
              />
              <div className="text-error sm:text-sm text-red-700 mx-1">
                {errors.deviceSerial?.message}
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-xl font-semibold my-1">
                # of Monitors
              </label>
              <select
                id="monitors"
                name="monitors"
                {...register("monitors")}
                className={`p-1 border-2 rounded-lg ${
                  errors.monitors && "border-red-700"
                }`}
                defaultValue={1}
              >
                {monitorOptions.map((options) => (
                  <option key={options} value={options}>
                    {options}
                  </option>
                ))}
              </select>
              <div className="text-error sm:text-sm text-red-700 mx-1">
                {errors.monitors?.message}
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-xl font-semibold my-1">Printer name</label>
              <input
                type="text"
                id="printer"
                name="printer"
                {...register("printer")}
                className={`p-1 border-2 rounded-lg ${
                  errors.printer && "border-red-700"
                }`}
                placeholder="HP Laserjet MP2055dn"
              />
              <div className="text-error sm:text-sm text-red-700 mx-1">
                {errors.printer?.message}
              </div>
            </div>
          </div>
          <div className="mx-10">
            <label className="text-xl font-semibold">Peripherals </label>
            <p className="mx-2 mt-2"> Select all that apply</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
              {peripherals.map(({ id, peripheralName }) => (
                <div key={id} className="flex items-center mx-6">
                  <input
                    type="checkbox"
                    value={id}
                    className="mr-2"
                    onClick={() => checkboxHandler("peripherals", id)}
                  />
                  {peripheralName}
                </div>
              ))}
            </div>
            <div className="text-error sm:text-sm text-red-700 mx-1">
              {errors.selectedPeripherals?.message}
            </div>
          </div>
          <div className="flex flex-col mx-10 my-4">
            <label className="text-xl font-semibold my-1">
              Other Peripherals
            </label>
            <input
              type="text"
              id="otherPeripherals"
              name="otherPeripherals"
              {...register("otherPeripherals")}
              className="p-1 border-2 rounded-lg"
              placeholder="Hand Scanner..."
            />
          </div>
          <div className="mx-10">
            <label className="text-xl font-semibold">Apps Needed</label>
            <p className="mx-2 mt-2"> Select all that apply</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
              {apps.map(({ id, appName }) => (
                <div key={id} className="flex items-center mx-6">
                  <input
                    type="checkbox"
                    value={id}
                    onClick={() => checkboxHandler("apps", id)}
                    className="mr-2"
                  />
                  {appName}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mx-10 my-4">
            <label className="text-xl font-semibold my-1">Other Apps</label>
            <input
              type="text"
              id="otherApps"
              name="otherApps"
              {...register("otherApps")}
              className="p-1 border-2 rounded-lg"
              placeholder="Google Earth..."
            />
          </div>
          <div className="flex mx-10">
            <div>
              <label className="text-xl font-semibold">Notes</label>
              <textarea
                id="notes"
                name="notes"
                {...register("notes")}
                rows="5"
                cols="87"
                className="p-1 border-2 rounded-lg mt-2 block"
              />
            </div>
          </div>
          <div className="text-center p-4 -mb-4">
            <button
              className="border-2 border-gray-400 rounded-lg p-2 px-3 bg-gray-200 font-bold"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
