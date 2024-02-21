const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
    console.error(err);
});

module.exports = {
    addJabatan(req, res) {
        let data = {
            idJabatan: req.body.idJabatan,
            namaJabatan: req.body.namaJabatan,
            tarif: req.body.tarif,
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
                `INSERT INTO jabatan SET ?;`,
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
                        message: "Data jabatan berhasil ditambahkan",
                    });
                }
            );
        });
    },

    showJabatan(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error("Error connecting to database:", err);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }

            connection.query(
                "SELECT * FROM jabatan",
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
}
