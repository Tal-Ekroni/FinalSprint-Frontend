import { HostStayPreview } from "./host-stay-preview";

export function HostStayslist({ stays }) {
    // console.log('orderspage',orders,isHost);
    return (
        <div className="order-list flex">
            {stays.map((stay, idx) =>
                <HostStayPreview key={idx} stay={stay} />
            )}
        </div>)
}