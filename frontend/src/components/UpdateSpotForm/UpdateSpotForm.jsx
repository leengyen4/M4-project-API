import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addImageToSpot, updatedSpot, getSpotDetails } from "../../store/spots";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import styles from '../CreateSpotForm/CreateSpot.module.css'


function UpdateSpotForm() {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spot.spots[spotId]);
    console.log(spot)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getSpotDetails(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        if (spot) {
            setCountry(spot.country);
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setDescription(spot.description);
            setName(spot.name);
            setPrice(spot.price);
            if (spot.SpotImages) {
                const previewImageObj = spot.SpotImages.find(img => img.preview === true);
                const nonPreviewImages = spot.SpotImages.filter(img => img.preview === false);
                setPreviewImage(previewImageObj ? previewImageObj.url : '');
                setImage1(nonPreviewImages[0] ? nonPreviewImages[0].url : '');
                setImage2(nonPreviewImages[1] ? nonPreviewImages[1].url : '');
                setImage3(nonPreviewImages[2] ? nonPreviewImages[2].url : '');
                setImage4(nonPreviewImages[3] ? nonPreviewImages[3].url : '');
            }
        }
    }, [spot]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        const imageRegex = /\.(png|jpe?g)$/i;
        if (!country) newErrors.country = 'Country is required';
        if (!address) newErrors.address = 'Address is required';
        if (!city) newErrors.city = 'City is required';
        if (!state) newErrors.state = 'State is required';
        if (description.length < 30) newErrors.description = 'Description needs a minimum of 30 characters';
        if (!name) newErrors.name = 'Name is required';
        if (!price) newErrors.price = 'Price is required';
        if (!previewImage) newErrors.previewImage = 'Preview image is required';
        if (!imageRegex.test(previewImage)) newErrors.previewImage = 'Preview Image URL must end in .png, .jpg, or .jpeg';
        if (image1 && !imageRegex.test(image1)) newErrors.image1 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (image2 && !imageRegex.test(image2)) newErrors.image2 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (image3 && !imageRegex.test(image3)) newErrors.image3 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (image4 && !imageRegex.test(image4)) newErrors.image4 = 'Image URL must end in .png, .jpg, or .jpeg';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const updatedSpotData = {
                country,
                address,
                city,
                state,
                description,
                name,
                price,
            };

            let updatedSpotResponse = await dispatch(updatedSpot(spotId, updatedSpotData));
            if (updatedSpotResponse && updatedSpotResponse.id) {
                const spotId = updatedSpotResponse.id;

                const images = [
                    ...(previewImage ? [{ url: previewImage, preview: true }] : []),
                    ...(image1 ? [{ url: image1, preview: false }] : []),
                    ...(image2 ? [{ url: image2, preview: false }] : []),
                    ...(image3 ? [{ url: image3, preview: false }] : []),
                    ...(image4 ? [{ url: image4, preview: false }] : []),
                ];

                for (const image of images) {
                    await dispatch(addImageToSpot(spotId, image.url, image.preview));
                    console.log('Done!')
                }

                navigate(`/spots/${spotId}`);
            }
        }
    };

    return (
        <main className={styles.main}>
            <h2 className={styles.title}>Create a new Spot</h2>
            <h4 className={styles.subtitle}>Wheres your place located?</h4>
            <p>Guests will only get your exact address once they booked a reservation</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Country
                    <input
                        className={styles.input}
                        placeholder="Country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    {errors.country && <p className={styles.error}>{errors.country}</p>}
                </label>
                <label className={styles.label}>
                    Street Address
                    <input
                        className={styles.input}
                        placeholder="Address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <p className={styles.error}>{errors.address}</p>}
                </label>
                <div className={styles.cityState}>
                    <label className={styles.label}>
                        City
                        <input
                            className={styles.input}
                            placeholder="City"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {errors.city && <p className={styles.error}>{errors.city}</p>}
                    </label>
                    <label className={styles.label}>
                        State
                        <input
                            className={styles.input}
                            placeholder="State"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        {errors.state && <p className={styles.error}>{errors.state}</p>}
                    </label>
                </div>
                <div className={styles.description}>
                    <h4>Describe your place to guests</h4>
                    <p>
                        Mention the best features of your space, any special amentities like
                        fast wifi or parking, and what you love about the neighborhood.
                    </p>
                    <textarea
                        className={styles.textarea}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className={styles.error}>{errors.description}</p>}
                </div>
                <label className={styles.label}>
                    Name
                    <input
                        className={styles.input}
                        placeholder="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className={styles.error}>{errors.name}</p>}
                </label>
                <div className={styles.price}>
                    <h4>Set a base price for your spot</h4>
                    <p>Competitive pricing can help your listing stand out and rank higher
                        in search results.
                    </p>
                    <div className={styles.wrapper}>
                        <p id={styles.dollarsign}>$</p>
                        <input
                            className={styles.input}
                            placeholder="Price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {errors.price && <p className={styles.error}>{errors.price}</p>}
                    </div>
                </div>
                <h4>Liven up your spot with photos</h4>
                <p>Submit a link to at least one photo to publish your spot.</p>

                <input
                    className={styles.input}
                    placeholder="Preview Image URL"
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                />
                {errors.previewImage && <p className={styles.error}>{errors.previewImage}</p>}


                <input
                    className={styles.input}
                    placeholder="Image URL"
                    type="text"
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                />
                {errors.image1 && <p className={styles.error}>{errors.image1}</p>}

                <input
                    className={styles.input}
                    placeholder="Image URL"
                    type="text"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                />
                {errors.image2 && <p className={styles.error}>{errors.image2}</p>}

                <input
                    className={styles.input}
                    placeholder="Image URL"
                    type="text"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                />
                {errors.image3 && <p className={styles.error}>{errors.image3}</p>}

                <input
                    className={styles.input}
                    placeholder="Image URL"
                    type="text"
                    value={image4}
                    onChange={(e) => setImage4(e.target.value)}
                />
                {errors.image4 && <p className={styles.error}>{errors.image4}</p>}

                <button className={styles.button} type="submit">Create Spot</button>
            </form>
        </main>
    );
}

export default UpdateSpotForm;
