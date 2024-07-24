import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Item from './Item';

// import logo from "../Images/Login.jpg"

import logo from "../../Images/Login.jpg";
import logo1 from "../../Images/Logo2.jpg";


function ImageSlider() {
    const images = [
        {
            id: 1,
            imgPath: logo,
        },
        {
            id: 2,
            imgPath: logo,
        },
        {
            id: 3,
            imgPath: logo,
        },
        {
            id: 4,
            imgPath: logo,
        },
    ];



    return (
        <Carousel className='homePageSlider' animation='slide' indicators={false} navButtonsAlwaysInvisible={true}   indicatorContainerProps={{
            style: {
              marginTop: "-50px"
            },
          }} >
            {
                images.map((image, i) => <Item key={image.id} item={image} />)
            }
        </Carousel>
    )
}

export default ImageSlider