const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
    console.error(err);
});

module.exports = {
    addKaryawan(req, res) {
        let data = {
            idKaryawan: req.body.idKaryawan,
            namaKaryawan: req.body.namaKaryawan,
            alamat: req.body.alamat,
        };

        console.log("data yang akan dikirim", data);

        pool.getConnection(function (err, connection) {
            if (err) {
                // Tangani kesalahan koneksi database
                console.error("Error connecting to database:", err);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }

            connection.query(
                `INSERT INTO karyawan SET ?;`,
                [data],
                function (error, results) {
                    connection.release();
                    if (error) {
                        // Tangani kesalahan saat menjalankan query
                        console.error("Error executing SQL query:", error);
                        return res.status(500).json({
                            success: false,
                            message: "Error inserting data into database",
                        });
                    }
                    // Kirim tanggapan berhasil jika tidak ada kesalahan
                    res.status(200).json({
                        success: true,
                        message: "Data karyawan berhasil ditambahkan",
                    });
                }
            );
        });
    },

    showKaryawan(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error("Error connecting to database:", err);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }

            connection.query(
                "SELECT * FROM karyawan",
                function (error, results) {
                    connection.release();
                    if (error) {
                        console.error("Error executing SQL query:", error);
                        return res.status(500).json({
                            success: false,
                            message: "Error fetching data from database",
                        });
                    }
                    res.status(200).json({
                        success: true,
                        data: results,
                    });
                }
            );
        });

    },

    deleteKaryawan(req, res) {
        const idKaryawan = req.body.idKaryawan;

        if (!idKaryawan) {
            return res.status(400).json({
                success: false,
                message: "Missing ID Karyawan",
            });
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                console.error("Error connecting to database:", err);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }

            connection.query(
                "DELETE FROM karyawan WHERE idKaryawan = ?",
                [idKaryawan],
                function (error, results) {
                    connection.release();
                    if (error) {
                        console.error("Error executing SQL query:", error);
                        return res.status(500).json({
                            success: false,
                            message: "Error deleting data from database",
                        });
                    }
                    res.status(200).json({
                        success: true,
                        message: "Data karyawan berhasil dihapus",
                    });
                }
            );
        });
    },

    updateKaryawan(req, res) {
        const { idKaryawan, namaKaryawan, alamat } = req.body;

        if (!idKaryawan || !namaKaryawan || !alamat) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                console.error("Error connecting to database:", err);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }

            connection.query(
                "UPDATE karyawan SET namaKaryawan = ?, alamat = ? WHERE idKaryawan = ?",
                [namaKaryawan, alamat, idKaryawan],
                function (error, results) {
                    connection.release();
                    if (error) {
                        console.error("Error executing SQL query:", error);
                        return res.status(500).json({
                            success: false,
                            message: "Error updating data in database",
                        });
                    }
                    res.status(200).json({
                        success: true,
                        message: "Data karyawan berhasil diperbarui",
                    });
                }
            );
        });
    },
}
