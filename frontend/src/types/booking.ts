export interface Booking {
  _id: string;
  bookingId: string;
  vehicle: string | any; // populated vehicle
  pickupDetails: {
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    returnDate: string;
  };
  passengerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  };
  driverPreference: "self-drive" | "chauffeur";
  totalAmount: number;
  paymentStatus: "Pending" | "Completed" | "Failed";
  bookingStatus: "Confirmed" | "Cancelled" | "Completed";
  createdAt: string;
  updatedAt: string;
}

// Data needed to submit a new booking
export type CreateBookingData = Omit<
  Booking,
  "_id" | "bookingId" | "paymentStatus" | "bookingStatus" | "createdAt" | "updatedAt"
>;




/* 
whats in types folder ,booking.ts vehicle.ts api.ts utils.ts  how they work??
4:43 PM
Here is a breakdown of what these files are and how they work in your project:

1. The types/ Folder (booking.ts & vehicle.ts)
Since you are using TypeScript, this folder is used to define the "shapes" of your data. TypeScript uses these interfaces to ensure you don't accidentally access a property that doesn't exist or pass the wrong type of data, which prevents a lot of bugs.



booking.ts
: Defines what a Booking object looks like in your app.
It specifies that every Booking must have pickupDetails, passengerDetails, a totalAmount, etc.
It also defines CreateBookingData, which uses a neat TypeScript trick (Omit) to say: "A new booking submission needs all the same data as a regular Booking, EXCEPT for the _id, createdAt, and paymentStatus (because the database generates those later)."


vehicle.ts
: Defines exactly what data makes up a Vehicle.
It strictly enforces types, like ensuring the fuelType can only be "Petrol", "Diesel", "Electric", or "Hybrid", and the pricePerDay must be a number.
2. The lib/ Folder (api.ts & utils.ts)
The lib (library) folder contains reusable helper functions and configuration that can be used anywhere in your app.



api.ts
: This is a centralized network request helper. Instead of writing fetch("http://localhost:5000/api/...") repeatedly across your app, you use the fetchAPI function defined here.
How it works: When you call fetchAPI("/vehicles"), it automatically:
Prepends your backend URL to it.
Sets the right JSON headers.
Checks if the user is logged in (by looking for a token in the browser's localStorage) and automatically attaches their authorization token if they are.
Standardizes error handling if the request fails.


utils.ts
: Contains a single, very powerful function called cn (short for class-name).
How it works: It combines two popular libraries (clsx and tailwind-merge). In React components with Tailwind CSS, you often need to combine default classes with conditional classes (e.g., making a button red if there's an error). The cn function cleanly merges these Tailwind classes and automatically resolves any conflicts (e.g., if you accidentally say p-4 and p-2, it knows how to handle it gracefully). This is a standard pattern popularized by UI libraries like shadcn/ui.
*/