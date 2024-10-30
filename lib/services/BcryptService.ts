import bcrypt from 'bcrypt';
export class BcryptService {
    async hash(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async compare(plainPassword: string, hashedPassword: string) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}