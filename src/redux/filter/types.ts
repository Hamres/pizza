export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export enum NameEnum {
    POPULAR_DESC = 'популярности (DESC)',
    POPULAR_ASC = 'популярности (ASC)',
    PRICE_DESC = 'цене (DESC)',
    PRICE_ASC = 'цене (ASC)',
    TITLE_DESC = 'алфавиту (DESC)',
    TITLE_ASC = 'алфавиту (ASC)',
}

export type Sort = {
    name: NameEnum,
    sortProperty: SortPropertyEnum,
}

export interface FilterSliceState {
    searchValue: string,
    categoryId: number,
    currentPage: number,
    sort: Sort,
}