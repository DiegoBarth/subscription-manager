import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
   const saltRounds = 10;
   return await bcrypt.hash(password, saltRounds);
}

export const comparePasswords = async (plain: string, hash: string) => {
   return bcrypt.compare(plain, hash);
};