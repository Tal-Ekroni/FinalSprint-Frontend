import { FaStar } from "react-icons/fa";
export function StayPreview({ stay, history }) {
   
    return (
        <div className="stay-preview" onClick={() => history.push(`/stay/${stay._id}`)}>
            <div className="preview-img square-ratio">
                <img src={stay.imgUrls[0]} alt="Stay Preview Img" />
            </div>
            <div className="preview-rating flex">
                <p><FaStar size={13} color="#FF5A5F" /></p>
                <span>{stay.reviews[0].rate}</span>
                <span className="preview-review-count">( {stay.reviews.length} )</span>
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