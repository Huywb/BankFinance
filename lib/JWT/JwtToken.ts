import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const generateJwtToken = (userId: string, email: string) => {
    const payload = {
        userId,
        email,
    };
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error('Error generating JWT token:', error);
        throw new Error('Error generating JWT token');
    }
}

export const generateRefreshToken = (userId: string, email: string) => {
    const payload = {
        userId,
        email,
    };
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '30d' });
        return token;
    }
    catch (error) {
        console.error('Error generating refresh token:', error);
        throw new Error('Error generating refresh token');
    }
}

export const verifyJwtToken = async () => {
    try {
        const coookies = await cookies();
        const token = coookies?.get('token')?.value;
        if (!token) {
            throw new Error('No JWT token found in cookies');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if(!decoded || typeof decoded === 'string') {
            throw new Error('Invalid JWT token payload');
        }
        return decoded.toObject();
    } catch (error) {
        console.error('Error verifying JWT token:', error);
        throw new Error('Invalid or expired JWT token');
    }
}

export function middleware(req:NextRequest) {

  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {

    jwt.verify(token, process.env.JWT_SECRET!)

    return NextResponse.next()

  } catch {

    return NextResponse.redirect(new URL("/login", req.url))

  }

}