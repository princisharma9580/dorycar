import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import rideService from "../../services/rideService";
import { toast } from "react-toastify";
import Footer from "../Footer"; 

// const CreateRide = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     origin: "",
//     destination: "",
//     date: new Date(),
//     departureTime: "",
//     arrivalTime: "",
//     seats: 1,
//     price: "",
//     preferredCommunication: "",
//     ridePreference: {
//       ac: true,
//       pet: true,
//       smoking: true,
//       music: true,
//       luggage: true,
//       bagMax: true,
//     },
//     paymentMethods: "",
//   });

  // const communicationPrefs = [
  //   "select preferred communication",
  //   "Chat",
  //   "Call",
  //   "Both",
  // ];

  // const allPaymentOptions = [
  //   "select payment method",
  //   "Cash",
  //   "UPI",
  //   "QR",
  //   "Other",
  // ];

  // const [qrImage, setQrImage] = useState(null);

  // const [customPayment, setCustomPayment] = useState("");
  // const [showCustomInput, setShowCustomInput] = useState(false);
  // const [fieldErrors, setFieldErrors] = useState({});

  // const [loading, setLoading] = useState(false);

// useEffect(() => {
//   const savedDraft = localStorage.getItem("rideDraft");
//   if (savedDraft) {
//     const parsedDraft = JSON.parse(savedDraft);
//     parsedDraft.date = new Date(parsedDraft.date); // ✅ Convert string to Date
//     setFormData(parsedDraft);
//   }
// }, []);


//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleNestedChange = (section, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], [field]: value },
//     }));
//   };

//   const handleDateChange = (e) => {
//     const newDate = new Date(e.target.value);
//     setFormData({
//       ...formData,
//       date: newDate,
//     });
//   };

//   const formatDateTime = (date, time) => {
//     const [hours, minutes] = time.split(":");
//     const newDate = new Date(date);
//     newDate.setHours(parseInt(hours, 10));
//     newDate.setMinutes(parseInt(minutes, 10));
//     newDate.setSeconds(0);
//     return newDate.toISOString(); 
//   };

// const validateFields = () => {
//   const errors = {};

//   if (!formData.origin?.trim()) errors.origin = "Origin is required.";
//   if (!formData.destination?.trim()) errors.destination = "Destination is required.";
//   if (!formData.date) errors.date = "Date is required.";
//   if (!formData.departureTime) errors.departureTime = "Departure time is required.";
//   if (!formData.arrivalTime) errors.arrivalTime = "Arrival time is required.";
//   if (!formData.seats || formData.seats < 1) errors.seats = "At least one seat is required.";
//   if (!formData.price || isNaN(parseFloat(formData.price))) errors.price = "Valid price is required.";
//   if (!formData.paymentMethods || formData.paymentMethods.length === 0)
//     errors.paymentMethods = "Select at least one payment method.";

//   setFieldErrors(errors);
//   return Object.keys(errors).length === 0;
// };

