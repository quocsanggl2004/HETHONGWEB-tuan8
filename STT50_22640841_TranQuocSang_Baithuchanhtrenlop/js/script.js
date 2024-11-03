$(document).ready(function() {
    var i = 2;
    
    // Mở Modal khi nhấp vào nút Đăng ký
    $("#btnDK").click(function() {
        $("#myModal").modal("show");
    });

    // Kiểm tra mã học viên
    function kiemTraMa() {
        var mauKT = /^[0-9]{8}$/; // Đảm bảo đúng định dạng 9 số
        if ($("#txtMa").val() === "") {
            $("#tbMa").html("Bắt buộc nhập");
            $("#tbMa").addClass("mauDo");
        } else if (!mauKT.test($("#txtMa").val())) {
            $("#tbMa").html("Nhập sai");
            $("#tbMa").addClass("mauDo");
        } else {
            $("#tbMa").html("*");
            $("#tbMa").removeClass("mauDo");
        }
    }
    $("#txtMa").blur(kiemTraMa);

    // Kiểm tra họ tên
    function kiemTraHT() {
        var kt = /(^[A-Z]{1}[a-z]+)(\s[A-Z]{1}[a-z]*)+$/;
        if ($("#txtHT").val() === "") {
            $("#tbTen").html("Nhập sai");
            $("#tbTen").addClass("mauDo");
            return false;
        }
        $("#tbTen").html("*");
        $("#tbTen").removeClass("mauDo");
        return true;
    }
    $("#txtHT").blur(kiemTraHT);

    // Kiểm tra email
    function kiemTraDC() {
       
        var mauKT = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{3,}@iuh\.edu\.vn$/; // Còn giữ nguyên
    
        if ($("#txtDC").val() == "") {
            $("#tbDC").html("Bắt buộc nhập");
            $("#tbDC").addClass("mauDo");
            return false; // Nếu trường trống, kết thúc hàm
        }
    
        if (!mauKT.test($("#txtDC").val())) {
            $("#tbDC").html("Nhập sai");
            $("#tbDC").addClass("mauDo");
            return false; // Nếu không khớp với mẫu, thông báo lỗi
        }
    
        $("#tbDC").html("*"); // Nếu hợp lệ, hiển thị dấu sao
        return true; // Trả về true nếu mọi thứ đều hợp lệ
    }
    
    $("#txtDC").blur(kiemTraDC);

    // Lấy giá trị dịch vụ
    $("#slGia").change(function() {
        $("#slGia option:selected").each(function() {
            $("#txtDV").val($(this).val());
            tinhTong(); // Cập nhật tổng tiền khi chọn dịch vụ
        });
    });

    // Tính tiền cho đồ dùng và tổng tiền
    $("input[name='chkDoDung']").change(function() {
        tinhTong(); // Cập nhật tổng tiền khi chọn đồ dùng
    });

    function tinhTong() {
        var tienDD = 0;
        $("input[name='chkDoDung']:checked").each(function() {
            tienDD += parseFloat($(this).val());
        });
        $("#txtDD").val(tienDD);
        
        var tong = parseFloat($("#txtDD").val()) + parseFloat($("#txtDV").val());
        $("#txtTong").val(tong);
    }

    // Lưu lại thông tin khi nhấn Thanh toán
    $("#btnSave").click(function() {
        // Kiểm tra sự hợp lệ trước khi thêm vào bảng
        if ($("#tbMa").html() === "*" && $("#tbTen").html() === "*" && $("#tbDC").html() === "*") {
            var ma = $("#txtMa").val();
            var ht = $("#txtHT").val();
            var dc = $("#txtDC").val();
            var tdv = $("#txtDV").val();
            var tdd = $("#txtDD").val();
            var tong = $("#txtTong").val();
            var them = "<tr><td>" + (i++) + "</td><td>" + ma + "</td><td>" + ht + "</td><td>" + dc + "</td><td>" +
                tdv + "</td><td>" + tdd + "</td><td>" + tong + "</td></tr>";
            $("#tbDanhSach").append(them);
            $("#myModal").modal("hide");
        }
    });
});