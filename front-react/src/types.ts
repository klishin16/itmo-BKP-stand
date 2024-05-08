export interface IMovie {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
}
export enum ETestType {
    STATIC,
    LIST,
    TREE
}

export interface IState {
    isShow: boolean;
    testType: ETestType;
    itemsCount: number;
}