// const isValid = validateFields();
// if (!isValid) {
//   setLoading(false);
//   return;
// }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   console.log("Submitting ride data:", formData);

  //   const dep = formData.departureTime;
  //   const arr = formData.arrivalTime;

  //   if (!dep || !arr) {
  //     toast.error("Please enter both departure and arrival times.");
  //     setLoading(false);
  //     return;
  //   }

  //   const depDate = new Date(`1970-01-01T${dep}:00`);
  //   const arrDate = new Date(`1970-01-01T${arr}:00`);

  //   if (arrDate <= depDate) {
  //     toast.error("Arrival time must be after departure time.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     if (showCustomInput && customPayment.trim()) {
  //       formData.paymentMethods = [
  //         ...formData.paymentMethods.filter((m) => m !== "Other"),
  //         customPayment.trim(),
  //       ];
  //     }

  //     await rideService.createRide({
  //       ...formData,
  //       price: parseFloat(formData.price),
  //       seats: parseInt(formData.seats),
  //       paymentMethods: formData.paymentMethods,
  //       ...formData,
  //       departureTime: formatDateTime(formData.date, formData.departureTime),
  //       arrivalTime: formatDateTime(formData.date, formData.arrivalTime),
  //     });

  //     toast.success("Ride created successfully!");
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.error("Error creating ride:", error);
  //     if (
  //       error.response?.status === 400 &&
  //       error.response.data?.missingFields
  //     ) {
  //       // Save current form data
  //     localStorage.setItem("rideDraft", JSON.stringify(formData));

  //       const missingFields = error.response.data.missingFields;
  //       const message = `Please complete the following fields in your profile: ${missingFields.join(
  //         ", "
  //       )}`;

  //       toast.error(message);
  //       navigate("/profile");
  //     } else {
  //       toast.error(error.response?.data?.message || "Failed to create ride");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const CreateRide = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: new Date(),
    departureTime: "",
    arrivalTime: "",
    seats: 1,
    price: "",
    preferredCommunication: "",
    ridePreference: {
      ac: true,
      pet: true,
      smoking: true,
      music: true,
      luggage: true,
      bagMax: true,
    },
    paymentMethods: "",
  });

    const communicationPrefs = [
    "select preferred communication",
    "Chat",
    "Call",
    "Both",
  ];

  const allPaymentOptions = [
    "select payment method",
    "Cash",
    "UPI",
    "QR",
    "Other",
  ];
  const [qrImage, setQrImage] = useState(null);

  const [customPayment, setCustomPayment] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  
  // Create refs for each input field
  const originRef = useRef();
  const destinationRef = useRef();
  const dateRef = useRef();
  const departureTimeRef = useRef();
  const arrivalTimeRef = useRef();
  const seatsRef = useRef();
  const priceRef = useRef();
  const preferredCommunicationRef = useRef();
  const paymentMethodsRef = useRef();

  useEffect(() => {
    const savedDraft = localStorage.getItem("rideDraft");
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      parsedDraft.date = new Date(parsedDraft.date); // ✅ Convert string to Date
      setFormData(parsedDraft);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setFormData({
      ...formData,
      date: newDate,
    });
  };

  const formatDateTime = (date, time) => {
    const [hours, minutes] = time.split(":");
    const newDate = new Date(date);
    newDate.setHours(parseInt(hours, 10));
    newDate.setMinutes(parseInt(minutes, 10));
    newDate.setSeconds(0);
    return newDate.toISOString();
  };

const validateFields = () => {
  const errors = {};
  let firstInvalidRef = null;

  if (!formData.origin?.trim()) {
    errors.origin = "Origin is required.";
    if (!firstInvalidRef) firstInvalidRef = originRef;
  }

  if (!formData.destination?.trim()) {
    errors.destination = "Destination is required.";
    if (!firstInvalidRef) firstInvalidRef = destinationRef;
  }

  if (!formData.date) {
    errors.date = "Date is required.";
    if (!firstInvalidRef) firstInvalidRef = dateRef;
  }

  if (!formData.departureTime) {
    errors.departureTime = "Departure time is required.";
    if (!firstInvalidRef) firstInvalidRef = departureTimeRef;
  }

  if (!formData.arrivalTime) {
    errors.arrivalTime = "Arrival time is required.";
    if (!firstInvalidRef) firstInvalidRef = arrivalTimeRef;
  }

  if (!formData.seats || formData.seats < 1) {
    errors.seats = "At least one seat is required.";
    if (!firstInvalidRef) firstInvalidRef = seatsRef;
  }

  if (!formData.price || isNaN(parseFloat(formData.price))) {
    errors.price = "Valid price is required.";
    if (!firstInvalidRef) firstInvalidRef = priceRef;
  }

  if (!formData.preferredCommunication || formData.preferredCommunication === "select preferred communication") {
    errors.preferredCommunication = "Select preferred communication.";
    if (!firstInvalidRef) firstInvalidRef = preferredCommunicationRef;
  }

  if (!formData.paymentMethods || formData.paymentMethods === "select payment method") {
    errors.paymentMethods = "Select at least one payment method.";
    if (!firstInvalidRef) firstInvalidRef = paymentMethodsRef;
  }

  setFieldErrors(errors);

  // Focus first invalid field
  if (firstInvalidRef?.current) {
    firstInvalidRef.current.focus();
  }

  return Object.keys(errors).length === 0;
};



  // Handle submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate fields before submission
    if (!validateFields()) {
      setLoading(false);
      return;
    }

    const dep = formData.departureTime;
    const arr = formData.arrivalTime;

    if (!dep || !arr) {
      toast.error("Please enter both departure and arrival times.");
      setLoading(false);
      return;
    }

    const depDate = new Date(`1970-01-01T${dep}:00`);
    const arrDate = new Date(`1970-01-01T${arr}:00`);

    if (arrDate <= depDate) {
      toast.error("Arrival time must be after departure time.");
      setLoading(false);
      return;
    }

    try {
      if (showCustomInput && customPayment.trim()) {
        formData.paymentMethods = [
          ...formData.paymentMethods.filter((m) => m !== "Other"),
          customPayment.trim(),
        ];
      }

      await rideService.createRide({
        ...formData,
        price: parseFloat(formData.price),
        seats: parseInt(formData.seats),
        paymentMethods: formData.paymentMethods,
        departureTime: formatDateTime(formData.date, formData.departureTime),
        arrivalTime: formatDateTime(formData.date, formData.arrivalTime),
      });

      toast.success("Ride created successfully!");
      localStorage.removeItem("rideDraft");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating ride:", error);

      if (
        error.response?.status === 400 &&
        error.response.data?.missingFields
      ) {
        localStorage.setItem("rideDraft", JSON.stringify(formData));
        toast.warn("Please complete your profile");
        navigate("/profile");
      } else {
        toast.error(error.response?.data?.message || "Failed to create ride");
      }
    } finally {
      setLoading(false);
    }
  };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   // Ensure missingFields function checks all required fields properly
