'use server'

import bcrypt from "bcryptjs";
import { ConnectDB } from "lib/db";
import { generateJwtToken, generateRefreshToken } from "lib/JWT/JwtToken";
import { User } from "lib/models/users.model";
import { cookies } from "next/headers";
import { SignUpParams } from "types";

export const SignUp = async (userData: SignUpParams) => {
    try {
        await ConnectDB()
        const { firstName, lastName, address, city, state, postalCode, dateOfBirth, ssn, email, password } = userData

        if (!email || !password) {
            throw new Error('Email and password are required for sign-up.');
        }
        const existing = await User.findOne({email})
        if(existing) {
            throw new Error('A user with this email already exists. Please use a different email address.');
        }

        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters long.');
        }
        if (firstName && firstName.length < 2) {
            throw new Error('First name must be at least 2 characters long.');
        }
        if (lastName && lastName.length < 2) {
            throw new Error('Last name must be at least 2 characters long.');
        }
        if (address && address.length < 5) {
            throw new Error('Address must be at least 5 characters long.');
        }
        if (state && state.length < 2) {
            throw new Error('State must be at least 2 characters long.');
        }
        if (postalCode && postalCode.length < 5) {
            throw new Error('Postal code must be at least 5 characters long.');
        }
        if (dateOfBirth && dateOfBirth.length < 10) {
            throw new Error('Please enter a valid date of birth.');
        }
        if (ssn && ssn.length < 9) {
            throw new Error('SSN must be at least 9 characters long.');
        }
        if (!email.includes('@')) {
            throw new Error('Please enter a valid email address.');
        }

        const genSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, genSalt)

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            address,
            state,
            city,
            postalCode,
            dateOfBirth,
            ssn
        })
        if(!newUser) {
            throw new Error('Failed to create user. Please try again.');
        }

        const UserReponse = {
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            address: newUser.address,
            state: newUser.state,
            city: newUser.city,
            postalCode: newUser.postalCode,
            dateOfBirth: newUser.dateOfBirth,
        }
        return UserReponse

    } catch (error) {
        console.error('Error during sign-up:', error);
    }
}
export const SignIn = async (userData: SignUpParams) => {
    try {
        const { email, password } = userData
        await ConnectDB()
        if (!email || !password) {
            throw new Error('Email and password are required for sign-in.');
        }
        const existing = await User.findOne({email})
        if(!existing) {
            throw new Error('No user found with this email. Please check your email address or sign up for a new account.');
        }
        const isMatch = await bcrypt.compare(password, existing.password)
        if(!isMatch) {
            throw new Error('Incorrect password. Please try again.');
        }

        const token = generateJwtToken(existing._id, existing.email)
        const refreshToken = generateRefreshToken(existing._id, existing.email)

        existing.refreshToken = refreshToken
        await existing.save()

        const userResponse = {
            email: existing.email,
            firstName: existing.firstName,
            lastName: existing.lastName,
            address: existing.address,
            state: existing.state,
            city: existing.city,
            postalCode: existing.postalCode,
            dateOfBirth: existing.dateOfBirth,
            token,
        }
        const cookieStore = await cookies();
        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            path:"/",
            maxAge: 30 * 24 * 60 * 60, 
        });
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            path:"/",
            maxAge: 60 * 60, 
        });

        return userResponse

    } catch (error) {
        console.error('Error during sign-in:', error);
    }
}