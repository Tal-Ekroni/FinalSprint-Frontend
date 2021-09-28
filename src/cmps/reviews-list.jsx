import { FaStar } from 'react-icons/fa'
import { ReviewsPreview } from './reviews-preview'

export function ReviewsList({ reviews }) {
    return (
        <section className="reviews-section-container flex space-between">
            {!reviews.length && <section className="reviews-container flex space-between">
                <p>No reviews to show...</p>
            </section>
            }
            {reviews.length && <section>
                <div>
                    <div className="reviews-sec-title-container">
                        <h1 className="reviews-section-title flex" ><FaStar />5 Reviews<span>•</span>{reviews.length} Reviews</h1>
                    </div>
                    <ul className="reviews-container flex space-between ">
                        {reviews.map(review => <ReviewsPreview review={review} key={review.id} />)}
                    </ul>
                </div>
            </section>
            }

        </section>
    )
}
