import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword: string, password: string): boolean {
    if (!hashPassword || !password) return false;
    return bcrypt.compareSync(password, hashPassword);
  },

  passwordLength(passwordLength: number) {
    return passwordLength >= 7;
  },

  isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id: number): string {
    const token = jwt.sign({
      userID: id,
    },
    process.env.JWT_SECRET!, { expiresIn: '3h' });
    return token;
  },

  checkForChar(field: string): boolean {
    const char = /^[a-zA-Z]+$/;
    const data = field.trim();
    if (char.test(data)) {
      return true;
    }
    return false;
  },

  userRoleDataValidation(role: string): boolean {
    const roles = ['admin', 'applicant', 'employer'];
    if (roles.includes(role)) {
      return true;
    }
    return false;
  },

};
