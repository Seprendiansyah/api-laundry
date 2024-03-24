
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Terima } = require("./models");
const { TerimaFilter } = require("./filters");
const { TerimaServiceCreate } = require("./services");
const { KasRepositoryCreatePemasukan } = require("../kas/repositories");
const { KasServiceCreateFromTerima } = require("../kas/services");

const TerimaControllerList =  async (req, res) => {
  try {
    // Your code here
    const results = Terima.find(TerimaFilter(req)).sort([["created", -1]]);
    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const TerimaControllerCreate = async (req, res) => {
  try {
    // Your code here
    req.cleanedData = TerimaServiceCreate(req);
    const result = await Terima.create(req.cleanedData);
    return res.status(201).json(result);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const TerimaControllerDetail = async (req, res) => {
  try {
    // Your code here
    const terima = await Terima.findOne({_id: req.params.id});
    return res.status(200).json(terima);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const TerimaControllerUpdate = async (req, res) => {
  try {
    // Your code here
    throw {status: 403, message: "Not allowed"};
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const TerimaControllerSelesai = async (req, res) => {
  try {
    const terima = await Terima.findOne({ _id: req.params.id });
    if (!terima) throw { status: 404, message: "Not found" };
    if (terima.status !== "diproses")
      throw { status: 403, message: "Tidak dizinkan" };
    const result = await Terima.findOneAndUpdate(
      { _id: req.params.id },
      { status: "selesai" },
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const TerimaControllerDiambil = async (req, res) => {
  try {
    const terima = await Terima.findOne({ _id: req.params.id });
    if (!terima) throw { status: 404, message: "Not found" };
    if (terima.status !== "selesai")
      throw { status: 403, message: "Tidak dizinkan" };
    const result = await Terima.findOneAndUpdate(
      { _id: req.params.id },
      { status: "diambil" },
      { new: true }
    );
    
    // Buat record kas
    await KasServiceCreateFromTerima(result, req);
    return res.status(200).json(result);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const TerimaControllerDelete = async (req, res) => {
  try {
    // Your code here
    let terima = await Terima.findOne({_id: req.params.id});
    if (!terima) throw { status: 404, message: "Not found"};

    await Terima.findByIdAndDelete(req.params.id);
    return res.status(204).json(null);
    // throw {status: 403, message: "Not allowed"};
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  TerimaControllerList,
  TerimaControllerCreate,
  TerimaControllerDetail,
  TerimaControllerUpdate,
  TerimaControllerDelete,
  TerimaControllerSelesai,
  TerimaControllerDiambil,
};
