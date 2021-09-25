import React from 'react'
import Slider from "react-slick";

export class LazyLoad extends React.Component {
    sliders=()=> {
        return this.props.imgs.map(img => {
            return (
                <div key={img}>
                    <img alt="image" src={img} />
                </div>
            )
        });
    }

    render() {
        const settings = {
            dots: true,
            lazyLoad: true,
            infinite: true,
            fade: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
        };

        const { imgs } = this.props

        return (
            <div >
                <Slider {...settings}>
                    {this.sliders()}
                </Slider>
            </div>
        );
    }
}