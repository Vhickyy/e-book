export interface IUser {
    _id: string
    name: string,
    email: string,
    token: string
    role: string
    fullname: string
    profilePic?: string
}