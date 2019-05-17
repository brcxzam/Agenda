import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../database/model';
import config from '../jwt/jwt.config';
import verify from '../jwt/verify';
export default {
    login: async ({ email, password }) => {
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (user) {
            const res = await bcrypt.compare(password, user.password);
            if (res) {
                const token = jwt.sign({ user: user.id }, config.secret, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });
                return token;
            }
        }
        return "false";
    },
    test: (_, ctx) => {
        const user = verify(ctx.request);
        return user;
    }
}