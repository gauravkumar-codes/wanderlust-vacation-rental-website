const joi = require("joi");

const listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        image: joi.object({
            filename: joi.string().allow("", null),
            url: joi.string().allow("", null)
        }),
        category: joi.string().valid(
            "Trending",
            "Rooms",
            "Cities",
            "Mountains",
            "Castles",
            "Pools",
            "Camping",
            "Deserts",
            "Arctic",
            "Beaches",
            "Boats"
        ).required(),
    }).required()
});

const reviewSchema = joi.object({
    review: joi.object({
        comment: joi.string().required(),
        rating: joi.number().required().min(1).max(5)
    }).required()
});

module.exports = { listingSchema, reviewSchema };