import React from "react";



export class ReviewAvg extends React.Component {
    state = {
        totalAvg: 0
    }
    componentDidMount() {
        this.setState({ totalAvg: 0 })
    }
    getTotalAvg = () => {
        const { reviews } = this.props
        const { totalAvg } = this.state
        var total = totalAvg / 6
        total = total / reviews.length
        this.props.setReviewAvg(total.toFixed(3))
    }
    getAvrage = (type) => {
        const { reviews } = this.props
        const { totalAvg } = this.state
        var avgScore = 0;
        switch (type) {
            case 'cleanliness':
                reviews.map(review => avgScore += +review.cleanliness)
                avgScore = ((avgScore / reviews.length)).toFixed(3)
                this.setState({ totalAvg: (totalAvg + +avgScore) })
                return avgScore
            case 'communication':
                reviews.map(review => avgScore += +review.communication)
                avgScore = ((avgScore / reviews.length)).toFixed(3)
                this.setState({ totalAvg: (totalAvg + +avgScore) })
                return avgScore
            case 'checkIn':
                reviews.map(review => avgScore += +review.checkIn)
                avgScore = ((avgScore / reviews.length)).toFixed(3)
                this.setState({ totalAvg: (totalAvg + +avgScore) })
                return avgScore
            case 'accuracy':
                reviews.map(review => avgScore += +review.accuracy)
                avgScore = ((avgScore / reviews.length)).toFixed(3)
                this.setState({ totalAvg: (totalAvg + +avgScore) })
                return avgScore
            case 'location':
                reviews.map(review => avgScore += +review.location)
                avgScore = ((avgScore / reviews.length)).toFixed(3)
                this.setState({ totalAvg: (totalAvg + +avgScore) })
                return avgScore
            case 'value':
                reviews.map(review => avgScore += +review.value)
                avgScore = ((avgScore / reviews.length)).toFixed(3)
                this.setState({ totalAvg: (totalAvg + +avgScore) })
                return avgScore
        }
        this.getTotalAvg()
    }
    render() {
        return (
            <div className="review-avg-container flex " >
                <div className="left-review">
                    <div className="line flex">
                        <p className="line-title">Cleanliness</p>
                        <div className="line-loader-container">
                            <div className="line-loader" style={{ width: `${this.getAvrage('cleanliness') * 20}%` }}></div>
                        </div>
                        <div>
                            <p className="review-score">{this.getAvrage('cleanliness')}</p>
                        </div>
                    </div>
                    <div className="line flex">
                        <p className="line-title">Communication</p>
                        <div className="line-loader-container">
                            <div className="line-loader" style={{ width: `${this.getAvrage('communication') * 20}%` }}></div>
                        </div>
                        <div>
                            <p className="review-score">{this.getAvrage('communication')}</p>
                        </div>

                    </div>
                    <div className="line flex">
                        <p className="line-title">Check in</p>
                        <div className="line-loader-container">
                            <div className="line-loader" style={{ width: `${this.getAvrage('checkIn') * 20}%` }}></div>
                        </div>
                        <div>
                            <p className="review-score">{this.getAvrage('checkIn')}</p>
                        </div>
                    </div>
                </div>
                <div className="right-review">
                    <div className="line flex">
                        <p className="line-title">Accuracy</p>
                        <div className="line-loader-container ">
                            <div className="line-loader" style={{ width: `${this.getAvrage('accuracy') * 20}%` }}></div>
                        </div>
                        <div>
                            <p className="review-score">{this.getAvrage('accuracy')}</p>
                        </div>

                    </div>
                    <div className="line flex">
                        <p className="line-title">Location</p>
                        <div className="line-loader-container">
                            <div className="line-loader" style={{ width: `${this.getAvrage('location') * 20}%` }}></div>
                        </div>
                        <div>
                            <p className="review-score">{this.getAvrage('location')}</p>
                        </div>
                    </div>
                    <div className="line flex">
                        <p className="line-title">Value</p>
                        <div className="line-loader-container">
                            <div className="line-loader" style={{ width: `${this.getAvrage('value') * 20}%` }}></div>
                        </div>
                        <div>
                            <p className="review-score">{this.getAvrage('value')}</p>
                        </div>
                    </div>
                </div>
            </div >)
    }
}
