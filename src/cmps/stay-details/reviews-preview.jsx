// import { FaStar } from "react-icons/fa";
// import Rating from "react-rating";
// import { ReadMore } from "./_read-more";

import { Component } from "react";
import { utilService } from "../../services/util.service";
import { ReadMore } from "../_read-more";

export class ReviewsPreview extends Component {
    state = {
        isReadMoreOn: false
    }
    onToogleReadModal = () => {
        this.setState({ isReadMoreOn: !this.state.isReadMoreOn })
    }
    render() {
        const { review } = this.props
        const { isReadMoreOn } = this.state
        return (
            <div className="review-card-container">
                <li >
                    <div className="review-card flex column align-center" >
                        <div className="review-user-info flex">
                            <div className="user-review-img-container">
                                <img src={`https://i.pravatar.cc/100?u=${review.by._id.substr(review.by._id.length - 9)}`} alt="" />
                            </div>
                            <div className="txt-info-container flex column">
                                <div className="review-username-container">
                                    <p className="review-username">{review.by.fullname} </p>
                                </div>
                                <div className="review-username-container">
                                    {typeof review.createdAt === 'number' ? <p >{utilService.timeToShow(review.createdAt)} </p> : <p >{review.createdAt} </p>}
                                </div>
                            </div>
                        </div>

                        <div className="review-txt-container">

                            {review.txt && review.txt.length >= 100 && (
                                <p >{review.txt.substring(0, 100)} {review.txt.length > 100 && (<span className="read-more" onClick={this.onToogleReadModal}><br /> More...</span>)}</p>
                            )}

                            {review.txt && review.txt.length < 100 && <p  >{review.txt}</p>}
                        </div>

                    </div>
                </li >
                {isReadMoreOn && <ReadMore onToogleReadModal={this.onToogleReadModal} txt={review.txt} />}

            </div>
        )
    }



}

