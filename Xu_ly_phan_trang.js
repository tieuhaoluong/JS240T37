var recordPerPage = 10;
function XuLyPhanTrang(data, currentPage, recordPerPage) {
    var totalRecord = data.length;
    var totalPage = totalRecord % recordPerPage == 0 ? totalRecord / recordPerPage : parseInt(totalRecord / recordPerPage) + 1;

    var pagingHTML = 
        `<ul class="pagination justify-content-center">`
        for (var i = 1; i <= totalPage; i++) {
            pagingHTML += 
            `<li class="page-item ${i==currentPage? 'active': ''}">
                <a class="page-link" href="javaScript:void(0)" onclick="XuLyPhanTrang(Danh_sach_Dien_thoai, ${i} ,${recordPerPage})" >${i}</a>
            </li>`
        }
        pagingHTML += `</ul>`
        Th_Phan_trang.innerHTML = pagingHTML
        Th_Phan_trang_Bottom.innerHTML = Th_Phan_trang.innerHTML
    Th_Cha.innerHTML = ""
    data.forEach((element, index) => {
        
        if((currentPage-1)*recordPerPage <= index && index+1 <= currentPage*recordPerPage){
            
            var item = Tao_The_hien_Dien_thoai(element, Th_Cha);
            item.childNodes[0].onclick = () => {
                //The_hien.childNodes[0].classList.toggle("CHON")
                var Dien_thoai = The_hien.childNodes[0].parentNode.getAttribute("data")
                sessionStorage.setItem("giohang", Dien_thoai)
                window.location = "MH_Gio_hang.html"
            }
            item.childNodes[1].onclick = () => {
                var Dien_thoai_Chon = JSON.parse(The_hien.childNodes[1].parentNode.getAttribute("data"))
                var noi_dung_HTML = `
                    <h4 class="text-primary">${Dien_thoai_Chon.Ten}</h4>
                    <img src="https://dichvumedia.herokuapp.com/${Dien_thoai_Chon.Ma_so}.png" />
                `
                Th_Chi_tiet.innerHTML = noi_dung_HTML
                Th_Show.click()
            }
        }
        
    });
    Th_Thong_bao.innerHTML = `<h3>Danh sách Điện thoại (${totalRecord}) </h3>`
}

function Pagination(data, recordPerPage, pagingParent) {
    var Tong_so_san_pham = Danh_sach.length
    var Tong_trang = (Tong_so_san_pham % So_san_pham_cho_mot_trang == 0) ? Tong_so_san_pham / So_san_pham_cho_mot_trang : parseInt(Tong_so_san_pham / So_san_pham_cho_mot_trang) + 1
    var noi_dung_HTML = `<nav aria-label="Page navigation example">`
    noi_dung_HTML += `
    <ul class="pagination justify-content-center">
    `
    for (var i = 1; i <= Tong_trang; i++) {
        var vt = (i - 1) * So_san_pham_cho_mot_trang
        noi_dung_HTML += `<li class="page-item"><a class="page-link" href="javaScript:void(0)" onclick="Xuat_Danh_sach_Phan_trang(Danh_sach_Dien_thoai, Th_Thong_bao,${vt} ,${limit})" >${i}</a></li>`
    }
    noi_dung_HTML += `
    </ul>
    </nav>
    `
    Th_Cha.innerHTML = noi_dung_HTML
}

// function Xuat_Danh_sach_Phan_trang(Danh_sach, Th_thong_bao, vt, limit) {
//     Th_Cha.innerHTML = ""
//     var dem = 0
//     Danh_sach.forEach((Dien_thoai, index) => {
//         var The_hien = Tao_The_hien_Dien_thoai(Dien_thoai, Th_Cha)
//         if (index >= vt && dem < limit) {
//             //var The_hien = Tao_The_hien_Dien_thoai(Dien_thoai, Th_Cha)
//             The_hien.childNodes[0].onclick = () => {
//                 //The_hien.childNodes[0].classList.toggle("CHON")
//                 var Dien_thoai = The_hien.childNodes[0].parentNode.getAttribute("data")
//                 sessionStorage.setItem("giohang", Dien_thoai)
//                 window.location = "MH_Gio_hang.html"
//             }
//             The_hien.childNodes[1].onclick = () => {
//                 //console.log(The_hien.childNodes[1].parentNode.getAttribute("data"))
//                 var Dien_thoai_Chon = JSON.parse(The_hien.childNodes[1].parentNode.getAttribute("data"))
//                 var noi_dung_HTML = `
//                 <h4 class="text-primary">${Dien_thoai_Chon.Ten}</h4>
//                 <img src="https://dichvumedia.herokuapp.com/${Dien_thoai_Chon.Ma_so}.png" />
//             `
//                 Th_Chi_tiet.innerHTML = noi_dung_HTML
//                 Th_Show.click()
//             }
//             dem++
//         } else {
//             The_hien.style.cssText = "display:none"
//         }

//     });
//     Th_Thong_bao.innerHTML = `<h3>Danh sách Điện thoại (${Danh_sach.length}) </h3>`
// }