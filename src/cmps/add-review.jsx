import { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import { onAddReview } from '../store/review.actions.js'
import { utilService } from '../services/util.service.js';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

class _AddReview extends Component {
    state = {
        newReview: {
            by: {
                fullname: this.props.user.fullname,
                _id: this.props.user._id,
                imgUrl: this.props.user.imgUrl
            },
            createdAt: null,
            txt: null,
            id: utilService.makeId(8),
            cleanliness: null,
            communication: null,
            checkIn: null,
            accuracy: null,
            location: null,
            value: null
        }

    }

    clearReview = () => {
        this.setState({
            newReview: {
                name: this.props.user.fullname,
                createdAt: null,
                txt: null,
                id: utilService.makeId(),
                cleanliness: null,
                communication: null,
                checkIn: null,
                accuracy: null,
                location: null,
                value: null
            }
        })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({ newReview: { ...prevState.newReview, [field]: value } }))
    }
    changeRating = (score, name) => {
        this.setState(prevState => ({ newReview: { ...prevState.newReview, [name]: score } }))
    }

    formSubmited = (ev) => {
        ev.preventDefault()
        this.setState(prevState => ({ newReview: { ...prevState.newReview, ['createdAt']: Date.now() } }), () => {
            const review = this.state.newReview
            this.props.onAddReview(review)
            this.clearReview()
        })
    }

    render() {
        const { cleanliness, communication, checkIn, accuracy, location, value, txt } = this.state.newReview

        return (
            <div >
                <div className="add-review-title-container">
                    <h3>Add review</h3>
                </div>
                <form action="" className="add-form flex column " onSubmit={this.formSubmited}>
                    <div className=" add-review-container flex ">

                        <div className="left-review">
                            <div className="line flex">
                                <p>Cleanliness</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'cleanliness')}
                                    initialRating={cleanliness}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Communication</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'communication')}
                                    initialRating={communication}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Check in</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'checkIn')}
                                    initialRating={checkIn}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                        </div>
                        <div className="right-review">
                            <div className="line flex">
                                <p>Accuracy</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'accuracy')}
                                    initialRating={accuracy}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Location</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'location')}
                                    initialRating={location}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Value</p>
                                <Rating
                                    onChange={(ev) => this.changeRating(ev, 'value')}
                                    initialRating={value}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="add-txt-container flex">
                        {/* <h4>Text</h4> */}
                        <input value={txt}
                            placeholder="Write you opinion about this stay..."
                            className="review-input" onChange={this.handleChange}
                            name="txt"
                            autoComplete="off" />
                    </div>
                    <div>

                        <Button
                            className="add-review-btn"
                            variant={'contained'}
                            color={'primary'}
                            type="submit"
                        >
                            Add
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    onAddReview
}
export const AddReview = connect(mapStateToProps, mapDispatchToProps)(_AddReview)
// export const AddReview = connect(mapStateToProps)(_AddReview)