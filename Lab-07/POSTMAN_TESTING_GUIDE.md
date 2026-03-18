# 📋 Hướng Dẫn Test API trên Postman

## **Chuẩn Bị**

1. **Download Postman:** https://www.postman.com/downloads/
2. **Server chạy:** `npm start` (port 3000)
3. **MongoDB chạy:** mongod service running
4. **User test tạo sẵn:** admin / Admin@123

---

## **PHẦN 1: Test Login Endpoint**

### **Bước 1: Tạo Request POST Login**

1. Mở Postman
2. Click **"+"** → Tab mới
3. **Đổi GET thành POST**
4. **Nhập URL:** `http://localhost:3000/api/v1/auth/login`

### **Bước 2: Cấu hình Headers**

Click **"Headers"** tab:

| Key | Value |
|-----|-------|
| Content-Type | application/json |

### **Bước 3: Nhập Body**

1. Click **"Body"** tab
2. Chọn **"raw"**
3. Chọn **"JSON"** từ dropdown
4. Paste:

```json
{
  "username": "admin",
  "password": "Admin@123"
}
```

### **Bước 4: Send Request**

1. Click **"Send"** button
2. Xem kết quả trong **"Response"** tab

### **Kết Quả Expected:**

```
Status: 200 OK

Body: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjBkZGVjODQyZTQxZTgxNjAxMzJiOCIsImlhdCI6MTcxNjAzNDI4MCwiZXhwIjoxNzE2MDM3ODgwfQ.TJVA95OrM7E2cCab30RmHR3FMytBIiP60wPmwQBXc...
```

### **📸 Ảnh Cần Chụp #1:**

Chụp ảnh màn hình Postman lúc này:
- ✓ URL hiển thị: `http://localhost:3000/api/v1/auth/login`
- ✓ Method: POST
- ✓ Body: JSON với username/password
- ✓ Response: Status 200 + JWT token

**Tên file:** `01_login_postman.png`

---

## **PHẦN 2: Test /me Endpoint**

### **Bước 1: Sao chép Token**

Từ response Login trên:
1. Chọn toàn bộ token từ Response
2. Copy (Ctrl+C)

### **Bước 2: Tạo Request GET /me**

1. Click **"+"** → Tab mới
2. **Đổi POST thành GET**
3. **Nhập URL:** `http://localhost:3000/api/v1/auth/me`

### **Bước 3: Cấu hình Authorization Header**

1. Click **"Headers"** tab
2. Thêm header mới:

| Key | Value |
|-----|-------|
| Content-Type | application/json |
| Authorization | Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6... |

⚠️ **Cẩn thận:** 
- Sau "Bearer" phải có **dấu cách**
- Paste token đầy đủ: **"Bearer "** + **token**

### **Bước 4: Send Request**

1. Click **"Send"**
2. Xem Response

### **Kết Quả Expected:**

```json
{
  "_id": "69b0ddec....",
  "username": "admin",
  "email": "admin@test.com",
  "fullName": "Admin User",
  "status": true,
  "role": "69b0ddec842e41e8160132b8",
  "loginCount": 0,
  "avatarUrl": "https://i.sstatic.net/l60Hf.png",
  "createdAt": "2026-03-18T...",
  "updatedAt": "2026-03-18T..."
}
```

### **📸 Ảnh Cần Chụp #2:**

Chụp ảnh Postman lúc này:
- ✓ URL: `http://localhost:3000/api/v1/auth/me`
- ✓ Method: GET
- ✓ Headers: Authorization với Bearer token
- ✓ Response: 200 OK + User data

**Tên file:** `02_me_endpoint_postman.png`

---

## **PHẦN 3: Git Commit & Push**

### **Bước 1: Chuẩn bị Files**

Mở Terminal (PowerShell):

```powershell
cd "d:\Trinh\NNPTUD\2280603399-NguyenCaoMinhTrinh\Lab-07"
```

### **Bước 2: Check Status**

```powershell
git status
```

Bạn sẽ thấy:
- Modified files: `app.js`, `routes/auth.js`, `controllers/users.js`, etc.
- Untracked files: `private_key.pem`, `public_key.pem`, `test.html`, etc.

