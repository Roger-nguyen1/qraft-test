import "./styles.css";
import { useState, useEffect } from "react";
import NavBar from "../src/NavBar";
import WelcomeText from "./WelcomeText";
import Footer from "../src/Footer";
import CarCard from "./CarCard";
import { Icon } from "@iconify/react";
import { DataCarType } from "../types/dataTypes";
import { calculateDiscountPrice } from "../src/modules/calculateDiscountPrice";

export default function MyApp() {
  const [carsList, setCarsList] = useState<DataCarType[]>(null);
  const [duration, setDuration] = useState<number>(1);
  const [distance, setDistance] = useState<number>(50);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  //API Request
  useEffect(() => {
    fetch(
      `http://localhost:3000/cars?duration=${duration}&distance=${distance}`
    )
      .then((response) => response.json())
      .then((data) => {
        data && setCarsList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setErrorMessage("An error occurred while loading datas");
        setLoading(false);
      });
  }, [duration, distance]);

  //missing type of carsToDisplay
  let carsToDisplay;
  if (carsList) {
    carsToDisplay = carsList.map((data, i) => {
      const pricePerDayInEuros: number = data.pricePerDay / 100;
      const pricePerKmInEuros: number = data.pricePerKm / 100;
      const altText: string = `${data.brand} ${data.model}`;

      //missing type of totalPriceWithReduction
      const totalPriceWithReduction = (
        (calculateDiscountPrice(duration, data.pricePerDay) +
          data.pricePerKm * distance) /
        100
      ).toFixed(2);

      return (
        <>
          <CarCard
            key={i}
            pictureUrl={data.pictureUrl}
            brand={data.brand}
            model={data.model}
            altText={altText}
            pricePerDay={pricePerDayInEuros}
            pricePerKm={pricePerKmInEuros}
            totalPrice={totalPriceWithReduction}
          />
        </>
      );
    });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Navbar & Welcome */}
      <NavBar />
      <WelcomeText />
      {/* Numbers of cars + Filter  */}
      {carsToDisplay?.length > 0 && (
        <div className="flex flex-col items-center justify-center w-5/6 mb-4">
          <div>
            {" "}
            <p className="font-sans text-white">
              {carsToDisplay.length} Cars available for rent
            </p>
          </div>
          <div className="collapse">
            <input type="checkbox" />
            <div className="collapse-title flex items-center justify-center text-center text-white font-medium">
              <span className="flex items-center justify-center text-xs md:text-base p-2 border-2 rounded-lg">
                <Icon icon="lets-icons:filter" width="25" height="25" /> Choose
                the planned rental duration and distance{" "}
              </span>
            </div>
            <div className="collapse-content flex flex-col items-center justify-center">
              <div className="flex items-center justify-center w-full">
                <label className="form-control w-full max-w-xs mr-1.5">
                  <div className="label">
                    <span className="label-text text-xs md:text-base text-white">
                      Number of rental day(s)
                    </span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-xs md:text-base text-white">
                      Distance in Km
                    </span>
                  </div>
                  <input
                    type="number"
                    min="50"
                    max="3000"
                    step="50"
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>
              <p className="italic text-xs md:text-sm text-white mt-3">
                A discount is applied in the price per day : -10% after 1 day,
                -30% after 4 days, -50% after 10 days!
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Loading animation */}
      <div className="flex flex-col items-center justify-center">
        {loading && (
          <>
            <p className="text-white text-2xl font-semibold mb-4">Loading...</p>
            <span className="loading loading-ring text-white loading-lg mb-10"></span>
          </>
        )}
      </div>
      {/* Error message verification or Cars Cards */}
      {errorMessage ? (
        <>
          <p className="mb-10 mx-1.5 text-white md:text-5xl text-3xl lg:text-5xl font-bold font-sans text-center">
            {errorMessage}
          </p>
        </>
      ) : (
        <div className="flex flex-wrap justify-center">{carsToDisplay}</div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
