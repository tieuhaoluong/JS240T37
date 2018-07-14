var http = require("http");
var Luu_tru = require("../Xu_ly/XL_LUU_TRU.js")
var Xu_ly_Tham_so = require('querystring')
var Port = 1000
var Du_lieu = {}
Du_lieu.Danh_sach_Dien_thoai = Luu_tru.Doc_Danh_sach("Dien_thoai")
Du_lieu.Cua_hang = Luu_tru.Doc_Thong_tin_Cua_hang()
Du_lieu.Nguoi_dung = Luu_tru.Doc_Thong_tin_Nguoi_dung()
Du_lieu.Danh_sach_Thanh_ly = Luu_tru.Doc_Danh_sach_Thanh_ly("Dien_thoai")
var Dich_vu = http.createServer(
    (Yeu_cau, Dap_ung) => {
        var Chuoi_Nhan = ""
        var Chuoi_Kq = "{}"
        var Dia_chi = Yeu_cau
            .url
            .replace("/", "").replace("?", "")
        var Tham_so = Xu_ly_Tham_so.parse(Dia_chi)
        var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
        Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
        Yeu_cau.on('end', () => {
            if (Ma_so_Xu_ly == "Doc_Danh_sach_Dien_thoai") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Dien_thoai = Du_lieu.Danh_sach_Dien_thoai
                Doi_tuong_Kq.Cua_hang = Du_lieu.Cua_hang
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            } else if (Ma_so_Xu_ly == "Doc_Danh_sach_Thanh_ly_Dien_thoai") {
                var Doi_tuong_Kq = {}
                Doi_tuong_Kq.Danh_sach_Thanh_ly = Du_lieu.Danh_sach_Thanh_ly
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)
            } else if (Ma_so_Xu_ly == "Dang_nhap") {
                var Doi_tuong_Kq = {}
                var Thong_tin = JSON.parse(Chuoi_Nhan)
                var Nguoi_dung = Du_lieu.Nguoi_dung.find(x => x.Ten_Dang_nhap.toLowerCase() == Thong_tin.Ten_Dang_nhap.toLowerCase() && x.Mat_khau.toLowerCase() == Thong_tin.Mat_khau.toLowerCase())
                if (Nguoi_dung) {
                    Doi_tuong_Kq.Ten = Nguoi_dung.Ten
                    Doi_tuong_Kq.Ma_so = Nguoi_dung.Ma_so
                    Doi_tuong_Kq.Nhom_Nguoi_dung = Nguoi_dung.Nhom_Nguoi_dung

                }
                Chuoi_Kq = JSON.stringify(Doi_tuong_Kq)

            } else if (Ma_so_Xu_ly == "Ghi_Dien_thoai_Moi") {
                var Kq = ""
                var Dien_thoai = JSON.parse(Chuoi_Nhan)
                Kq = Luu_tru.Ghi_moi_Doi_tuong("Dien_thoai", Dien_thoai)
                if (Kq == "") {
                    Du_lieu.Danh_sach_Dien_thoai.push(Dien_thoai)
                    Chuoi_Kq = JSON.stringify(Dien_thoai)
                }
            } else if (Ma_so_Xu_ly == "Ghi_Phieu_Dat_hang") {
                var Kq = ""
                var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Tham_so.Ma_so_Dien_thoai)
                var Phieu_Dat_hang = JSON.parse(Chuoi_Nhan)
                var So_Phieu_Dat = Dien_thoai.Danh_sach_Phieu_Dat.length + 1
                Phieu_Dat_hang.So_Phieu_Dat = So_Phieu_Dat
                Dien_thoai.Danh_sach_Phieu_Dat.push(Phieu_Dat_hang)
                Kq = Luu_tru.Cap_nhat_Doi_tuong("Dien_thoai", Dien_thoai)
                if (Kq == "") {
                    Chuoi_Kq = "OK"
                } else {
                    Dien_thoai.Danh_sach_Phieu_Dat.pop()
                    Chuoi_Kq = "Error"
                }
            } else if (Ma_so_Xu_ly == "Ghi_Phieu_Nhap_hang") {
                var Kq = ""
                var Danh_sach_Phieu_Nhap_hang = JSON.parse(Chuoi_Nhan)
                Danh_sach_Phieu_Nhap_hang.forEach(Dien_thoai_Nhap => {
                    var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Dien_thoai_Nhap.Ma_so)
                    var So_Phieu_Nhap = Dien_thoai.Danh_sach_Phieu_Nhap.length + 1
                    Dien_thoai_Nhap.Phieu_Nhap_hang.So_Phieu_Nhap = So_Phieu_Nhap
                    Dien_thoai.Danh_sach_Phieu_Nhap.push(Dien_thoai_Nhap.Phieu_Nhap_hang)
                    Kq = Luu_tru.Cap_nhat_Doi_tuong("Dien_thoai", Dien_thoai)
                    if (Kq == "") {
                        Chuoi_Kq = "OK"
                    } else {
                        Dien_thoai.Danh_sach_Phieu_Nhap.pop()
                        Chuoi_Kq = "Error"
                    }

                })
            } else if (Ma_so_Xu_ly == "Ghi_Phieu_Ban_hang") {
                var Kq = ""
                var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Tham_so.Ma_so_Dien_thoai)
                var Phieu_Ban_hang = JSON.parse(Chuoi_Nhan)
                var So_Phieu_Ban = Dien_thoai.Danh_sach_Phieu_Ban.length + 1
                Phieu_Ban_hang.So_Phieu_Ban = So_Phieu_Ban
                Dien_thoai.Danh_sach_Phieu_Ban.push(Phieu_Ban_hang)
                Kq = Luu_tru.Cap_nhat_Doi_tuong("Dien_thoai", Dien_thoai)
                if (Kq == "") {
                    Chuoi_Kq = "OK"
                } else {
                    Dien_thoai.Danh_sach_Phieu_Ban.pop()
                    Chuoi_Kq = "Error"
                }
            }else if (Ma_so_Xu_ly == "Ghi_Phieu_Giao_hang") {
                var Kq = ""
                var Phieu_Giao_hang = JSON.parse(Chuoi_Nhan)
                var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Phieu_Giao_hang.Ma_so)
                Dien_thoai.Danh_sach_Phieu_Dat.forEach(Phieu => {
                    if (Phieu.So_Phieu_Dat == Phieu_Giao_hang.So_Phieu_Dat) {
                        Phieu.Nhan_vien = Phieu_Giao_hang.Nhan_vien
                        Phieu.Trang_thai = "DA_GIAO_HANG"
                    }
                })
                Kq = Luu_tru.Cap_nhat_Doi_tuong("Dien_thoai", Dien_thoai)
                if (Kq == "") {
                    Chuoi_Kq = "OK"
                }

            } else if (Ma_so_Xu_ly == "Cap_nhat_Dien_thoai") {
                var Kq = ""
                var Danh_sach_Cap_nhat = JSON.parse(Chuoi_Nhan)
                Danh_sach_Cap_nhat.forEach(Dien_thoai_Cap_nhat => {
                    var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Dien_thoai_Cap_nhat.Ma_so)
                    Dien_thoai.Ten = Dien_thoai_Cap_nhat.Ten
                    Dien_thoai.Don_gia_Ban = Dien_thoai_Cap_nhat.Don_gia_Ban
                    Dien_thoai.Don_gia_Nhap = Dien_thoai_Cap_nhat.Don_gia_Nhap
                    Dien_thoai.Nhom_Dien_thoai.Ten = Dien_thoai_Cap_nhat.Nhom_Dien_thoai.Ten
                    Dien_thoai.Nhom_Dien_thoai.Ma_so = Dien_thoai_Cap_nhat.Nhom_Dien_thoai.Ma_so
                    Kq = Luu_tru.Cap_nhat_Doi_tuong("Dien_thoai", Dien_thoai)
                    if (Kq == "") {
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
            } else if (Ma_so_Xu_ly == "Xoa_Dien_thoai") {
                var Kq = ""
                var Danh_sach_Xoa = JSON.parse(Chuoi_Nhan)
                Danh_sach_Xoa.forEach(Dien_thoai_Xoa => {
                    var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Dien_thoai_Xoa.Ma_so)
                    Kq = Luu_tru.Xoa_Doi_tuong("Dien_thoai", Dien_thoai)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.filter(x => x.Ma_so != Dien_thoai_Xoa.Ma_so)
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
                console.log(Du_lieu.Danh_sach_Dien_thoai)
            } else if (Ma_so_Xu_ly == "Thanh_ly_Dien_thoai") {
                var Kq = ""
                var Danh_sach_Thanh_ly = JSON.parse(Chuoi_Nhan)
                Danh_sach_Thanh_ly.forEach(Dien_thoai_Thanh_ly => {
                    var Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.find(x => x.Ma_so == Dien_thoai_Thanh_ly.Ma_so)
                    Kq = Luu_tru.Thanh_ly_Doi_tuong("Dien_thoai", Dien_thoai)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_Dien_thoai = Du_lieu.Danh_sach_Dien_thoai.filter(x => x.Ma_so != Dien_thoai_Thanh_ly.Ma_so)
                        Du_lieu.Danh_sach_Thanh_ly.push(Dien_thoai)
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
                console.log(Du_lieu.Danh_sach_Dien_thoai)
            } else if (Ma_so_Xu_ly == "Phuc_hoi_Dien_thoai") {
                var Kq = ""
                var Danh_sach_Phuc_hoi = JSON.parse(Chuoi_Nhan)
                Danh_sach_Phuc_hoi.forEach(Dien_thoai_Phuc_Hoi => {
                    var Dien_thoai = Du_lieu.Danh_sach_Thanh_ly.find(x => x.Ma_so == Dien_thoai_Phuc_Hoi.Ma_so)
                    Kq = Luu_tru.Phuc_hoi_Doi_tuong("Dien_thoai", Dien_thoai)
                    if (Kq == "") {
                        Du_lieu.Danh_sach_Dien_thoai.push(Dien_thoai)
                        Du_lieu.Danh_sach_Thanh_ly = Du_lieu.Danh_sach_Thanh_ly.filter(x => x.Ma_so != Dien_thoai_Phuc_Hoi.Ma_so)
                        Chuoi_Kq = "OK"
                    } else {
                        Chuoi_Kq = "Error"
                    }

                })
                console.log(Du_lieu.Danh_sach_Dien_thoai)
            } else {
                Chuoi_Kq = Luu_tru.Doc_Thong_tin_Dich_vu()
            }
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.end(Chuoi_Kq);
        })

    })
Dich_vu.listen(Port,
    console.log("Dịch vụ Dữ liệu đang thực thi ...: " + Port)
);

