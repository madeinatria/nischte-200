import { Shop } from "../models/shop.model.js";
import { uploadFile } from "../service/minio.service.js";

export const createShop = async (req, res) => {
  try {
    const { shopName, address, contactNo, ownerId, email } = req.body;

    const pictureUrl = await uploadFile(req.file);

    const newShop = new Shop({
      shopName,
      email,
      address,
      contactNo,
      picture: pictureUrl,
      ownerId,
    });

    const savedShop = await newShop.save();

    res.status(201).json({
      message: "Shop created successfully!",
      shop: savedShop,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create shop",
      error: error.message,
    });
  }
};

export const getShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get the shops",
    });
  }
};

// Return all the shop of particular owner
export const getAllOwnerShops = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const shops = await Shop.find({ ownerId });
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get shop details",
      error: error.message,
    });
  }
};

// Return particular shop
export const getShop = async (req, res) => {
  try {
    const shopId = req.params.id;
    const shop = await Shop.findById(shopId);
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get shop details",
      error: error.message,
    });
  }
};

export const updateShop = async (req, res) => {
  try {
    const shopId = req.params.id;
    const updatedShop = await Shop.findByIdAndUpdate(
      shopId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedShop);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update shop details",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await Shop.findByIdAndDelete(req.params.id);
    // Todo: Delete corresponding sharing fields
    res.status(200).json({
      message: "Shop has been deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete shop",
      error: error.message,
    });
  }
};
