import { useLayoutEffect, useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { IProductImages } from '../ProductPage/types';

function ProductImages(props: IProductImages) {
    const { thumbnail, images } = props;

    const [currentImage, setCurrentImage] = useState<string>(thumbnail);
    const [filteredImages, setFilteredImages] = useState<string[]>([]);

    useLayoutEffect(() => {

        const getBase64Image = (img: HTMLImageElement) => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
            }
            const dataURL = canvas.toDataURL('image/png');
    
            return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
        }

        const filterImages = async () => {
            const imgArr = [thumbnail, ...images];
            const based64Images: string[] = await Promise.all([...imgArr].map((img) => (
                new Promise<HTMLImageElement>((res, rej) => {
                    const imgObj = new Image();
                    imgObj.crossOrigin = 'anonymous'
                    imgObj.src = img;

                    imgObj.onload = () => res(imgObj)
                    imgObj.onerror = () => rej(new Error('server error'))
                }).then(res => getBase64Image(res), () => 'error')
            )))
            if(based64Images.includes('error')) {
                return images;
            }
            const filteredBased64Images = new Set(based64Images);
            const filteredImgArr: string[] = [];
            based64Images.forEach((img, index) => {
                if (filteredBased64Images.has(img)) {
                    filteredImgArr.push(imgArr[index]);
                    filteredBased64Images.delete(img);
                }
            });

            return filteredImgArr;
        };

        filterImages().then((res) => {
            setFilteredImages(res);
            setCurrentImage(res[0]);
        })
    }, [images, thumbnail]);

    return (
        <div className={styles.ProductImagesContainer}>
            <div className={styles.view}>
                <img
                    className={styles.thumbnail}
                    src={currentImage}
                    alt={currentImage.split('/').slice(-1).join('')}
                />
            </div>
            <div className={styles.slidesCont}>
                <div className={styles.slides}>
                    {filteredImages.map((item) => (
                        <button
                            className={cn(styles.imageContainer, {
                                [styles.imageContainerActive]:
                                    currentImage === item,
                            })}
                            type="button"
                            data-image={item}
                            onClick={(e) =>
                                setCurrentImage(
                                    e.currentTarget.dataset.image as string
                                )
                            }
                            key={item}
                        >
                            <img
                                className={styles.slidesItem}
                                src={item}
                                alt={item.split('/').slice(-1).join('')}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductImages;
