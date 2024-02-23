import "./styles.css";
import NavBar from "../src/NavBar";
import Footer from "../src/Footer";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { SparklesCore } from "./ui/sparkles";

export default function MyApp() {
  const [carsList, setCarsList] = useState(null);
  const [duration, setDuration] = useState(1);
  const [distance, setDistance] = useState(50);

  useEffect(() => {
    fetch(
      `http://localhost:3000/cars?duration=${duration}&distance=${distance}`
    )
      .then((response) => response.json())
      .then((data) => {
        data && setCarsList(data);
      });
  }, [duration, distance]);

  let carsToDisplay;
  if (carsList) {
    carsToDisplay = carsList.map((data, i) => {
      const priceInEuros = (data.pricePerDay / 100).toFixed(2);
      const altText = `${data.brand} ${data.model}`;

      return (
        <div className="m-1.5 " key={i}>
          <div className="card w-96 bg-base-100 shadow-xl card hover:scale-105 hover:border hover:border-black cursor-pointer transition duration-300 ease-in-out">
            <figure>
              <img src={data.pictureUrl} alt={altText} />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-sans">
                {data.brand} {data.model}
              </h2>
              <p className="font-sans">{priceInEuros}€ / jour</p>
              <p className="font-sans">{data.pricePerKm} € / Km</p>
              {/* <p className="font-sans">
                {data.availability.maxDuration} jour
              </p>
              <p className="font-sans">{data.availability.maxDistance} Km</p> */}
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* NAVBAR */}
      <NavBar />
      {/* Welcome Text with animation ui.aceternity.com */}
      <div className="h-[30rem] w-full  flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-7xl text-3xl lg:text-7xl font-bold font-sans text-center text-white relative z-20">
          Bienvenue sur Drivy
        </h1>
        <div className="w-[40rem] h-10 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          <p className="text-xl m-3 text-center text-white px-3 font-sans">
            Location de voiture entre particuliers et pros
          </p>
        </div>
      </div>

      {/* CARS CARDS  */}
      {carsToDisplay?.length > 0 && (
        <div className="flex flex-col items-center justify-between w-5/6 mb-4">
          <p className="font-sans text-white">
            {carsToDisplay.length} Voitures disponibles à la location
          </p>
          <div className="collapse ">
            <input type="checkbox" />
            <div className="collapse-title flex items-center justify-center text-center text-white font-medium">
              <Icon icon="lets-icons:filter" width="25" height="25" />
              Choisir la durée de location et la distance prévues
            </div>
            <div className="collapse-content">
              <div className="flex items-center justify-center w-full">
                <label className="form-control w-full max-w-xs mr-1.5">
                  <div className="label">
                    <span className="label-text text-white">
                      Nombre de jour(s) de location
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
                    <span className="label-text text-white">
                      Distance en Km
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
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-center rounded-lg">
        {carsToDisplay}
      </div>
      {/* FOOTER */}
      <Footer />
    </div>
  );
}
