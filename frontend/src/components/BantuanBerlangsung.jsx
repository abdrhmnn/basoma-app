import React from "react";

// components
import BantuanItem from "./BantuanItem";

// img
import img1 from "./../images/img1.jpg";

// npm packages
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const BantuanBerlangsung = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        arrows: false,
        centerMode: true,
        centerPadding: "100px",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: "50px"
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "80px"
                }
            }
        ]
    };

    return(
        <div className="bantuan-berlangsung">
            <h2>Bantuan Yang Sedang Berlangsung</h2>
            <Slider {...settings}>
                <div>
                    <BantuanItem img1={img1} />
                </div>
                <div>
                    <BantuanItem img1={img1} />
                </div>
                <div>
                    <BantuanItem img1={img1} />
                </div>
                <div>
                    <BantuanItem img1={img1} />
                </div>
                <div>
                    <BantuanItem img1={img1} />
                </div>
                <div>
                    <BantuanItem img1={img1} />
                </div>
                <div>
                    <BantuanItem img1={img1} />
                </div>
                <div>
                    <BantuanItem img1={img1} />
                </div>
                <div>
                    <BantuanItem img1={img1} />
                </div>
            </Slider>
        </div>
    )
}

export default BantuanBerlangsung