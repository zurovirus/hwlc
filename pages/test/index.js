// import { useState, useEffect } from "react";

// export default function Test() {
//   const [test, setTest] = useState([]);

//   useEffect(() => {
//     console.log("step1");
//     const fetches = async () => {
//       const test = await fetch("/api/userForm", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const results = await test.json();
//       console.log(results);
//       setTest(results);
//     };

//     fetches();
//   }, []);

//   return (
//     <>
//       <p>Hi</p>
//     </>
//   );
// }
