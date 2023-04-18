import React, {useCallback, useEffect, useRef} from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/filter/slice";
import {useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/pizza/asyncAction";
import {useAppDispatch} from "../redux/store";
import {selectPizzaData} from "../redux/pizza/selectors";
import {selectFilter} from "../redux/filter/selectors";

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch  = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const {items, status} = useSelector(selectPizzaData)

    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0
            ? `category=${categoryId}`
            : ``
        const search = searchValue
            ? `&search=${searchValue}`
            : ``

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            })
        )

        window.scrollTo(0, 0)
    }


    useEffect( () => {
        getPizzas()
    }, [categoryId, sort.sortProperty, searchValue, currentPage])



    const pizzas = items.map((obj: any) => <Index {...obj} key={obj.id}/>)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort value={sort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>

            {
                status === 'error'
                ? <div className='content__errorText'>
                    <h2>Произошла ошибка 😕</h2>
                    <p>Что-то пошло не так.</p>
                </div>
                : <div className="content__items">
                {
                    status === 'loading'
                        ? skeletons
                        : pizzas
                }
                </div>
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;