import { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { CartProduct } from '../CartProduct/CartProduct';
import { CartContext } from '../../lib/CartContext/CartContext';
import Button from '../../generics/Button/Button';

import { ICartProducts } from '../../lib/CartContext/types';
import { IProductData } from '../ProductPage/types';

import styles from './style.module.scss';

function Products({ totalPrice }: ICartProducts) {
    const { cartData, openModal } = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const [productsData, setProductsData] = useState<Array<IProductData>>([]);
    const [queryParams, setQueryParams] = useSearchParams()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(3)
    
    useEffect(() => {
        if (loading) {
            Promise.all(
                Object.keys(cartData).map((item) =>
                    fetch(`https://dummyjson.com/products/${item}`)
                )
            )
            .then((values) =>
                Promise.all(values.map((item) => item.json()))
            )
            .then((values) => {
                setProductsData(
                    values.map((item) => ({
                        ...item,
                        amount: cartData[item.id].amount,
                    }))
                );
                
                return values.length
            })
            .then((prodAmount) => {
                let limitNum = Number(queryParams.get('limit'));
                if(limitNum > 7) {
                    limitNum = 7
                }
                if(limitNum < 1 && limit !== 3) {
                    limitNum = 1
                } else {
                    limitNum = 3
                }
                let pageNum = Number(queryParams.get('page'));
                if(pageNum > Math.ceil(prodAmount / limitNum)) {
                    pageNum =  Math.ceil(prodAmount / limitNum)
                }
                if(pageNum < 1) {
                    pageNum = 1;
                }

                setQueryParams({page: pageNum.toString(), limit: limitNum.toString()});
                setLimit(limitNum)
                setPage(pageNum)
                setLoading(false);
            })
        }
    }, [cartData, loading, queryParams, page, limit, setQueryParams]);

    const changeProductData = (productId: number) => {
        const arr = productsData.filter((item) => item.id !== productId);
        setProductsData(arr);
    };

    const changePage = (newPage: number) => {
        setQueryParams({...Object.fromEntries(queryParams.entries()), page: newPage.toString()})
        setPage(newPage)
    }
    const changeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
        let limitNum = Number(event.target.value)
        if(limitNum > 7) {
            limitNum = 7
        }
        if(limitNum < 1) {
            limitNum = 1
        }
        if(page > Math.ceil(productsData.length / limitNum)) {
            setQueryParams({page: Math.ceil(productsData.length / limitNum).toString(), limit: limitNum.toString()})
            setPage(Math.ceil(productsData.length / limitNum))
            setLimit(limitNum)
            return
        } 
        if(page < 1) {
            setQueryParams({page: '1', limit: limitNum.toString()})
            setPage(1)
            setLimit(limitNum)
            return
        }

        setQueryParams({...Object.fromEntries(queryParams.entries()), limit: limitNum.toString()})
        setLimit(limitNum)
    }

    return (
        <div className={styles.CartPage}>
            <div className={styles.products}>
                <div className={classNames(styles.pagination, styles.sideTitle)}>
                    <h3 className={styles.Title}>Products in cart</h3>
                    <div className={styles.paginationInputs}>
                        <div className={styles.limitInputCont}>
                            <span>Items on page:</span>
                            <input className={styles.limitInput} type="number" onChange={changeLimit} value={limit} min={1} max={7}/>
                        </div>
                        <div className={styles.pageInputCont}>
                            <button 
                                type='button' 
                                className={
                                    classNames(styles.pageButton, 
                                    {[styles.disabled]: page === 1})
                                }
                                onClick={
                                    () => page !== 1 && changePage(page - 1)
                                }>prev</button>
                            <span className={styles.pageCount}>{page}</span>
                            <button 
                                type='button' 
                                className={
                                    classNames(styles.pageButton, 
                                    {[styles.disabled]: page === Math.ceil(productsData.length / limit)})
                                }
                                onClick={
                                    () => page !== Math.ceil(productsData.length / limit) && changePage(page + 1)
                                }>next</button>
                        </div>
                    </div>
                </div>
                {loading && <p className={styles.loading}>loading...</p>}
                {!!productsData.length &&
                    productsData.slice((0 + (page - 1) * limit), (limit + (page - 1) * limit)).map((item, index) => (
                        <CartProduct
                            productData={item}
                            index={index + 1 +  (limit * (page - 1))}
                            changeProductData={changeProductData}
                            key={item.id}
                        />
                    ))}
            </div>
            <div className={classNames(styles.summary)}>
                <h3 className={classNames(styles.Title, styles.sideTitle)}>
                    Summary
                </h3>
                <div className={styles.summaryInfo}>
                    <p className={classNames(styles.amount, styles.summaryPar)}>
                        Products to by:{' '}
                        <span className={styles.blueText}>
                            {Object.values(cartData).reduce(
                                (sum, { amount }) => sum + amount,
                                0
                            )}
                        </span>
                    </p>
                    <p
                        className={classNames(
                            styles.totalPrice,
                            styles.summaryPar
                        )}
                    >
                        Total price:{' '}
                        <span className={styles.redText}>€{totalPrice}</span>
                    </p>
                    <input
                        className={styles.inputPromo}
                        type="text"
                        placeholder="enter promo code"
                        maxLength={10}
                    />
                    <Button callback={openModal}>by now</Button>
                </div>
            </div>
        </div>
    );
}

export function CartPage() {
    const { cartData } = useContext(CartContext);

    const [totalPrice, setTotalPrice] = useState(
        Object.values(cartData).reduce(
            (sum, { amount, price }) => sum + amount * price,
            0
        )
    );

    useEffect(() => {
        setTotalPrice(
            Object.values(cartData).reduce(
                (sum, { amount, price }) => sum + amount * price,
                0
            )
        );
    }, [cartData]);

    return Object.keys(cartData).length ? (
        <Products totalPrice={totalPrice} />
    ) : (
        <p className={styles.emptyCart}>empty cart</p>
    );
}
