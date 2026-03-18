# 📄 RSA Keys - JWT RS256 Implementation

## **Giới thiệu**

Dự án này sử dụng **RS256 (RSA Signature with SHA-256)** thay vì HS256 để ký JWT token. Đây là thuật toán asymmetric, an toàn hơn cho hệ thống production.

---

## **2 File Khóa Được Tạo**

### **1. `private_key.pem` (Khóa Riêng)**
```
-----BEGIN PRIVATE KEY-----
[RSA 2048-bit private key]
-----END PRIVATE KEY-----
```

**Công dụng:**
- ✅ Dùng để **sign (ký)** JWT token
- ✅ Chỉ server biết, không được public
- ✅ Nằm trong thư mục gốc project

**Vị trí sử dụng:**
- File: `routes/auth.js`
- Hàm: `router.post('/login', ...)` 
- Code:
  ```javascript
  const PRIVATE_KEY = fs.readFileSync('./private_key.pem', 'utf8');
  let token = jwt.sign({id: user._id}, PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: '1h'
  })
  ```

---

### **2. `public_key.pem` (Khóa Công Khai)**
```
-----BEGIN PUBLIC KEY-----
[RSA 2048-bit public key]
-----END PUBLIC KEY-----
```

**Công dụng:**
- ✅ Dùng để **verify (kiểm tra)** JWT token
- ✅ Có thể công khai (không nhạy cảm)
- ✅ Nằm trong thư mục gốc project

**Vị trí sử dụng:**
- File: `utils/authHandler.js`
- Hàm: `CheckLogin`
- Code:
  ```javascript
  const PUBLIC_KEY = fs.readFileSync('./public_key.pem', 'utf8');
  let result = jwt.verify(token, PUBLIC_KEY, {
    algorithms: ['RS256']
  })
  ```

---

## **So Sánh HS256 vs RS256**

| Tiêu chí | HS256 | RS256 |
|---------|-------|-------|
| **Loại** | Symmetric | Asymmetric |
| **Secret** | 1 secret string | Private + Public key |
| **Ký token** | 1 secret | Private key |
| **Verify token** | 1 secret | Public key |
| **An toàn** | Thấp (nếu secret leak) | Cao (public key công khai) |
| **Use case** | Micro-service nội bộ | Production, public API |

---

## **Cách Khởi Tạo Keys (Nếu cần)**

### **Sử dụng Node.js:**
```javascript
const crypto = require('crypto');
const fs = require('fs');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

fs.writeFileSync('private_key.pem', privateKey);
fs.writeFileSync('public_key.pem', publicKey);
```

### **Chạy script:**
```bash
node generateKeys.js
```

---

## **JWT Token Structure (RS256)**

JWT token gồm 3 phần: `Header.Payload.Signature`

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6IjY5YjBkZGVj...","iat":1716033840,"exp":1716037440}.
TJVA95OrM7E2cBab30Rm...
```

**Phần 1 - Header (Base64):**
```json
{
  "alg": "RS256",       // Thuật toán
  "typ": "JWT"          // Loại token
}
```

**Phần 2 - Payload (Base64):**
```json
{
  "id": "69b0ddec842e41e8160132b8",  // User ID
  "iat": 1716033840,                   // Issued At (thời gian cấp)
  "exp": 1716037440                    // Expiration (hết hạn sau 1 giờ)
}
```

**Phần 3 - Signature (kỹ RSA):**
```
TJVA95OrM7E2cBab30RmHHR3FMytBIiP60wPmwQBXc=
(Được ký bằng private key)
```

---

## **Quy Trình Authentication**

```
1. User Login (POST /auth/login)
   ├─ Input: { username, password }
   ├─ Server: Hash check password
   ├─ Server: Sign JWT với PRIVATE_KEY
   └─ Output: JWT token RS256

2. User Access Protected Route (GET /auth/me)
   ├─ Header: Authorization: Bearer <token>
   ├─ Server: Verify JWT với PUBLIC_KEY
   ├─ Server: Extract user ID từ payload
   ├─ Server: Query database
   └─ Output: User info

3. Token Hết Hạn
   ├─ Check: exp * 1000 < Date.now()
   └─ Result: 401 Unauthorized (yêu cầu login lại)
```

---

## **Files Liên Quan**

| File | Mục đích |
|------|---------|
| `routes/auth.js` | Sign JWT với RS256 |
| `utils/authHandler.js` | Verify JWT với RS256 |
| `private_key.pem` | Private key (giữ bí mật) |
| `public_key.pem` | Public key (công khai) |
| `generateKeys.js` | Script tạo keys |

---

## **Bảo Mật**

⚠️ **QUAN TRỌNG:**
- ✅ `private_key.pem`: Thêm vào `.gitignore` (không push lên git)
- ✅ `public_key.pem`: Có thể public
- ✅ Thay đổi key định kỳ trong production
- ✅ Lưu key an toàn, không hardcode password

---

## **Testing**

### **Test Login:**
```bash
POST http://localhost:3000/api/v1/auth/login
Body: {"username":"admin","password":"Admin@123"}
Response: JWT token RS256
```

### **Test Protected Route (/me):**
```bash
GET http://localhost:3000/api/v1/auth/me
Header: Authorization: Bearer <token>
Response: User info
```

---

**Created:** 2026-03-18  
**Algorithm:** RS256 (RSA Signature with SHA-256)  
**Key Size:** 2048 bits
