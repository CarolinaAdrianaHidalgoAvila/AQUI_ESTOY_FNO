import Carousel from 'react-material-ui-carousel'
import ImageItem from './ImageItem.js'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


function CarouselImages(props) {
    const {imagesList, sx} = props
    var items = [
        "https://res.cloudinary.com/dmvbmrdak/image/upload/v1665684297/cld-sample.jpg",
        "https://res.cloudinary.com/dmvbmrdak/image/upload/v1669696532/rclgvmpagbuvmw4jsba6.gif",
        "https://res.cloudinary.com/dmvbmrdak/image/upload/v1669697314/r4cm8tqhzregebiaui2u.jpg",
        "https://res.cloudinary.com/dmvbmrdak/image/upload/v1665684298/cld-sample-3.jpg"
    ]

    const defaultSx = {
        width: 500,
        height: 500,
        margin: 5,
        alignSelf: "auto"
    }

    return ( 
        <Carousel
            sx={sx ?? defaultSx}
            autoPlay={false}
        >
            {
                items.map( (item, i) => <ImageItem key={i} imageUrl={item} alt={i} sx={sx ?? defaultSx}/> )
            }
        </Carousel>
    );
}

export default CarouselImages;