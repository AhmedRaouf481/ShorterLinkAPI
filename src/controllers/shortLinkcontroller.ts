import { Request, Response } from "express";
import ShortLink from "../models/ShortLink";
import { ShortLinkServices } from "../servicess/shortLinkservices";
import { nanoid } from "nanoid";
import axios from "axios";

export class ShortLinkController {
    static services = new ShortLinkServices()

    // Redirect the shorted link to original link
    static get_shortlink = async (req: Request, res: Response) => {
        try {

            const { slug } = req.params
            const shortLink = await ShortLink.findOne({ slug })
            if (!shortLink) return res.status(400).send({ err: "Not found!" });

            const useragent = req.useragent

            if (useragent?.isiPhone) {
                axios.get(shortLink.ios.primary)
                    .then(response => {
                        return res.redirect(shortLink.ios.primary)
                    })
                    .catch(error => {
                        return res.redirect(shortLink.ios.fallback);
                    })
            }
            else if (useragent?.isAndroid) {
                axios.get(shortLink.android.primary)
                    .then(response => {
                        return res.redirect(shortLink.android.primary)
                    })
                    .catch(error => {
                        return res.redirect(shortLink.android.fallback);
                    })
            }
            else {
                return res.redirect(shortLink.web)
            }

        } catch (err) {
            console.log(err);

            return res.status(500).json({ err });
        }
    }

    // List all Links in the DataBase
    static getAll_shortlink = async (req: Request, res: Response) => {
        try {
            let allLinks: string[] = []
            const allShortLinks = await ShortLink.find({})
            allShortLinks.forEach((link) => {
                allLinks.push(process.env.HOST + link.slug)
            })
            return res.status(201).json({ allLinks })
        } catch (err) {
            console.log(err);

            return res.status(500).json({ err });
        }
    }

    // Create new Short Link
    static create_shortlink = async (req: Request, res: Response) => {
        try {
            // validate the request body
            const shortlink = this.services.validate(req.body)

            // create auto generated slug if not provided
            if (!shortlink?.slug) {
                shortlink.slug = nanoid(5)
            }

            // check if the slug is unique
            const existShortlink = await ShortLink.findOne({ slug: shortlink.slug })
            if (existShortlink) {
                return res.status(400).json({ err: "slug must be uniqe" })
            }

            const newShortLink = new ShortLink(shortlink)
            await newShortLink.save()

            return res.status(201).json({ shortlink: process.env.HOST + newShortLink.slug })
        } catch (err) {
            console.log(err);

            return res.status(500).json({ err });
        }
    }

    // Edit Link Data
    static edit_shortlink = async (req: Request, res: Response) => {
        try {
            const { slug } = req.params

            // validate request body
            const updates = this.services.validate(req.body, true)

            // find Link with given slug and update it
            const shortlink = await ShortLink.findOneAndUpdate({ slug },
                {
                    $set: {
                        "ios.primary": updates.ios?.primary,
                        "ios.fallback": updates.ios?.fallback,
                        "android.primary": updates.android?.primary,
                        "android.fallback": updates.android?.fallback,
                        "web": updates?.web
                    }
                });

            //return error if there is no link with given slug 
            if (!shortlink) {
                return res.status(404).json({ err: "Not Found!" })
            }

            return res.status(200).json({ msg: "Updated Successfully!" })
        } catch (err) {
            console.log(err);
            res.status(500).json({ err });
        }
    }


}