import React from "react";



export class ReviewAvg extends React.Component {
    getAvrage = (type) => {
        const { reviews } = this.props
        var avgScore;
        reviews.map(review => avgScore += review.type)
        avgScore = ((avgScore / 5) * 100).toFixed(3)
        console.log('avg', type);
        return avgScore
    }
    render() {
        return (
            <div className="review-avg-container flex " >
                <div className="left-review">
                    <div className="line flex">
                        <p>Cleanliness</p>
                        <div className="line-loader-container">
                            <div className="line-loader" style={{ width: `${this.getAvrage('cleanliness')}%` }}></div>
                        </div>
                    </div>
                    <div className="line flex">
                        <p>Communication</p>

                    </div>
                    <div className="line flex">
                        <p>Check in</p>

                    </div>
                </div>
                <div className="right-review">
                    <div className="line flex">
                        <p>Accuracy</p>

                    </div>
                    <div className="line flex">
                        <p>Location</p>

                    </div>
                    <div className="line flex">
                        <p>Value</p>

                    </div>
                </div>
            </div>)
    }
}
