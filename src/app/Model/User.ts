export interface IUser {
    _id: string
    name: string,
    email: string,
    token: string
    role: string
    fullname: string
    profilePic?: string
    profileId? : {
        cardInfo: {
            bankName: string
            accountNymber: string
            bankHolder: string
        },
        socials:{
            instagram: string
            twitter: string
        },
        bio: string
    }
}