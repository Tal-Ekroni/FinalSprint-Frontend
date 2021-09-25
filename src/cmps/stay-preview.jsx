import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import {LazyLoad} from "./preview-slider"
export function StayPreview({ stay, history }) {

    return (
        // onClick={() => history.push(`/stay/${stay._id}`)}
        <div className="stay-preview" >

            <div className="preview-img square-ratio">
                {stay.imgUrls.length === 1 &&
                    <img src={stay.imgUrls[0]} alt="" />
                }
                {stay.imgUrls.length > 1 && <LazyLoad imgs={stay.imgUrls} />}
           
            </div>
            <div className="preview-rating flex">
                <p><FaStar size={13} color="#FF5A5F" /></p>
                <span>{stay.reviews[0].rate}</span>
                <span className="preview-review-count">( {stay.reviews.length} ) reviews</span>
            </div>
            <div className="stay-style flex">
                <h3>  {stay.assetType} <span> &#183;</span> {
                    stay.loc.address.split(',')[0]}  </h3>
            </div>
            <div className="stay-name">
                <h3>{stay.name}</h3>
            </div>
            <div className="preview-price">
                <h3>${stay.price} / night</h3>
            </div>
        </div>
    )
}

