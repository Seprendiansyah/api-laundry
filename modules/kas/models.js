const mongoose = require("mongoose");

const KasSchema = new mongoose.Schema(
  {
    tanggal: { type: Date, default: Date.now },
    keterangan: { type: String, default: "No description..." },
    pemasukan: { type: Number, default: 0 },
    pengeluaran: { type: Number, default: 0 },
    email: { type: String },
    created: { type: Date, default: Date.now },
    nomorTransaksi: { type: String },
  },
  { versionKey: false }
);

const Kas = mongoose.model("Kas", KasSchema);

module.exports = {
  Kas,
};

