import { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import { onAddReview } from '../store/review.actions.js'
import { utilService } from '../services/util.service.js';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

class _AddReview extends Component {
    state = {
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

    }

    clearReview = () => {
        this.setState({
            newReview: {
                name: this.props.user.fullname,
                createdAt: `${new Date().getDate()}/${new Date().getMonth() + 1}`,
                txt: null,
                id: utilService.makeId(),
                review: {
                    cleanliness: null,
                    communication: null,
                    checkIn: null,
                    accuracy: null,
                    location: null,
                    value: null
                }
            }
        })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({ newReview: { ...prevState.newReview, [field]: value } }))
    }
    changeRating = (target) => {
        console.log(target);
    }

    formSubmited = (ev) => {
        this.setState(prevState => ({ newReview: { ...prevState.newReview, ['createdAt']: Date.now() } }))
        const review = this.state.newReview
        this.props.onAddReview(review)
    }

    render() {
        const { cleanliness, communication, checkIn, accuracy, location, value, txt } = this.state.newReview

        return (
            <div >
                <form action="" className="add-form flex column ">
                    <div className=" add-review-container flex ">

                        <div className="left-review">
                            <div className="line flex">
                                <p>Cleanliness</p>
                                <Rating
                                    name="cleanliness"
                                    onChange={this.changeRating}
                                    initialRating={cleanliness}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Communication</p>
                                <Rating
                                    onChange={this.changeRating}
                                    initialRating={cleanliness}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Check in</p>
                                <Rating
                                    onChange={this.changeRating}
                                    initialRating={cleanliness}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                        </div>
                        <div className="right-review">
                            <div className="line flex">
                                <p>Accuracy</p>
                                <Rating
                                    name="cleanliness"
                                    onChange={this.changeRating}
                                    initialRating={cleanliness}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Location</p>
                                <Rating
                                    onChange={this.changeRating}
                                    initialRating={cleanliness}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                            <div className="line flex">
                                <p>Value</p>
                                <Rating
                                    onChange={this.changeRating}
                                    initialRating={cleanliness}
                                    fullSymbol={<FaStar size={13} color="#FF5A5F" />}
                                    emptySymbol={<FaStar size={13} color="lightgray" border="1px solid #FF5A5F" />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="add-txt-container flex">
                        {/* <h4>Text</h4> */}
                        <input value={txt} className="review-input" onChange={this.handleChange} name="txt" />
                        <Button
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