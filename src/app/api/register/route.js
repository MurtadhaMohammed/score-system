import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req, res) {
    const {name, email, password } = await req.json(); // In App Router, use req.json() to parse body

    if (!name || !email || !password) {
        return new Response(JSON.stringify({ message: 'Email and password are required' }), {
            status: 400,
        });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return new Response(JSON.stringify({ message: 'User already exists' }), {
            status: 409,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return new Response(JSON.stringify({ message: 'User created', user }), {
        status: 201,
    });
}
