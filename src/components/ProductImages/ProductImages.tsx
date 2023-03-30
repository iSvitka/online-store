import { useState } from 'react';

import { IProductImages } from '../ProductPage/types';

import styles from './styles.module.scss';

function ProductImages(props: IProductImages) {
    const { thumbnail, images } = props;

    const [currentImage, setCurrentImage] = useState(thumbnail);

    return (
        <div className={styles.ProductImagesContainer}>
            <div className={styles.view}>
                <img className={styles.thumbnail} src={currentImage} alt="" />
            </div>

            <div className={styles.slides}>
                {images.map((item) => (
                    <button
                        className={styles.imageContainer}
                        type="button"
                        data-image={item}
                        onClick={(e) =>
                            setCurrentImage(
                                e.currentTarget.dataset.image as string
                            )
                        }
                    >
                        <img className={styles.slidesItem} src={item} alt="" />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProductImages;
