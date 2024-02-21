const express = require("express");
const router = express.Router();
const { karyawan, jabatan, user } = require("../controllers");

//Routes untuk user
router.post("/user/register", user.registerUser);
router.post("/user/login", user.checkUserLogin);

//Routes untuk karyawan
router.post("/karyawan/addKaryawan", karyawan.addKaryawan);
router.get("/karyawan/showKaryawan", karyawan.showKaryawan);
router.delete("/karyawan/deleteKaryawan", karyawan.deleteKaryawan);
router.put("/karyawan/updateKaryawan", karyawan.updateKaryawan);

//Routes untuk jabatan
router.post("/jabatan/addJabatanaddJabatan", jabatan.addJabatan);
router.get("/jabatan/showJabatan", jabatan.showJabatan);

module.exports = router;