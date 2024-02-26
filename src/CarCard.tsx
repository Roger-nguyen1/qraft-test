import "./styles.css";

type CarCardProps = React.PropsWithChildren<{
  pictureUrl: string;
  altText: string;
  brand: string;
  model: string;
  pricePerDay: number;
  pricePerKm: number;
  totalPrice: any;
}>;

export default function CarCard(props: CarCardProps) {
  return (
    <div className="m-1.5 ">
      <div className="card w-96 bg-base-100 shadow-xl card hover:scale-105 hover:border hover:border-black cursor-pointer transition duration-300 ease-in-out">
        <figure>
          <img src={props.pictureUrl} alt={props.altText} />
        </figure>
        <div className="card-body font-sans">
          <h2 className="card-title font-sans">
            {props.brand} {props.model}
          </h2>
          <p>{props.pricePerDay} € / day</p>
          <p>{props.pricePerKm} € / Km</p>
          <p>
            Total rental price :{" "}
            <span className="font-bold">{props.totalPrice} €</span>
          </p>
          {/* <p className="font-sans">
              {data.availability.maxDuration} jour
            </p>
            <p className="font-sans">{data.availability.maxDistance} Km</p> */}
        </div>
      </div>
    </div>
  );
}
