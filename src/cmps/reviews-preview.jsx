// import { FaStar } from "react-icons/fa";
// import Rating from "react-rating";
// import { ReadMore } from "./_read-more";

export function ReviewsPreview({ review, onToogleReadModal, isReadMoreOn }) {
    return (
        <div className="review-card-container">
            <li >
                <div className="review-card flex column align-center" >
                    <div className="review-user-info flex">
                        <div className="user-review-img-container">
                            <img src={`https://i.pravatar.cc/100?u=${review.by._id}`} alt="" />
                        </div>
                        <div className="txt-info-container flex column">
                            <div className="review-username-container">
                                <p className="review-username">{review.by.fullname} </p>
                            </div>
                            <div className="review-username-container">
                                <p className="">{review.createdAt} </p>
                            </div>
                            {/* <div>
                    <p >{`${new Date(review.createdAt).getDate()}.${new Date(review.createdAt).getMonth() + 1}.${new Date(review.createdAt).getFullYear()}`}</p>
                </div> */}
                        </div>

                    </div>

                    <div className="review-txt-container">

                        {review.txt.length >= 100 && (
                            <p >{review.txt.substring(0, 100)} {review.txt.length > 100 && (<span className="read-more" onClick={onToogleReadModal}> More...</span>)}</p>
                        )}
                        {review.txt.length < 100 && <p  >{review.txt}</p>}
                    </div>

                </div>
            </li >
            {/* {isReadMoreOn && <ReadMore onToogleReadModal={onToogleReadModal} txt={review.txt} />} */}

        </div>
    )



}

