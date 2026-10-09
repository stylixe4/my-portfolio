// ========================================================
// Assignment 5: JavaScript Post and Reply
// ========================================================

// กำหนดให้เรียกฟังก์ชัน setupFunction ทันทีหลังจากที่หน้าเว็บโหลดเสร็จสมบูรณ์ (DOM พร้อมทำงาน)
window.onload = setupFunction;

// ตัวแปรส่วนกลาง (Global Variable) สำหรับนับจำนวนครั้งที่โพสต์ เพื่อกำหนดลำดับว่าข้อความจะไปแสดงที่ไหน
let postCount = 0;

function setupFunction() {
    // 1. เข้าถึง element ที่มี id="top" แล้วเปลี่ยนข้อความข้างในเป็น "ยินดีต้อนรับเข้าสู่ฟอรัม"
    document.getElementById("top").innerText = "ยินดีต้อนรับดข้าสู่ฟอรัม";

    // 2. ดึงปุ่มทั้งหมด (<button>) ในหน้าเว็บมาเก็บเป็น Array/HTMLCollection
    let buttons = document.getElementsByTagName("button");
    
    // 3. ผูก Event Listener เมื่อคลิก:
    // - buttons[0] (ปุ่มแรก / ปุ่ม Post) -> เรียกใช้ฟังก์ชัน postFunction
    // - buttons[1] (ปุ่มที่สอง / ปุ่ม Clear) -> เรียกใช้ฟังก์ชัน clearFunction
    buttons[0].onclick = postFunction;
    buttons[1].onclick = clearFunction;
}

function postFunction() {
    // ดึงค่าข้อความที่พิมพ์อยู่ในกล่อง input/textarea ที่มี id="message"
    let message = document.getElementById("message").value;

    // ตรวจสอบความถูกต้อง: ถ้าข้อความว่างเปล่าหรือมีแค่ space (trim() ตัดช่องว่างหัว-ท้ายออก) ให้หยุดการทำงานทันที
    if (message.trim() === "") return;

    // เช็คลำดับการโพสต์จากตัวแปร postCount:
    if (postCount === 0) {
        // ครั้งที่ 1 (postCount = 0): นำข้อความไปแสดงที่หัวข้อหลัก (id="topic") แล้วเพิ่มค่า postCount เป็น 1
        document.getElementById("topic").innerText = message;
        postCount++;
    } else if (postCount === 1) {
        // ครั้งที่ 2 (postCount = 1): นำข้อความไปแสดงที่ความคิดเห็นที่ 1 (id="reply1") แล้วเพิ่มค่า postCount เป็น 2
        document.getElementById("reply1").innerText = message;
        postCount++;
    } else if (postCount === 2) {
        // ครั้งที่ 3 (postCount = 2): นำข้อความไปแสดงที่ความคิดเห็นที่ 2 (id="reply2") แล้วเพิ่มค่า postCount เป็น 3
        document.getElementById("reply2").innerText = message;
        postCount++;
    }
    // หมายเหตุ: หากกดโพสต์เกิน 3 ครั้ง (postCount >= 3) จะไม่แสดงผลที่ไหนเพิ่ม แต่จะยังเคลียร์กล่องข้อความตามปกติ

    // ล้างข้อความในกล่องพิมพ์ (id="message") ให้กลับเป็นช่องว่าง เพื่อเตรียมพร้อมรับข้อความถัดไป
    document.getElementById("message").value = "";
}

function clearFunction() {
    // ล้างข้อความที่แสดงอยู่ทั้งหมดบนหน้าจอให้กลับเป็นค่าว่าง
    document.getElementById("topic").innerText = "";
    document.getElementById("reply1").innerText = "";
    document.getElementById("reply2").innerText = "";
    document.getElementById("message").value = "";

    // รีเซ็ตตัวนับการโพสต์กลับไปเป็น 0 เพื่อเริ่มวงรอบการโพสต์ใหม่ตั้งแต่ topic
    postCount = 0;
}