//   const missingFields = getMissingFields();
//   if (missingFields.length > 0) {
//     const missingFieldsList = missingFields.join(", ");
//     toast.error(`Please fill out the following fields: ${missingFieldsList}`);
//     setLoading(false);
//     return;
//   }

//   const dep = formData.departureTime;
//   const arr = formData.arrivalTime;

//   if (!dep || !arr) {
//     toast.error("Please enter both departure and arrival times.");
//     setLoading(false);
//     return;
//   }

//   const depDate = new Date(`1970-01-01T${dep}:00`);
//   const arrDate = new Date(`1970-01-01T${arr}:00`);

//   if (arrDate <= depDate) {
//     toast.error("Arrival time must be after departure time.");
//     setLoading(false);
//     return;
//   }

//   try {
//     // Handle custom payment method if necessary
//     if (showCustomInput && customPayment.trim()) {
//       formData.paymentMethods = [
//         ...formData.paymentMethods.filter((m) => m !== "Other"),
//         customPayment.trim(),
//       ];
//     }

//     // Submit the form data
//     await rideService.createRide({
//       ...formData,
//       price: parseFloat(formData.price),
//       seats: parseInt(formData.seats),
//       paymentMethods: formData.paymentMethods,
//       departureTime: formatDateTime(formData.date, formData.departureTime),
//       arrivalTime: formatDateTime(formData.date, formData.arrivalTime),
//     });

//     toast.success("Ride created successfully!");
//     localStorage.removeItem("rideDraft");
//     navigate("/dashboard");
//   } catch (error) {
//     console.error("Error creating ride:", error);

