import {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import SortInput from '../../generics/SortInput/SortInput';
import styles from './styles.module.scss';
import { CardSizes, FiltersType, LinkOfFilters, Product, SortMethodType } from './types';
import Filters from '../Filters/Filters'
import SPLink from '../../assets/icons/small-products-icon.svg';
import BPLink from '../../assets/icons/big-products-icon.svg';
import ProductCardsList from '../ProductCardsList/ProductCardsList';

export default function MainPage() {
    const [isMFOpened, setIsMFOpened] = useState(false)
    const [queryFiltersLoaded, setQueryFiltersLoaded] = useState(false)

    const [products, setProducts] = useState<Product[]>();
    const [shownProducts, setShownProducts] = useState<Product[]>([]);

    const [filters, setFilters] = useState<FiltersType>();
    const [canSort, setCanSort] = useState<boolean>(true);

    const [searchFilter, setSearchFilter] = useState<string>('');
    const [sortMethod, setSortMethod] = useState<SortMethodType>('high-rate');
    const [curCardState, setCurState] = useState<CardSizes>('small')

    const [queryFilters, setQueryFilters] = useSearchParams();



    const setSortMethodFunc = (method: string) => {
        let res: SortMethodType = 'high-rate';
        switch(method) {
            case 'high-rate':
                setSortMethod('high-rate');
                res = 'high-rate';
                break;
            case 'low-rate':
                setSortMethod('low-rate')
                res = 'low-rate';
                break;
            case 'high-price':
                setSortMethod('high-price');
                res = 'high-price';
                break;
            case 'low-price':
                setSortMethod('low-price');
                res = 'low-price';
                break;
            default: 
                break;
        }
        return res
    }
    const setCurStateFunc = (size: string) => {
        switch(size) {
            case 'small':
                setCurState('small')
                break
            case 'big':
                setCurState('big')
                break
            default:
                break
        }
    }

    const sortProducts = ( method: SortMethodType = sortMethod, ableToSort: boolean = canSort) => {
        if(ableToSort) {
            const res = [...shownProducts];
            switch(method) {
                case 'high-rate':
                    res.sort((a, b) => b.rating - a.rating)
                    break;
                case 'low-rate':
                    res.sort((a, b) => a.rating - b.rating)
                    break;
                case 'high-price':
                    res.sort((a, b) => b.price - a.price)
                    break;
                case 'low-price':
                    res.sort((a, b) => a.price - b.price)
                    break;
                default: 
                    break;
            }
            setShownProducts(res);
            setCanSort(false)
        }
    }
    const getSortMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
        sortProducts(setSortMethodFunc(event.target.value), true)
        setQueryFilters({...Object.fromEntries(queryFilters.entries()), sort: event.target.value})
    }

    const getFilters = (newFilters:FiltersType) => {
        const filterType: string = Object.keys(newFilters)[0]
        setFilters({...filters, ...newFilters});
        if(Object.values(newFilters).join(',')) {
            setQueryFilters({...Object.fromEntries(queryFilters.entries()), [Object.keys(newFilters)[0]]: Object.values(newFilters).join(',')})
        } else {
            queryFilters.delete(filterType)
            setQueryFilters(queryFilters)
        }
    }
    const resetFilters = () => {
        if(filters) {
            setFilters(undefined)
        }
        if(searchFilter) {
            setSearchFilter('')
        }
        if(sortMethod !== 'high-rate') {
            setSortMethod('high-rate')
        }
        setQueryFilters()
    }
    const getFilteredProducts = () => {
        if(products) {
            let filteredProducts:Product[] = [...products];
            if(filters) {
                if(filters.Brand) {
                    for(let i = 0; i < filters.Brand.length; i += 1){
                        if(i === 0) {
                            filteredProducts = filteredProducts
                            .filter(item => 
                                filters.Brand && item.brand.toUpperCase() === filters.Brand[i].toUpperCase()
                            )
                        } else {
                            filteredProducts = filteredProducts.concat(products
                                .filter(item => 
                                    filters.Brand && item.brand.toUpperCase() === filters.Brand[i].toUpperCase()
                                ))
                        }
                    }
                }
                if(filters.Category) {
                    if(filters.Brand) {
                        const oldFilteredProducts = [...filteredProducts]
                        for(let i = 0; i < filters.Category.length; i += 1){
                            if(i === 0) {
                                filteredProducts = filteredProducts
                                .filter(item => 
                                    filters.Category && item.category.toUpperCase() === filters.Category[i].toUpperCase()
                                )
                            } else {
                                filteredProducts = filteredProducts.concat(oldFilteredProducts
                                    .filter(item => 
                                        filters.Category && item.category.toUpperCase() === filters.Category[i].toUpperCase()
                                    ))
                            }
                        }
                    } else {
                        for(let i = 0; i < filters.Category.length; i += 1){
                            if(i === 0) {
                                filteredProducts = filteredProducts
                                .filter(item => 
                                    filters.Category && item.category.toUpperCase() === filters.Category[i].toUpperCase()
                                )
                            } else {
                                filteredProducts = filteredProducts.concat(products
                                    .filter(item => 
                                        filters.Category && item.category.toUpperCase() === filters.Category[i].toUpperCase()
                                    ))
                            }
                        }
                    }
                }
                if(filters.Price) {
                    filteredProducts = filteredProducts
                    .filter(item => 
                        filters.Price && item.price >= filters.Price[0] && item.price <= filters.Price[1]
                    )
                }
                if(filters.Stock) {
                    filteredProducts = filteredProducts
                    .filter(item => 
                        filters.Stock && item.stock >= filters.Stock[0] && item.stock <= filters.Stock[1]
                    )
                }
            }

            if(searchFilter) {
                filteredProducts = filteredProducts
                .filter( item =>
                    item.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchFilter.toLowerCase()) || 
                    item.price === Number(searchFilter.toLowerCase()) || 
                    item.title.toLowerCase().includes(searchFilter.toLowerCase())
                )
            }

            setShownProducts(filteredProducts);
            setCanSort(true);
        }
    }

    const memoGetFilteredProducts = useCallback(getFilteredProducts, [filters, products, searchFilter])
    const memoSortProducts = useCallback(sortProducts, [shownProducts, sortMethod, canSort])



    useEffect(() => {
        let ignore = false;
        async function fetchProductsFunc() {
            const res:Product[] = await fetch('https://dummyjson.com/products?limit=100').then(result=>result.json()).then(data => data.products);
            return res
        }
        fetchProductsFunc().then((res) => {
            if(!ignore) {
                setProducts(res);
                setShownProducts(res)
            }
        })

        return () => {
            ignore = true;
        }
    }, [])
    useEffect(() => {
        if(!queryFiltersLoaded) {
            const linkOfFilters:LinkOfFilters = { 
                linkFilters:  {
                    'Brand': queryFilters.get('Brand')?.split(','),
                    'Category': queryFilters.get('Category')?.split(','),
                    'Price': queryFilters.get('Price')?.split(',').map(num => Number(num)),
                    'Stock': queryFilters.get('Stock')?.split(',').map(num => Number(num))
                },
                linkSearch:  queryFilters.get('search'),
                linkSort: queryFilters.get('sort'),
                linkCardSize: queryFilters.get('size')
            }
            if(linkOfFilters.linkFilters) setFilters(linkOfFilters.linkFilters);
            if(linkOfFilters.linkSearch) setSearchFilter(linkOfFilters.linkSearch)
            if(linkOfFilters.linkSort) setSortMethodFunc(linkOfFilters.linkSort);
            if(linkOfFilters.linkCardSize) setCurStateFunc(linkOfFilters.linkCardSize)
            
            setCanSort(true)
            setQueryFiltersLoaded(true)
        }
    }, [queryFilters, queryFiltersLoaded])

    useLayoutEffect(memoGetFilteredProducts, [memoGetFilteredProducts])
    useLayoutEffect(memoSortProducts, [memoSortProducts])

    const toggleMobFiltersMenu = () => {
        if(isMFOpened) {
            document.body.style.overflowY = 'auto'
        } else {
            document.body.style.overflowY = 'hidden'
        }

        setIsMFOpened(!isMFOpened)
    }

    return (
        <section className={styles.MainPage}>
            {products
            ?<div className={styles.wrapper}>
                {!!isMFOpened
                && <div className={styles.filtersContMobile}>
                    <Filters 
                    defaultProducts={products} 
                    filteredProducts={shownProducts}
                    getFilters={getFilters} 
                    resetFilters={resetFilters}
                    filters={filters} />
                    <button type='button' className={styles.closeMobileFiltersButton} onClick={() => toggleMobFiltersMenu()}>X</button>
                </div>}
                <div className={styles.filtersCont}>
                    <Filters 
                        defaultProducts={products} 
                        filteredProducts={shownProducts}
                        getFilters={getFilters} 
                        resetFilters={resetFilters}
                        filters={filters} 
                    />
                </div>
                <div className={styles.productsContainer}>
                    <button type='button' className={styles.filtersMobileButton} onClick={() => toggleMobFiltersMenu()}>Filters</button>
                    <div className={styles.productsUIBar}>
                        <input 
                            className={styles.Search} 
                            type="search" 
                            placeholder='Search...' 
                            value={searchFilter} 
                            onChange={
                                (event:React.ChangeEvent<HTMLInputElement>) => {
                                    setSearchFilter(event.target.value)
                                    if(event.target.value === '') {
                                        queryFilters.delete('search')
                                        setQueryFilters(queryFilters)
                                    } else {
                                        setQueryFilters({...Object.fromEntries(queryFilters.entries()) , search: event.target.value})
                                    }
                                }
                            }
                        />
                        <span className={styles.UIBarProductsFound}>Found: {shownProducts.length}</span>
                        <SortInput callback={getSortMethod} defaultValue={sortMethod}/>
                        <div className={styles.UIBarButtonsContainer}>
                            <button 
                                className={`${styles.UIBarButton}\n${curCardState === 'small' ? styles.UIBarButtonInactive: ''}`} 
                                type='button' 
                                onClick={() => {
                                    setCurState('big')
                                    setQueryFilters({...Object.fromEntries(queryFilters.entries()), size: 'big'})
                                }}
                            >
                                <img className={styles.UIBarButtonImg} src={BPLink} alt="BP" />
                            </button>
                            <button 
                                className={`${styles.UIBarButton}\n${curCardState === 'big' ? styles.UIBarButtonInactive : ''}`} 
                                type='button' 
                                onClick={() => {
                                    setCurState('small')
                                    setQueryFilters({...Object.fromEntries(queryFilters.entries()), size: 'small'})
                                }}
                            >
                                <img className={styles.UIBarButtonImg} src={SPLink} alt="SP" />
                            </button>
                        </div>
                    </div>
                    <ProductCardsList products={shownProducts} cardSize={curCardState}/>
                </div>
            </div>
            : 'Loading...'}
        </section>
    )
}