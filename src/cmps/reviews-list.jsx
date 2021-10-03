// import { FaStar } from 'react-icons/fa'
import { ReviewsPreview } from './reviews-preview'
// import { ReviewAvg } from './_reviews-avg'

export function ReviewsList({ reviews, onToogleReadModal, isReadMoreOn }) {
    return (
        <section className="reviews-list-container flex ">
            {!reviews.length && <section className="reviews-container flex ">
                <p>No reviews to show...</p>
            </section>
            }
            {reviews.length && <section>
                <div>

                    {/* <div className="reviews-avgs-container">
                        <ReviewAvg reviews={reviews} />
                    </div> */}
                    <ul className="reviews-container flex space-between">
                        {reviews.slice(0, 6).map(review => <ReviewsPreview review={review} key={review.id} onToogleReadModal={onToogleReadModal} isReadMoreOn={isReadMoreOn} />)}
                    </ul>
                    {reviews.length > 6 &&
                        <div>
                            <button className="show-reviews-btn">Show all {reviews.length} reviews</button>
                        </div>}
                </div>
            </section>
            }

        </section>
    )
}
