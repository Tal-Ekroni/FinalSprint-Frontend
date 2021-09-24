export function StaysList({stays}) {
    return (
        <div>
            {stays.map((stay, idx) =>
                <div key={idx}>{stay.name}</div>
            )}
        </div>)
}