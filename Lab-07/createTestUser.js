const mongoose = require('mongoose');
const userModel = require('./schemas/users');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/NNPTUD-S4');

async function createTestUser() {
  try {
    // Kiểm tra user admin có tồn tại không
    let existingUser = await userModel.findOne({ username: 'admin' });
    if (existingUser) {
      console.log('✓ User admin đã tồn tại');
      console.log('Username:', existingUser.username);
      console.log('Email:', existingUser.email);
      return;
    }

    // Tạo user mới
    const newUser = new userModel({
      username: 'admin',
      password: 'Admin@123', // password sẽ được hash tự động
      email: 'admin@test.com',
      fullName: 'Admin User',
      role: '69b0ddec842e41e8160132b8', // Gán role mặc định
      status: true,
      loginCount: 0
    });

    await newUser.save();
    console.log('✓ User admin tạo thành công!');
    console.log('Username: admin');
    console.log('Password: Admin@123');
    console.log('Email: admin@test.com');

  } catch (error) {
    console.error('❌ Lỗi:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

createTestUser();
