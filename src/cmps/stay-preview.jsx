import React from "react";
import { connect } from 'react-redux'
import { FaStar, } from "react-icons/fa";
import { onToggleLikeStay } from '../store/user.actions.js'

import LazyLoad from "./preview-slider"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { showErrorMsg } from "../services/event-bus.service.js";
import { userService } from "../services/user.service.js";

// ({ stay, history, onToggleLike,isLiked }
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
        if (user) {
            if (this.state.isLiked) {
                this.setState({ isLiked: !this.state.isLiked }, () => this.props.onToggleLikeStay(this.state.isLiked, { _id: stay._id }))
            } else {
                const savedStay = {
                    _id: stay._id,
                    reviews: {
                        rate: stay.reviews[0].rate,
                        reviewCount: stay.reviews.length
                    },
                    assetType: stay.assetType,
                    loc: stay.loc,
                    name: stay.name,
                    price: stay.price
                }
                this.setState({ isLiked: !this.state.isLiked }, () => this.props.onToggleLikeStay(this.state.isLiked, savedStay))
            }
        } else {
            showErrorMsg('Login First')
        }

    }
    isStayLiked = () => {
        const { user, stay } = this.props
        if (user) {
            if (user.mySaves.length) {
                const isLiked = user.mySaves.filter(saved => saved._id === stay._id)
                if (isLiked.length) {
                    this.setState({ isLiked: true })
                }
            }
        }
    }
    render() {
        return (
            <div className="stay-preview square-ratio" onClick={(ev) => {
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
                            <p className="preview-rating-amount">{this.props.stay.reviews.length > 0 ? this.props.stay.reviews[0].rate : 0}</p>
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
    onToggleLikeStay
}



export const StayPreview = connect(mapStateToProps, mapDispatchToProps)(_StayPreview)