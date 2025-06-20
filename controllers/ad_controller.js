import { Advert } from "../models/ad _model.js";

// POST /adverts - Create Advert
export const createAdvert = async (req, res) => {
    try {
        const { productTitle, description, category, location, price, photos, plan } = req.body;

        // Auto-calculate expiry date
        const planDays = {
            "Free Trial": 7,
            "Basic": 14,
            "Enterprise": 30,
        };

        if (!planDays[plan]) {
            return res.status(400).json({ error: "Invalid plan selected" });
        }

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + planDays[plan]);

        // Auto-assign vendor from JWT token
        const vendorId = req.user._id;

        const advert = await Advert.create({
            productTitle,
            description,
            category,
            location,
            price,
            photos,
            plan,
            expiresAt,
            vendor: vendorId,
        });

        res.status(201).json(advert);
    } catch (error) {
        res.status(400).json({ error: "Failed to create advert", details: error.message });
    }
};


// GET /adverts - Get All Adverts
export const getAllAdverts = async (req, res) => {
    try {
        const adverts = await Advert.find();
        res.status(200).json(adverts);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve adverts", details: error.message });
    }
};

// GET /adverts/:id - Get Single Advert by ID
export const getAdvertById = async (req, res) => {
    const { id } = req.params;
    try {
        const advert = await Advert.findById(id);
        if (!advert) return res.status(404).json({ error: "Advert not found" });
        res.status(200).json(advert);
    } catch (error) {
        res.status(400).json({ error: "Invalid ID or server error", details: error.message });
    }
};

// PATCH /adverts/:id - Update Advert
export const updateAdvert = async (req, res) => {
    const { id } = req.params;
    try {
        const advert = await Advert.findByIdAndUpdate(id, req.body, { new: true });
        if (!advert) return res.status(404).json({ error: "Advert not found" });
        res.status(200).json(advert);
    } catch (error) {
        res.status(400).json({ error: "Failed to update advert", details: error.message });
    }
};

// DELETE /adverts/:id - Delete Advert
export const deleteAdvert = async (req, res) => {
    const { id } = req.params;
    try {
        const advert = await Advert.findByIdAndDelete(id);
        if (!advert) return res.status(404).json({ error: "Advert not found" });
        res.status(200).json({ message: "Advert deleted", advert });
    } catch (error) {
        res.status(400).json({ error: "Failed to delete advert", details: error.message });
    }
};
