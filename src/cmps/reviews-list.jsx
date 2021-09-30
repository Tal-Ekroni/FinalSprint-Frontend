import { FaStar } from 'react-icons/fa'
import { ReviewsPreview } from './reviews-preview'
import { ReviewAvg } from './_reviews-avg'

export function ReviewsList({ reviews,onToogleReadModal,isReadMoreOn }) {
    return (
        <section className="reviews-section-container flex space-between">
            {!reviews.length && <section className="reviews-container flex space-between">
                <p>No reviews to show...</p>
            </section>
            }
            {reviews.length && <section>
                <div>
                  
                    {/* <div className="reviews-avgs-container">
                        <ReviewAvg reviews={reviews} />
                    </div> */}
                    <ul className="reviews-container flex space-between ">
                        {reviews.map(review => <ReviewsPreview review={review} key={review.id}  onToogleReadModal={onToogleReadModal} isReadMoreOn={isReadMoreOn}/>)}

                    </ul>
                </div>
            </section>
            }

        </section>
    )
}
