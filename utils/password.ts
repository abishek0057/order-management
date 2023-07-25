import bcrypt from "bcryptjs";

const saltRounds = 10;

const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.log(error);
  }
};

const validatePassword = async (password: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    console.log(error);
  }
};

export { hashPassword, validatePassword };
