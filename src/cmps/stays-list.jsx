import { StayPreview } from "./stay-preview";

export function StaysList({stays}) {
    return (
        <div className="stay-list  ">
            {stays.map((stay, idx) =>
                <StayPreview key={idx} stay={stay} />
)}
        </div>)
}