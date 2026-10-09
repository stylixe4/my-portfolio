// สั่งให้เบราว์เซอร์รอจนหน้าเว็บโหลดโครงสร้าง HTML และข้อมูลทั้งหมดเสร็จเรียบร้อยก่อน แล้วจึงค่อยเรียกฟังก์ชัน pageLoad() ให้เริ่มทำงาน
window.onload = pageLoad;

function pageLoad() {
    // ค้นหาตัวฟอร์มจากหน้า HTML โดยพยายามหาจาก id="myRegister" ก่อน หากหาไม่เจอ จะค้นหาจากชื่อฟอร์ม name="myRegister" แทน
    const form = document.getElementById("myRegister") || document.forms["myRegister"];
    // ตรวจสอบว่าถ้าเจอตัวฟอร์มอยู่จริงในหน้าเว็บ เมื่อมีคนกดปุ่ม Submit ให้กระโดดไปเรียกใช้ฟังก์ชัน validateForm เพื่อตรวจเช็กข้อมูล ก่อนส่งข้อมูลไปจริง
    if (form) form.onsubmit = validateForm;
}

// ฟังก์ชันตรวจสอบข้อมูลก่อนส่งฟอร์มลงทะเบียน
function validateForm(event) {
    // 1. ป้องกันไม่ให้หน้าเว็บรีเฟรชเองตอนกด submit
    if (event) event.preventDefault();

    // 2. ดึงค่าจากฟอร์มและตัดช่องว่างส่วนเกิน
    const form = document.forms["myRegister"];
    const username = form["username"].value.trim();
    const password = form["password"][0].value;         // รหัสผ่านช่องแรก
    const retypePassword = form["password"][1].value;   // รหัสผ่านยืนยันช่องที่สอง
    const errorMsg = document.getElementById("errormsg"); // จุดแสดงข้อความแจ้งเตือน

    // 3. ตรวจสอบ: ถ้ารหัสผ่านไม่ตรงกัน ให้แจ้งเตือนแล้วหยุดทำงาน
    if (password !== retypePassword) {
        errorMsg.innerText = "Password ไม่ตรงกัน กรุณากรอกใหม่อีกครั้ง";
        return false;
    }

    // 4. ถ้ารหัสผ่านถูกต้อง ให้ล้างข้อความแจ้งเตือนเดิมออก
    errorMsg.innerText = "";

    // 5. บันทึกข้อมูลบัญชีลงเครื่อง (localStorage)
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // 6. แจ้งเตือนสำเร็จ แล้วพาไปยังหน้า Login
    alert("ลงทะเบียนสำเร็จ! ระบบบันทึกข้อมูลเรียบร้อย กำลังไปที่หน้า Login");
    window.location.href = "login.html";
    return true;
}