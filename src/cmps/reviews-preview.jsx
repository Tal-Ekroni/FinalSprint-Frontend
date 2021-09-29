import { FaStar } from "react-icons/fa";
import Rating from "react-rating";

export function ReviewsPreview({ review }) {
    return (
        <li className="review-card-container">

            <div className="review-card" >
                <div className="review-user-info flex space-between">

                    <div className="txt-info-container flex">
                        <div className ="review-username-container">
                            <p className="review-username">{review.by.fullname} </p>
                        </div>
                        {/* <div>
                    <p >{`${new Date(review.createdAt).getDate()}.${new Date(review.createdAt).getMonth() + 1}.${new Date(review.createdAt).getFullYear()}`}</p>
                    </div> */}
                    </div>
                    <div className="user-review-img-container">
                    <img src={`https://i.pravatar.cc/100?u=${review.by._id}`} alt="" />
                    </div>
                </div>
                <div className="review-stars-container">
                    <Rating
                    readonly
                    initialRating={review.rate}
                    fullSymbol= {<FaStar size={13} color="#FF5A5F" />}
                    emptySymbol= {<FaStar size={13} color="lightgray" border="1px solid #FF5A5F"/>}
                    />
                </div>
                <div className="review-txt-container">
                    <p>"{review.txt}"</p>
                </div>

            </div>
        </li >

    )



}

