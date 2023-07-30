import bcrypt from "bcryptjs";

const saltRound = 10;

const hashPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, saltRound);
  } catch (err) {
    throw new Error("Error hashing password");
  }
};

const validatePassword = async (
  password: string,
  hashPass: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashPass);
  } catch (err) {
    throw new Error("Error validating password");
  }
};

export { hashPassword, validatePassword };
