import { FaStar, FaMedal, FaUpload, FaHeart } from 'react-icons/fa'
export function BasicInfo({ stay }) {
    return (
        <section>
            <section className="stay-info">
                <div className="stay-name-conatiner">
                    <h2>{stay.name}</h2>
                </div>
                <section className="flex space-between">
                    <div className="stay-info-conatiner flex">
                        <div className="stay-review-avg flex align-end">
                            <p><FaStar size={13} color="#FF5A5F" /></p>
                            <p>4.9</p>
                            <p>{`(${stay.reviews.length} reviews)`}</p>
                        </div>
                        <p>•</p>
                        <div className="host-level-container flex align-end">
                            <p><FaMedal size={13} color="#FF5A5F" /></p>
                            <p>Superhost</p>
                        </div>
                        <p>•</p>
                        <div className="host-location-container flex align-end">
                            <p className="info-line-loc">{stay.loc.address}</p>
                        </div>
                    </div>
                    <div className="user-btns-container flex">
                        <div className="share-btn-container flex align-end">
                            <p><FaUpload size={13} /></p>
                            <p>Share</p>
                        </div>
                        <div className="save-btn-container flex align-end">
                            <p><FaHeart size={13} /></p>
                            <p>Save</p>
                        </div>
                    </div>
                </section>
            </section>
            <section className="asset-imgs-container flex ">
                <div className="primary-img square-ratio"><img src={stay.imgUrls[0]} alt="" /></div>
                <div className="imgs-container flex">
                    <div className="asset-img square-ratio"><img src={stay.imgUrls[0]} alt="" /></div>
                    <div className="asset-img square-ratio"><img src={stay.imgUrls[0]} alt="" /></div>
                </div>
                <div className="imgs-container flex">
                    <div className="asset-img square-ratio"><img src={stay.imgUrls[0]} alt="" /></div>
                    <div className="asset-img square-ratio"><img src={stay.imgUrls[0]} alt="" /></div>
                </div>
            </section>
        </section>
    )

}