	// =============================================================================
	// MDT312 Assignment 7  - Square Game
	// Modern JavaScript: DOM, Event, Timer
	// =============================================================================

	// สั่งให้เบราว์เซอร์เรียกฟังก์ชัน pageLoad ทำงานโดยอัตโนมัติทันทีที่หน้าเว็บโหลดโครงสร้าง HTML และ Asset ทั้งหมดเสร็จสิ้น
	window.onload = pageLoad;
	// ประกาศตัวแปร timer ไว้ในขอบเขต Global (นอกฟังก์ชัน) เพื่อเก็บ ID ของตัวนับเวลา ช่วยให้ทุกฟังก์ชันสามารถสั่งเริ่มหรือหยุดจับเวลาได้จากจุดเดียวกัน
	let timer = null;

	function pageLoad(){

		// ค้นหาปุ่มที่มี ID start จากหน้าเว็บ แล้วเก็บไว้ในตัวแปร startBtn
		// ผูก Event การคลิก (onclick) เข้ากับฟังก์ชัน startGame เพื่อเริ่มเกมเมื่อกดปุ่ม
		const startBtn = document.getElementById("start");
		startBtn.onclick = startGame;


		// ดึง Element พื้นที่เล่นเกมที่มี ID layer มาเก็บใน gameLayer
		// กำหนด Event การคลิกไว้ที่ gameLayer โดยใช้เทคนิค Event Delegation (ดักฟังคลิกที่กล่องแม่เพียงจุดเดียว แทนการผูกทีละกล่อง)
		// event.target.classList.contains("square"): ตรวจสอบว่าสิ่งที่ถูกคลิกมี class ชื่อ square หรือไม่
		// event.target.remove(): หากใช่กล่อง square ให้ลบ Element ตัวที่ถูกคลิกนั้นออกจากหน้าจอทันที
		const gameLayer = document.getElementById("layer");
		gameLayer.onclick = function(event) {
			if (event.target.classList.contains("square")) {
				event.target.remove();
			}
		};
	}

	// แสดงกล่องข้อความเตือนผู้เล่นว่า "Ready"
	// เรียก clearScreen() เพื่อลบกล่องเก่าที่อาจค้างอยู่จากรอบก่อน
	// เรียก addBox() เพื่อสร้างกล่องชุดใหม่ตามจำนวนที่ตั้งไว้
	// เรียก timeStart() เพื่อเริ่มนับเวลาถอยหลัง
	function startGame(){
		alert("Ready");
		clearScreen();
		addBox();
		timeStart();
	}

	// กำหนดรอบความถี่ของการนับเวลา TIMER_TICK ไว้ที่ 1000 มิลลิวินาที (1 วินาที)
	// เช็กว่าถ้ามี timer เก่ากำลังรันอยู่ ให้สั่งยกเลิกด้วย clearInterval(timer) แล้วรีเซ็ตค่าเป็น null เพื่อป้องกันบั๊กเวลานับเร็วผิดปกติจากการกด Start ซ้ำ
	function timeStart(){
		const TIMER_TICK = 1000;
		if (timer !== null) {
			clearInterval(timer);	
			timer = null;
		}

		// กำหนดเวลาเล่น 0.5 นาที (30 วินาที) และคำนวณเก็บไว้ในตัวแปร second
		// ดึง Element แสดงเวลา ID clock มาอัปเดตข้อความบนหน้าจอให้แสดงตัวเลข 30 ทันที
		const min = 0.5;
		let second = min * 60; 
		const clockDisplay = document.getElementById('clock');
		clockDisplay.textContent = second;
		
		// สั่งให้ฟังก์ชันย่อย timeCount ทำงานซ้ำทุกๆ 1 วินาที และเก็บ ID ของรอบเวลานี้ไว้ในตัวแปร timer
		timer = setInterval(timeCount, TIMER_TICK);

		//ค้นหาและนับจำนวนกล่องทั้งหมด (div) ที่ยังหลงเหลืออยู่ใน #layer ณ วินาทีนั้น
		function timeCount(){
			const allbox = document.querySelectorAll("#layer div");

			//เงื่อนไขชนะ: หากจำนวนกล่องเป็น 0 (allbox.length === 0) และเวลายังมากกว่า 0 ให้หยุดจับเวลา แจ้งเตือนผู้เล่นว่า "You win!" และเคลียร์หน้าจอ
			if (allbox.length === 0 && second > 0) {
				clearInterval(timer);
				timer = null;
				alert("You win!");
				clearScreen();
			}

			// เงื่อนไขแพ้: หากเวลาหมดลง (second <= 0) โดยที่ยังมีกล่องเหลืออยู่ ให้หยุดจับเวลา แจ้งเตือนว่า "Game over" ล้างกล่องที่เหลือทิ้ง และตั้งค่าหน้าปัดเวลาเป็น 0
			else if (second <= 0) {
				clearInterval(timer);
				timer = null;
				alert("Game over");
				clearScreen();
				clockDisplay.textContent = 0;
			}

			// สถานะเกมดำเนินต่อ: หากยังไม่ชนะและเวลายังไม่หมด ให้ลดเวลาลง 1 วินาที (second--) และอัปเดตตัวเลขบนหน้าปัด clockDisplay
			else {
				second--;
				clockDisplay.textContent = second;
			}
		}
	}

	// อ่านค่าจำนวนกล่องจากช่อง Input numbox แล้วแปลงเป็นจำนวนเต็มด้วย parseInt (ถ้าแปลงไม่ได้ให้ใช้ค่า 0)
	// ดึง Element กระดาน #layer มารอไว้
	// อ่านค่าสีที่เลือกจาก Dropdown ID color
	function addBox(){

		const numbox = parseInt(document.getElementById("numbox").value) || 0;
		const gameLayer = document.getElementById("layer");
		const colorDrop = document.getElementById("color").value;
		
		// วนลูปตามจำนวนกล่องที่ต้องการสร้าง
		// document.createElement("div"): สร้างแท็ก <div> ใหม่ขึ้นมาในหน่วยความจำ
		// กำหนด class ให้กล่องเป็น square ตามด้วยชื่อสีที่เลือก เพื่อใช้จัดแต่งรูปแบบผ่าน CSS
		// กำหนด ID ให้แต่ละกล่อง เช่น box0, box1, ...
		for (let i = 0; i < numbox; i++){
			const tempbox = document.createElement("div"); 
			tempbox.className = "square " + colorDrop;   
			tempbox.id = "box" + i;

			// สุ่มตำแหน่งแนวนอน (left) และแนวตั้ง (top) ให้อยู่ในช่วง 0 ถึง 475px (หักขนาดตัวกล่อง 25px ออกจากขนาดสนาม 500px เพื่อไม่ให้กล่องล้นขอบ)
			// gameLayer.appendChild(tempbox): นำกล่องที่สร้างเสร็จแล้วใส่เข้าไปใน Element #layer เพื่อให้แสดงผลบนหน้าเว็บ
			tempbox.style.left = Math.random() * (500 - 25) + "px";
			tempbox.style.top = Math.random() * (500 - 25) + "px";
			
			gameLayer.appendChild(tempbox);
		}
	}

	function clearScreen(){

		// เลือก Element div ทุกตัวที่อยู่ภายใน #layer เก็บไว้ใน NodeList ชื่อ allbox
		// วนลูปสั่ง .remove() เพื่อลบ Node ของกล่องทีละตัวออกจาก DOM จนหมดสิ้น
		const allbox = document.querySelectorAll("#layer div");
		for (let i = 0; i < allbox.length; i++) {
			allbox[i].remove();
		}
	}