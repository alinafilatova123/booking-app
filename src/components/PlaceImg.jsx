import { BASE_URL } from "../../urls"

const PlaceImg = ({place, index = 0, className = 'object-cover'}) => {
    if (!place.photos?.length) return ''
    return (
        <img className={className} src={BASE_URL + '/uploads/' + place.photos[index]} alt={'place-img'} />
    )
}

export default PlaceImg