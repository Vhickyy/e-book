import { IBest, ILinks } from "../types/types";

export const linksData: ILinks[] = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "About",
        link: "/about"
    },
    {
        name: "Books",
        link: "/books"
    }
]

export const linksDataMobile: ILinks[] = [
    {
        name: "Account",
        link: "/dashboard/profile"
    },
    {
        name: "Library",
        link: "/dashboard/library"
    },
    {
        name: "Books",
        link: "/books"
    },
    {
        name: "Wishlist",
        link: "/dashboard/wishlist"
    },
    {
        name: "Orders",
        link: "/dashboard/orders"
    },
    {
        name: "Cart",
        link: "/cart"
    },
]


export const bestSellingBooks: IBest[] = [
    {
        id: 1,
        title: "The Revival",
        rating: 4,
        author: "Morris Johnson",
        price: "N 23,400",
        img: "../../../assets/Rectangle 10.png",
        isFav: false
    },
    {
        id: 2,
        title: "The Revival",
        rating: 4,
        author: "Morris Johnson",
        price: "N 23,400",
        img: "../../../assets/Rectangle 10.png",
        isFav: false
    },
    {
        id: 3,
        title: "The Revival",
        rating: 4,
        author: "Morris Johnson",
        price: "N 23,400",
        img: "../../../assets/Rectangle 10.png",
        isFav: false
    },
    {
        id: 4,
        title: "The Revival",
        rating: 4,
        author: "Morris Johnson",
        price: "N 23,400",
        img: "../../../assets/Rectangle 10.png",
        isFav: false
    }
]