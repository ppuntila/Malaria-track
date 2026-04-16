# Malaria Outbreak Dashboard | ระบบติดตามสถานการณ์โรคไข้มาลาเรีย

[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/ppuntila/Track-Malaria)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

แดชบอร์ดติดตามและรายงานสถานการณ์การแพร่ระบาดของโรคไข้มาลาเรียในพื้นที่ B1 ต.ทับไทร และ ต.โป่งน้ำร้อน จ.จันทบุรี พัฒนาเพื่อการจัดการข้อมูลผู้ป่วย ไทม์ไลน์ และแผนที่พิกัดบ้านผู้ป่วยอย่างเป็นระบบ

## 🌟 ฟีเจอร์หลัก (Key Features)

- **Main Dashboard**: สรุปสถิติผู้ป่วยทั้งหมด, จำนวนผู้ป่วยที่ยังพบเชื้อ และ Admin (Admit)
- **Timeline Visualization**: ไทม์ไลน์แสดงลำดับการเกิดเคสตามวันที่เริ่มป่วย เพื่อวิเคราะห์การแพร่กระจายของโรค
- **Risk Map (Leaflet)**: แผนที่แสดงตำแหน่งบ้านผู้ป่วยและจุดอ้างอิงพื้นที่เสี่ยง (รัศมี 2 กม. จากวัดป่า)
- **Data Management**: ระบบนำเข้าและส่งออกข้อมูลผ่าน Excel (Smart Import/Export)
- **Auto-Save**: เก็บข้อมูลในเครื่องคอมพิวเตอร์โดยอัตโนมัติ (LocalStorage)
- **Print Support**: รองรับการพิมพ์รายงาน หรือบันทึกเป็น PDF ในรูปแบบที่สะอาดตา

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend**: HTML5, Vanilla CSS, React (via CDN)
- **Mapping**: Leaflet.js
- **Data Handling**: SheetJS (xlsx)
- **Design Architecture**: responsive, clean design with Glassmorphism elements

## 📂 โครงสร้างไฟล์ (File Structure)

- `index.html`: ไฟล์หลักที่รวมโครงสร้างและ Logic (React)
- `style.css`: ไฟล์จัดการดีไซน์และธีมทั้งหมด
- `app.js`: (หากมีการแยกไฟล์) Logic เสริมของระบบ
- `Malaria_Dashboard_System.zip`: ไฟล์บีบอัดสำหรับดาวน์โหลดระบบไปใช้งาน Offline

## 🚀 การติดตั้งและใช้งาน (Installation)

1. Clone repository นี้ลงเครื่อง:
   ```bash
   git clone https://github.com/ppuntila/Track-Malaria.git
   ```
2. เปิดไฟล์ `index.html` ด้วยเว็บเบราว์เซอร์ใดก็ได้
3. สามารถใช้งานได้ทันทีโดยไม่ต้องผ่าน Server (Standalone)

## 📄 ลิขสิทธิ์ (License)

Distributed under the MIT License. See `LICENSE` for more information.

---
**พัฒนาโดย Antigravity Master x DEK70 Quest Hub Team**
