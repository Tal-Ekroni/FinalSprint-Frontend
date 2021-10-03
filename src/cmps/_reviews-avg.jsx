import React from "react";
import { FaStar } from "react-icons/fa";

export class ReviewAvg extends React.Component {
    state = {
        totalAvg: 0
    }
    componentDidMount() {
        this.setState({ totalAvg: 0 })

    }
    getAvrage = (type) => {
        const { reviews } = this.props
        var avgScore = 0;
        var newTotalAvg = this.state.totalAvg
        switch (type) {
            case 'cleanliness':
                reviews.map(review => avgScore += +review.cleanliness)
                avgScore = ((avgScore / reviews.length)).toFixed(2)
                break
            case 'communication':
                reviews.map(review => avgScore += +review.communication)
                avgScore = ((avgScore / reviews.length)).toFixed(2)
                break
            case 'checkIn':
                reviews.map(review => avgScore += +review.checkIn)
                avgScore = ((avgScore / reviews.length)).toFixed(2)
                break
            case 'accuracy':
                reviews.map(review => avgScore += +review.accuracy)
                avgScore = ((avgScore / reviews.length)).toFixed(2)
                break
            case 'location':
                reviews.map(review => avgScore += +review.location)
                avgScore = ((avgScore / reviews.length)).toFixed(2)
                break
            case 'value':
                reviews.map(review => avgScore += +review.value)
                avgScore = ((avgScore / reviews.length)).toFixed(2)
                break
        }
        return avgScore

    }
    // getTotalAvg = () => {
    //     const { reviews } = this.props
    //     const { totalAvg } = this.state
    //     console.log('total', totalAvg);

    // }
    render() {
        const { reviews } = this.props

        return (
            <section>
                <div className="reviews-sec-title-container">
                    <h1 className="reviews-section-title flex" ><FaStar
                        size={15}
                        color="#FF5A5F" />Reviews<span>•</span>{reviews.length} Reviews</h1>
                </div>
                <div className="review-avg-container flex space-between" >
                    <div className="left-review">
                        <div className="line flex align-center space-between">
                            <p className="line-title">Cleanliness</p>
                            <div className="loader-container flex align-center space-between">
                                <div className="line-loader-container">
                                    <div className="line-loader" style={{ width: `${this.getAvrage('cleanliness') * 20}%` }}></div>
                                </div>
                                <p className="review-score">{this.getAvrage('cleanliness')}</p>
                            </div>
                        </div>
                        <div className="line flex align-center space-between">
                            <p className="line-title">Communication</p>
                            <div className="loader-container flex align-center space-between">
                                <div className="line-loader-container">
                                    <div className="line-loader" style={{ width: `${this.getAvrage('communication') * 20}%` }}></div>
                                </div>
                                <p className="review-score">{this.getAvrage('communication')}</p>
                            </div>

                        </div>
                        <div className="line flex align-center space-between">
                            <p className="line-title">Check in</p>
                            <div className="loader-container flex align-center space-between">
                                <div className="line-loader-container">
                                    <div className="line-loader" style={{ width: `${this.getAvrage('checkIn') * 20}%` }}></div>
                                </div>
                                <p className="review-score">{this.getAvrage('checkIn')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="right-review">
                        <div className="line flex align-center space-between">
                            <p className="line-title">Accuracy</p>
                            <div className="loader-container flex align-center space-between">
                                <div className="line-loader-container ">
                                    <div className="line-loader" style={{ width: `${this.getAvrage('accuracy') * 20}%` }}></div>
                                </div>
                                <p className="review-score">{this.getAvrage('accuracy')}</p>
                            </div>

                        </div>
                        <div className="line flex align-center space-between">
                            <p className="line-title">Location</p>
                            <div className="loader-container flex align-center space-between">
                                <div className="line-loader-container">
                                    <div className="line-loader" style={{ width: `${this.getAvrage('location') * 20}%` }}></div>
                                </div>
                                <p className="review-score">{this.getAvrage('location')}</p>
                            </div>
                        </div>
                        <div className="line flex align-center space-between">
                            <p className="line-title">Value</p>
                            <div className="loader-container flex align-center space-between">
                                <div className="line-loader-container">
                                    <div className="line-loader" style={{ width: `${this.getAvrage('value') * 20}%` }}></div>
                                </div>
                                <p className="review-score">{this.getAvrage('value')}</p>
                            </div>
                        </div>
                    </div>
                </div >
            </section>
        )
    }
}
