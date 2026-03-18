let userModel = require("../schemas/users");
let bcrypt = require('bcrypt');

module.exports = {
    CreateAnUser: async function (username, password, email, role,
        fullName, avatarUrl, status, loginCount
    ) {
        let newItem = new userModel({
            username: username,
            password: password,
            email: email,
            fullName: fullName,
            avatarUrl: avatarUrl,
            status: status,
            role: role,
            loginCount: loginCount
        });
        await newItem.save();
        return newItem;
    },
    GetAllUser: async function () {
        let users = await userModel
            .find({ isDeleted: false })
        return users;
    },
    GetAnUserByUsername: async function (username) {
        let user = await userModel
            .findOne({
                isDeleted: false,
                username: username
            })
        return user;
    },
    GetAnUserById: async function (id) {
        let user = await userModel
            .findOne({
                isDeleted: false,
                _id: id
            })
        return user;
    },
    ChangePassword: async function (userId, oldPassword, newPassword) {
        try {
            let user = await userModel.findById(userId);
            if (!user) {
                throw new Error("Người dùng không tồn tại");
            }

            // Kiểm tra mật khẩu cũ
            if (!bcrypt.compareSync(oldPassword, user.password)) {
                throw new Error("Mật khẩu cũ không chính xác");
            }

            // Kiểm tra mật khẩu mới có khác mật khẩu cũ không
            if (oldPassword === newPassword) {
                throw new Error("Mật khẩu mới phải khác mật khẩu cũ");
            }

            // Hash mật khẩu mới
            let salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(newPassword, salt);

            // Lưu thay đổi
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }

}