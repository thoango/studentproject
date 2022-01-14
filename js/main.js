let studentList = [];

const fetchStudentList = () => {
    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
        method: "GET"
    })
        .then((res) => {
            studentList = res.data;

            renderStudentList();
        })
        .catch((err) => {
            console.log(err);
        })
}

const renderStudentList = () => {
    let trContent = "";

    for (let student of studentList) {
        trContent += `
            <tr>
                <td>${student.MaSV}</td>
                <td>${student.HoTen}</td>
                <td>${student.Email}</td>
                <td>${student.SoDT}</td>
                <td>${student.DiemToan}</td>
                <td>${student.DiemLy}</td>
                <td>${student.DiemHoa}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteStudent('${student.MaSV}')">Delete</button>
                    <button class="btn btn-info" onclick="getStudent('${student.MaSV}')">Update</button>
                </td>
            </tr>
        `;
    }

    document.getElementById("tableDanhSach").innerHTML = trContent;
}

const addStudent = () => {
    let idStudent = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let idCard = document.getElementById("idCard").value;
    let math = document.getElementById("math").value;
    let physics = document.getElementById("physics").value;
    let chemistry = document.getElementById("chemistry").value;

    let student = new Student(idStudent, name, email, phone, idCard, math, physics, chemistry);
    
    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
        method: "POST",
        data: student
    })
        .then((res) => {
            fetchStudentList();
        })
        .catch((err) => {
            console.log(err);
        })
}

const deleteStudent = (id) => {
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`,
        method: "DELETE"
    })
        .then((res) => {
            fetchStudentList();
        })
        .catch((err) => {
            console.log(err);
        })
}

const getStudent = (id) => {
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`,
        method: "GET"
    })
        .then((res) => {
            document.getElementById("btnThem").click();

            let student = res.data;

            document.getElementById("id").value = student.MaSV;
            document.getElementById("name").value = student.HoTen;
            document.getElementById("email").value = student.Email;
            document.getElementById("phone").value = student.SoDT;
            document.getElementById("idCard").value = student.CMND;
            document.getElementById("math").value = student.DiemToan;
            document.getElementById("physics").value = student.DiemLy;
            document.getElementById("chemistry").value = student.DiemHoa;

            document.getElementById("id").setAttribute("disabled", true);
        })
        .catch((err) => {
            console.log(err);
        })
}

const updateStudent = () => {
    let idStudent = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let idCard = document.getElementById("idCard").value;
    let math = document.getElementById("math").value;
    let physics = document.getElementById("physics").value;
    let chemistry = document.getElementById("chemistry").value;

    let updatedStudent = new Student(idStudent, name, email, phone, idCard, math, physics, chemistry);

    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien",
        method: "PUT",
        data: updatedStudent
    })
        .then((res) => {
            fetchStudentList();

            document.getElementById("btnReset").click();
            document.getElementById("id").removeAttribute("disabled");
            document.getElementById("btnClose").click();
        })
        .catch((err) => {
            console.log(err);
        })
}

fetchStudentList();