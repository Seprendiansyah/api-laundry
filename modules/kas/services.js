const { KasRepositoryCreatePemasukan } = require("./repositories");

const KasServiceCreateFromTerima = async (terima, req) => {
  const tanggal = terima.tanggal;
  const total = terima.total;
  const nomor = terima.nomor;
  const email = req.user.email;

  await KasRepositoryCreatePemasukan(tanggal, total, email, nomor);
};

module.exports = {
  KasServiceCreateFromTerima,
};
