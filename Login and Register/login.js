// รอให้หน้าเว็บโหลดโครงสร้างเสร็จก่อนเริ่มทำงาน
window.onload = loginLoad;

// ผูกเหตุการณ์ตอนกดส่งฟอร์ม (Submit) เข้ากับฟังก์ชันตรวจเช็ก
function loginLoad() {
    const form = document.getElementById("myLogin") || document.forms["myLogin"];
    if (form) form.onsubmit = checkLogin;
}

// ตรวจสอบความถูกต้องของ Username และ Password
function checkLogin(event) {
    // 1. ป้องกันไม่ให้หน้าเว็บรีเฟรชเอง
    if (event) event.preventDefault();

    // 2. ดึงค่าที่ผู้ใช้กรอกเข้ามา
    const usernameInput = document.forms["myLogin"]["username"].value.trim();
    const passwordInput = document.forms["myLogin"]["password"].value;

    // 3. เตรียมรายชื่อบัญชีที่อนุญาตให้เข้าระบบ (มี admin เป็นค่าเริ่มต้น)
    const users = [{ username: "admin", password: "123456" }];  

    // 4. ดึงบัญชีที่เคยบันทึกไว้ในเครื่อง (ถ้ามี) เข้ามาร่วมในระบบด้วย
    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");
    if (storedUser && storedPass) {
        users.push({ username: storedUser, password: storedPass });
    }

    // 5. ตรวจสอบว่าตรงกับบัญชีใดบัญชีหนึ่งหรือไม่
    let isSuccess = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === usernameInput && users[i].password === passwordInput) {
            isSuccess = true;
            break; // เจอข้อมูลตรงกันแล้ว หยุดตรวจต่อทันที
        }
    }

    // 6. แจ้งผลการเข้าสู่ระบบ
    if (isSuccess) {
        alert("Login success! ยินดีต้อนรับเข้าสู่ระบบ");
        return true;
    } else {
        alert("Username หรือ password ไม่ถูกต้อง");
        return false;
    }
}