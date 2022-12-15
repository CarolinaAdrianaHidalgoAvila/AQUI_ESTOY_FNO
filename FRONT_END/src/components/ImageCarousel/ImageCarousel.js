import Carousel from 'react-material-ui-carousel'
import ImageItem from './ImageItem.js'



function CarouselImages(props) {
    const {imagesList, sx} = props

    const defaultSx = {
        width: 500,
        height: 500,
        margin: 5,
        alignSelf: "center"
    }

    return ( 
        <Carousel
            sx={sx ?? defaultSx}
            autoPlay={false}
            animation="slide"
            indicators={true}
        >
            {
                imagesList.map( (item, i) => <ImageItem key={i} imageUrl={item} alt={i} sx={sx ?? defaultSx}/> )
            }
        </Carousel>
    );
}

export default CarouselImages;