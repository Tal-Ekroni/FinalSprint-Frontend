import { HostStayPreview } from "./host-stay-preview";

export function HostStayslist({ stays }) {
    return (
        <div className="order-list flex">
            {stays.map((stay, idx) =>
                <HostStayPreview key={idx} stay={stay} />
            )}
        </div>)
}