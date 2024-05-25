import React, { useRef, useState, useEffect, useCallback } from 'react';
import './SlidingWindow.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArticleCard from './ArticleCard';
import {ReactComponent as PagingIcon} from '../../icons/paging.svg';

function SlidingWindow() {
    const settings = {
        customPaging: function(i) {
            return (
              <a>
                <PagingIcon style={{width: '15px', height: '10px'}}/>
              </a>
            );
        },
        dotsClass: "slick-dots slick-thumb",
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                slidesToShow: 3.75,
                slidesToScroll: 3.75
                }
            },
            {
                breakpoint: 1300,
                settings: {
                slidesToShow: 3.5,
                slidesToScroll: 3.5
                }
            },
            {
                breakpoint: 1200,
                settings: {
                slidesToShow: 3.25,
                slidesToScroll: 3.25
                }
            },
            {
                breakpoint: 1100,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                slidesToShow: 2.75,
                slidesToScroll: 2.75
                }
            },
            {
                breakpoint: 900,
                settings: {
                slidesToShow: 2.25,
                slidesToScroll: 2.25
                }
            },
            {
                breakpoint: 800,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                }
            },
            {
                breakpoint: 700,
                settings: {
                slidesToShow: 1.75,
                slidesToScroll: 1.75
                }
            },
            {
                breakpoint: 600,
                settings: {
                slidesToShow: 1.5,
                slidesToScroll: 1.5
                }
            },
            {
                breakpoint: 500,
                settings: {
                slidesToShow: 1.25,
                slidesToScroll: 1.25
                }
            },
            {
                breakpoint: 400,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
                }
            },
            {
                breakpoint: 286,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                }
            }

        ]
    };
    return (
        <div className="sliding-window">
            <Slider {...settings}>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
                <ArticleCard/>
            </Slider>
        </div>
    );

}

export default SlidingWindow;