//     if (
//       error.response?.status === 400 &&
//       error.response.data?.missingFields
//     ) {
//       // Save current form data
//       localStorage.setItem("rideDraft", JSON.stringify(formData));
//       toast.warn("Please complete your profile");
//       navigate("/profile");
//     } else {
//       toast.error(error.response?.data?.message || "Failed to create ride");
//     }
//   } finally {
//     setLoading(false);
//   }
// };



  return (
    <>
      <div className="flex-grow mt-16 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Offer a ride</h1>
            <p className="text-gray-600 mb-2">
              Share your journey and help others travel sustainably while
              offsetting your costs.
            </p>
            <p className="text-gray-600 mb-6">
              Complete your profile first to create a ride.{" "}
              <span>
                <button
                  className="text-white bg-blue-500 p-1 px-2 rounded-md"
                  onClick={() => navigate("/profile")}
                >
                  {" "}
                  click{" "}
                </button>
              </span>{" "}
              to complete profile
            </p>

            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Ride details
                </h3>
              </div>
              <div className="p-6 pt-0">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-map-pin h-5 w-5 mr-2 text-emerald-600"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      Route
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* <div className="space-y-2">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="origin"
                        >
                          Departure
                        </label>
                        <input
                          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                          id="origin"
                          name="origin"
                          placeholder="City or town"
                          value={formData.origin}
                          onChange={handleChange}
                        />
                         {fieldErrors.origin && (
    <p className="text-red-500 text-sm mt-1">{fieldErrors.origin}</p>
  )}
                      </div> */}
                      <div className="space-y-2">
  <label
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    htmlFor="origin"
  >
    Departure
  </label>
  <input
    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${fieldErrors.origin ? "border-red-500" : "border-emerald-200"}`}
    id="origin"
    name="origin"
    placeholder="City or town"
    value={formData.origin}
    onChange={handleChange}
    ref={originRef}
  />
  {fieldErrors.origin && (
    <p className="text-red-500 text-sm mt-1">{fieldErrors.origin}</p>
  )}
</div>

                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="destination"
                        >
                          Destination
                        </label>
                        <input
                          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                          id="destination"
                          name="destination"
                          placeholder="City or town"
                          value={formData.destination}
                          onChange={handleChange}
                          ref={destinationRef}
                        />
                          {fieldErrors.destination && (
    <p className="text-red-500 text-sm mt-1">{fieldErrors.destination}</p>
  )}
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="pickupLocation"
                      >
                        Pickup location
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                        id="pickupLocation"
                        placeholder="Specific pickup point"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="dropoffLocation"
                      >
                        Dropoff location
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                        id="dropoffLocation"
                        placeholder="Specific dropoff point"
                      />
                    </div>
                  </div> */}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-calendar h-5 w-5 mr-2 text-emerald-600"
                      >
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                      Date and Time
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="date"
                        >
                          Date
                        </label>
                        <input
                          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                          id="date"
                          type="date"
                          name="date"
                          value={formData.date.toISOString().split("T")[0]}
                          onChange={handleDateChange}
                          ref={dateRef}
                        />
                          {fieldErrors.date && (
    <p className="text-red-500 text-sm mt-1">{fieldErrors.date}</p>
  )}
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="departureTime"
                        >
                          Departure time
                        </label>
                        <input
                          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                          id="departureTime"
                          type="time"
                          name="departureTime"
                          value={formData.departureTime}
                          onChange={handleChange}
                          ref={departureTimeRef}
                        />
                          {fieldErrors.departureTime && (
    <p className="text-red-500 text-sm mt-1">{fieldErrors.departureTime}</p>
  )}
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="arrivalTime"
                        >
                          Estimated arrival
                        </label>
                        <input
                          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                          id="arrivalTime"
                          type="time"
                          name="arrivalTime"
                          value={formData.arrivalTime}
                          onChange={handleChange}
                          ref={arrivalTimeRef}
                        />
                          {fieldErrors.arrivalTime && (
    <p className="text-red-500 text-sm mt-1">{fieldErrors.arrivalTime}</p>
  )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-users h-5 w-5 mr-2 text-emerald-600"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      Seats and Price
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="seats"
                        >
                          Available seats
                        </label>
                        <select
                          id="seats"
                          name="seats"
                          value={formData.seats}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              seats: parseInt(e.target.value),
                            })
                          }
                          ref={seatsRef}
                          className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                        >
                          <option value="">Select seats</option>
                          {[1, 2, 3, 4, 5, 6, 7].map((seat) => (
                            <option key={seat} value={seat}>
                              {seat}
                            </option>
                          ))}
                        </select>
                          {fieldErrors.seats && (
    <p className="text-red-500 text-sm mt-1">{fieldErrors.seats}</p>
  )}
                      </div>

                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="price"
                        >
                          Price per seat (₹)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-400 text-md">
                            ₹
                          </span>
                          <input
                            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-emerald-200 focus:border-emerald-500"
                            id="price"
                            min="1"
                            step="0.01"
                            placeholder="15.00"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            ref={priceRef}
                          />
                            {fieldErrors.price && (
    <p className="text-red-500 text-sm mt-1">{fieldErrors.price}</p>
  )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-car h-5 w-5 mr-2 text-emerald-600"
                    >
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                      <circle cx="7" cy="17" r="2"></circle>
                      <path d="M9 17h6"></path>
                      <circle cx="17" cy="17" r="2"></circle>
                    </svg>
                    Vehicle
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="carMake"
                      >
                        Make
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                        id="carMake"
                        placeholder="Toyota"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="carModel"
                      >
                        Model
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                        id="carModel"
                        placeholder="Prius"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="carColor"
                      >
                        Color
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                        id="carColor"
                        placeholder="Blue"
                      />
                    </div>
                  </div>
                </div> */}
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-info h-5 w-5 mr-2 text-emerald-600"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="feature1"
                          checked={formData.ridePreference.ac}
                          onChange={(e) =>
                            handleNestedChange(
                              "ridePreference",
                              "ac",
                              e.target.checked
                            )
                          }
                          className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />

                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="feature1"
                        >
                          Air conditioning
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="feature1"
                          checked={formData.ridePreference.pet}
                          onChange={(e) =>
                            handleNestedChange(
                              "ridePreference",
                              "pet",
                              e.target.checked
                            )
                          }
                          className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="feature2"
                        >
                          Pet friendly
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="feature1"
                          checked={formData.ridePreference.smoking}
                          onChange={(e) =>
                            handleNestedChange(
                              "ridePreference",
                              "smoking",
                              e.target.checked
                            )
                          }
                          className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="feature3"
                        >
                          Smoking allowed
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="feature1"
                          checked={formData.ridePreference.music}
                          onChange={(e) =>
                            handleNestedChange(
                              "ridePreference",
                              "music",
                              e.target.checked
                            )
                          }
                          className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="feature4"
                        >
                          Music
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="feature1"
                          checked={formData.ridePreference.luggage}
                          onChange={(e) =>
                            handleNestedChange(
                              "ridePreference",
                              "luggage",
                              e.target.checked
                            )
                          }
                          className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="feature5"
                        >
                          Extra luggage space
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="feature1"
                          checked={formData.ridePreference.bagMax}
                          onChange={(e) =>
                            handleNestedChange(
                              "ridePreference",
                              "bagMax",
                              e.target.checked
                            )
                          }
                          className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="feature6"
                        >
                          2 bags max
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="preferredCommunication"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Preferred Communication
                      </label>
                      <select
                        id="preferredCommunication"
                        name="preferredCommunication"
                        value={formData.preferredCommunication}
                        onChange={handleChange}
                        ref={preferredCommunicationRef}
                        className="w-full border border-emerald-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:border-emerald-500
     bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                      >
                        {communicationPrefs.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                        {fieldErrors.preferredCommunication && (
    <p className="text-red-500 text-sm mt-1">{fieldErrors.preferredCommunication}</p>
  )}
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="paymentMethods"
                      >
                        Payment Methods
                      </label>
                      <select
                        id="paymentMethods"
                        name="paymentMethods"
                        // multiple
                        value={formData.paymentMethods}
                        ref={paymentMethodsRef}
                        onChange={(e) => {
                          const selected = Array.from(
                            e.target.selectedOptions,
                            (opt) => opt.value
                          );

                          if (selected.includes("Other")) {
                            if (!formData.paymentMethods.includes("Other")) {
                              setShowCustomInput(true);
                              setCustomPayment("");
                            }
                          } else {
                            setShowCustomInput(false);
                          }

                          setFormData({
                            ...formData,
                            paymentMethods: selected,
                          });
                        }}
                        className="w-full border border-emerald-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:border-emerald-500
     bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
                      >
                        {allPaymentOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                        {fieldErrors.paymentMethods && (
    <p className="text-red-500 text-sm mt-1">{fieldErrors.paymentMethods}</p>
  )}

                      {showCustomInput && (
                        <input
                          type="text"
                          placeholder="Specify Other Payment Method"
                          value={customPayment}
                          onChange={(e) => setCustomPayment(e.target.value)}
                          onBlur={() => {
                            const trimmed = customPayment.trim();
                            if (trimmed) {
                              setFormData((prev) => ({
                                ...prev,
                                paymentMethods: [
                                  ...prev.paymentMethods.filter(
                                    (m) => m !== "Other"
                                  ),
                                  trimmed,
                                ],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                paymentMethods: prev.paymentMethods.filter(
                                  (m) => m !== "Other"
                                ),
                              }));
                            }
                            setShowCustomInput(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              e.target.blur();
                            }
                          }}
                          className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500 mt-2"
                        />
                      )}

                      {formData.paymentMethods.includes("UPI") && (
                        <input
                          type="text"
                          placeholder="Enter UPI ID"
                          value={formData.upiId || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              upiId: e.target.value,
                            }))
                          }
                          className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500 mt-4"
                        />
                      )}

                      {formData.paymentMethods.includes("QR") && (
                        <div className="mt-4">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
                            Upload QR Code Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) setQrImage(file);
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                          {qrImage && (
                            <div className="mt-3">
                              <p className="text-xs text-gray-500 mb-1">
                                Preview:
                              </p>
                              <img
                                src={URL.createObjectURL(qrImage)}
                                alt="QR Code"
                                className="max-w-full max-h-52 mt-1 border border-gray-200 rounded"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="additionalInfo"
                    >
                      Additional information
                    </label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-emerald-200 focus:border-emerald-500"
                      id="additionalInfo"
                      placeholder="Share any additional details about your ride..."
                      rows="4"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {loading ? "Creating Ride..." : "Create Ride"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateRide;
