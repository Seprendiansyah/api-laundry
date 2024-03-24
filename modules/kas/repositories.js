const { Kas } = require("./models");

const KasRepositoryCreatePemasukan = async (tanggal, total, email, nomor) => {
  await Kas.create({
    tanggal: tanggal,
    pemasukan: total,
    email: email,
    nomorTransaksi: nomor,
  });
};

// const KasRepositoryCreatePengeluaran = () => {};

module.exports = {
  KasRepositoryCreatePemasukan,
};
