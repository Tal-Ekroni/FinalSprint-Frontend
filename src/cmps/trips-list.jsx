import { TripPreview } from "./trip-preview";

export function TripsList({ trips, isHost, stays }) {
    // console.log('tripspage',trips,isHost);
    return (
        <div className="trip-list">
            {trips.map((trip, idx) =>
                <TripPreview key={idx}  trip={trip} />
            )}
        </div>)
}