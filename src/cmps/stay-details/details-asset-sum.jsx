import { FaHome, FaBroom, FaDoorClosed, FaKey } from 'react-icons/fa'

export function AssetSum(stay){
    return(       <div className="asset-sum">
    <div className="asset-sum-item flex">
        <div className="sum-icon-container">
            <FaHome className="sum-icon" />
        </div>
        <div className="sum-txt">
            <h4>Entire Home</h4>
            <p>You’ll have the apartment to yourself.</p>
        </div>
    </div>
    <div className="asset-sum-item flex">
        <div className="sum-icon-container">
            <FaBroom className="sum-icon" />
        </div>
        <div className="sum-txt">
            <h4>Enhanced Clean Home</h4>
            <p>This host committed to Airbnb's 5-step enhanced cleaning process.</p>
        </div>
    </div>
    <div className="asset-sum-item flex">
        <div className="sum-icon-container">
            <FaDoorClosed className="sum-icon" />
        </div>
        <div className="sum-txt">
            <h4>Self check-in</h4>
            <p>Check yourself in with the lockbox.</p>
        </div>
    </div>
    <div className="asset-sum-item flex">
        <div className="sum-icon-container">
            <FaKey className="sum-icon" />
        </div>
        <div className="sum-txt">
            <h4>Great check-in experience</h4>
            <p>95% of recent guests gave the check-in process a 5-star rating.</p>
        </div>
    </div>
</div>)
}