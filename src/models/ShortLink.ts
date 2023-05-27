import { Schema, model } from "mongoose";

const mobileLinkSchema = new Schema<MobileLinks>({
    primary: { type: String, required: true },
    fallback: { type: String, required: true }
}, { _id: false })

const shortLinkSchema = new Schema<IShortLink>({
    slug: { type: String, required: true },
    ios: mobileLinkSchema,
    android: mobileLinkSchema,
    web: { type: String, required: true }
})

export interface IShortLink {
    slug: string
    ios: MobileLinks
    android: MobileLinks
    web: string
}

export interface MobileLinks {
    primary: string
    fallback: string
}

export default model<IShortLink>("ShortLink", shortLinkSchema)