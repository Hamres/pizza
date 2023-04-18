import React, {useCallback, useRef, useState} from 'react';
import debounce from 'lodash.debounce'
import styles from './search.module.scss'
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/filter/slice";


const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)


    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current?.focus()
    }

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 250),
        []
    )

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="50px"
                height="50px">
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/>
            </svg>

            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder='Поиск пиццы...'

            />
            {value && <svg onClick={onClickClear} className={styles.clearIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="50px"
                  height="50px">

                <path
                    d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"/>
            </svg>}
        </div>

    );
};

export default Search;