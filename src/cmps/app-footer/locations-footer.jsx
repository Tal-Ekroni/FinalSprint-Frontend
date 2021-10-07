import { Link } from "react-router-dom"
const locations = [{ city: 'Porto', country: 'Portugal' }, { city: 'Barcelona', country: 'Spain' }, { city: 'Tel Aviv', country: 'Israel' }, { city: 'Paris', country: "France" }, { city: 'London', country: 'United Kingdom' }, { city: 'New York', country: 'United States' }, { city: 'Amsterdam', country: 'Netherlands' }, { city: 'Rome', country: 'Italy' }]
export function FooterLocations() {
    return (
        <div className='flex column footer-locations'>
            {
                locations.map(loc =><Link to={`/explore/?location=${loc.city}`}>{loc.city},{loc.country}</Link>)
            }
        </div>
    )
}