import { IUser } from "./User"

export interface IBook {
    _id: string
    title: string
    author: IUser
    frontCover: {
        image: string
    }
    price: string
    category: string,
    dateOfPublication:string
    description: string
    keywords: string
    pages:number
    ISBN: string
    pdf:{
        image: string
    }
    backCover:{
        image: string
    }
    publisher: string
    bought: boolean
    reviews: any[]
    sold: number

    inWishlist?: boolean
    inCart?: boolean
}

export interface ICart {
    items: IBook[]
    orderValue: number
}