### **Bước 3: Add All Files**

```powershell
git add .
```

### **Bước 4: Check Lại**

```powershell
git status
```

Lúc này tất cả files phải chuyển từ "untracked" → "Changes to be committed"

### **Bước 5: Commit**

```powershell
git commit -m "Implement changepassword API & convert JWT to RS256

- Add ChangePassword function in controllers/users.js
  * Verify old password using bcrypt
  * Validate new password strength
  * Hash new password before saving
  
- Implement RS256 algorithm for JWT
  * Generate RSA 2048-bit key pair (private_key.pem, public_key.pem)
  * Update auth.js to sign token with private key
  * Update authHandler.js to verify token with public key
  
- Add CORS support in app.js for cross-origin requests

- Add ChangePasswordValidator in utils/validateHandler.js
  * Validate oldPassword not empty
  * Validate newPassword with strong password rules
  
- Add POST /api/v1/users/changepassword endpoint
  * Requires authentication (CheckLogin middleware)
  * Request body: oldPassword, newPassword
  
- Create test user (admin/Admin@123) for testing
- Add test.html for browser-based API testing
- Create RS256_KEYS_GUIDE.md documentation"
```

### **Bước 6: Push Lên Remote**

```powershell
git push origin 20260318
```

### **📸 Ảnh Cần Chụp #3:**

Chụp ảnh Terminal sau khi push thành công:
- ✓ Kết quả `git status` trước commit
- ✓ Kết quả `git commit -m "..."`
- ✓ Kết quả `git push origin 20260318`

**Tên file:** `03_git_commit_push.png`

---

## **Tóm Tắt - Ảnh Cần Chụp**

| # | Nội dung | File |
|---|----------|------|
| 1 | Login endpoint (Status 200 + token) | `01_login_postman.png` |
| 2 | /me endpoint (Status 200 + user info) | `02_me_endpoint_postman.png` |
| 3 | Git commit & push | `03_git_commit_push.png` |

---

## **Lưu Ý Khi Chụp Ảnh**

✅ **Nên chụp:**
- Full screen hoặc phần quan trọng rõ ràng
- Status code, headers, response body đều hiển thị
- Font size đủ lớn để đọc
- Tiêu đề tab/window rõ ràng

❌ **Không nên:**
- Ảnh mờ, quá nhỏ
- Che che token (có thể crop nhưng phải thấy format)
- Quên hiển thị response

---

## **File Mã Hoá - 2 RSA Keys**

### **1. private_key.pem**
- ✅ Dùng để **sign** JWT token khi login
- ✅ Vị trí: `routes/auth.js`
- ✅ Bảo mật: Không push lên public repo (để trong `.gitignore`)

### **2. public_key.pem**
- ✅ Dùng để **verify** JWT token
- ✅ Vị trí: `utils/authHandler.js`
- ✅ Công khai: Có thể push lên git

**Xem nội dung keys:**
```powershell
# Xem private key
cat private_key.pem

# Xem public key
cat public_key.pem
```

---

## **Files Nộp Git**

```
📦 Lab-07/
├── 📄 app.js (modified - CORS added)
├── 📄 routes/auth.js (modified - RS256 signing)
├── 📄 routes/users.js (modified - /changepassword endpoint)
├── 📄 controllers/users.js (modified - ChangePassword function)
├── 📄 utils/authHandler.js (modified - RS256 verification)
├── 📄 utils/validateHandler.js (modified - ChangePasswordValidator)
├── 🔐 private_key.pem (NEW - RSA private key)
├── 🔐 public_key.pem (NEW - RSA public key)
├── 📄 RS256_KEYS_GUIDE.md (NEW - Documentation)
├── 📄 test.html (NEW - Browser UI test)
├── 📄 createTestUser.js (NEW - Test user setup)
├── 📄 generateKeys.js (NEW - Key generation script)
└── 📸 (Ảnh Postman)
    ├── 01_login_postman.png
    ├── 02_me_endpoint_postman.png
    └── 03_git_commit_push.png
```

---

**Hoàn thành!** 🎉
