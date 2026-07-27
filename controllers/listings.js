const Listing = require("../models/listings");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const { category, search } = req.query;

    let filter = {};
    if (category) {
        filter.category = category;
    }

    if (search && search.trim() !== "" && !category) {
        const searchRegex = new RegExp(search.trim(), "i");
        filter.$or = [
            { title: searchRegex },
            { location: searchRegex },
            { country: searchRegex },
            { category: searchRegex},
        ];
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { allListings, selectedCategory: category, searchQuery: search || "" });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({ 
            path: "reviews", 
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient
        .forwardGeocode ({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { filename, url };
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success", "Successfully made a new listing!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    const response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();

    req.body.listing.geometry = response.body.features[0].geometry;

    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { filename, url };
        await listing.save();
    }

    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
};