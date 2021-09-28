import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LazyLoad from "./preview-slider"
export function StayPreview({ stay, history }) {

    return (
        <div className="stay-preview" onClick={(ev) => {
            if(ev.target.type==='button') return
            history.push(`/stay/${stay._id}`)
        }}>

            <div className="preview-img">
                <LazyLoad imgs={stay.imgUrls} />
            </div>
            <div className="preview-details">

            <div className="preview-rating flex">
                <p><FaStar size={13} color="#FF5A5F" /></p>
                <span>{stay.reviews[0].rate}</span>
                <span className="preview-review-count">( {stay.reviews.length} ) reviews</span>
            </div>
            <div className="stay-style flex" >
                <h3><span>{stay.assetType}</span> &#183; <span>{stay.loc.address.split(',')[0]}</span></h3>
                {/* <h3>  {stay.assetType} <span> &#183;</span> {
                    stay.loc.address.split(',')[0]}  </h3> */}
            </div>
            <div className="stay-name" >
                <h3>{stay.name}</h3>
            </div>
            <div className="preview-price" >
                <h3><span>${stay.price}</span> / night</h3>
            </div>
        </div>
            </div>
    )
}

