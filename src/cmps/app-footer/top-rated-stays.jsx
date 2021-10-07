import { Link } from "react-router-dom"

export function TopRatedStays({ stays, history }) {
    console.log('from toprated', history)
    return (
        <section className="flex column top-rated-stays ">
            {
                stays.map(stay =>
                    <div  key={stay._id} className="flex column stay-links">
                        <Link to={`/stay/${stay._id}`}>{stay.name}</Link>
                    </div>
                )
            }
        </section>
    )
}