import React from "react";
import { connect } from 'react-redux'
import { FaStar, } from "react-icons/fa";
import { onToggleLikedStay, updateUser } from '../store/user.actions.js'

import LazyLoad from "./preview-slider"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { showErrorMsg } from "../services/event-bus.service.js";
class _StayPreview extends React.Component {
    state = {
        isLiked: false
    }
    componentDidMount() {
        this.isStayLiked()
    }
    onToggleLikeStay = (ev, stay) => {
        ev.stopPropagation()
        const { user } = this.props
        const { isLiked } = this.state
        if (user) {
            this.setState({ isLiked: !isLiked }, () => {
                this.props.onToggleLikedStay(stay._id, !isLiked, user._id)
            })
        }
        else {
            showErrorMsg('Login First')
        }
    }
    isStayLiked = () => {
        const { user, stay } = this.props
        if (user) {
            if (user.mySaves && user.mySaves.length) {
                const isLiked = user.mySaves.filter(saved => saved === stay._id)
                if (isLiked.length) {
                    this.setState({ isLiked: true })
                }
            }
        }
    }
    render() {
        return (
            <div>

                {this.props.stay.name && <div className="stay-preview square-ratio" onClick={(ev) => {
                    if (ev.target.className === 'slick-arrow slick-prev' || ev.target.className === 'slick-arrow slick-next' || ev.target.className.baseVal === 'MuiSvgIcon-root') return
                    this.props.history.push(`/stay/${this.props.stay._id}`)
                }} >
                    <div className="preview-wrapper flex column">
                        <div className="preview-img   ">
                            {!this.state.isLiked && <FavoriteBorderIcon onClick={(ev) => this.onToggleLikeStay(ev, this.props.stay)} />}
                            {this.state.isLiked && <FavoriteIcon onClick={(ev) => this.onToggleLikeStay(ev, this.props.stay)} />}
                            <LazyLoad imgs={this.props.stay.imgUrls} />
                        </div>
                        <div className="preview-details ">
                            <span className="preview-rating flex align-center">
                                <FaStar size={13} color="#FF5A5F" />
                                <p className="preview-rating-amount">{this.props.stay.reviewsAvg ? this.props.stay.reviewsAvg : 0}</p>
                                <span className="preview-review-count flex"><span>(</span>{this.props.stay.reviews.length} {this.props.stay.reviews.length === 1 ? 'review' : 'reviews'}<span>)</span></span>
                            </span>
                            <div className="stay-style flex">
                                <h3><span>{this.props.stay.assetType}</span> &#183; <span>{this.props.stay.loc.address.split(',')[0]}</span></h3>
                            </div>
                            <div className="stay-name" >
                                <h3>{this.props.stay.name}</h3>
                            </div>
                            <div className="preview-price" >
                                <h3><span className="preview-price-amount">${this.props.stay.price}</span> / night</h3>
                            </div>
                        </div>
                    </div>
                </div>}
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
    onToggleLikedStay,
    updateUser
}



export const StayPreview = connect(mapStateToProps, mapDispatchToProps)(_StayPreview)