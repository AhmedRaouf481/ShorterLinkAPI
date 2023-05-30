import Joi from "joi";

export class ShortLinkServices {

    // Post Schema
    private mobilelinksPostSchema = Joi.object({
        primary: Joi.string().uri().required(),
        fallback: Joi.string().uri().required()
    })
    private postSchema = Joi.object({
        slug: Joi.string().allow(''),
        ios: this.mobilelinksPostSchema,
        android: this.mobilelinksPostSchema,
        web: Joi.string().uri().required()
    })

    // Update Schema
    private mobilelinksUpdateSchema = Joi.object({
        primary: Joi.string().uri(),
        fallback: Joi.string().uri()
    })
    private updateSchema = Joi.object({
        ios: this.mobilelinksUpdateSchema,
        android: this.mobilelinksUpdateSchema,
        web: Joi.string().uri(),
    })

    public validate = (input: any, update: boolean = false) => {
        let Schema: Joi.ObjectSchema = this.postSchema
        if (update) {
            Schema = this.updateSchema
        }
        const result = Schema.validate(input);
        if (result.error) {
            console.log(result.error);

            throw {
                statusCode: 400,
                msg: result.error.details[0]?.message
            }
        }
        return result.value
    };
}
