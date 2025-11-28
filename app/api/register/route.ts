import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/utils/mongodb';
import User from '@/app/models/User';

interface RegistrationBody {
  email: string;
  password: string;
  name: string;
  role: string;
}

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    const body: RegistrationBody = await request.json();
    const { email, password, name, role } = body;

    // Validation
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!['student', 'admin', 'consumer'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role selected' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists in MongoDB
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('⚠️ Registration failed: User already exists:', email);
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password with bcrypt
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Log registration attempt
    console.log('📝 New user registration attempt:', {
      email,
      name,
      role,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    });

    // Create new user in MongoDB
    const newUser = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role,
    });

    console.log('✅ User registration successful:', {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      timestamp: newUser.createdAt
    });

    // Determine dashboard based on role
    const dashboard = newUser.role === 'admin' ? 'admin_dashboard' : newUser.role === 'consumer' ? 'consumer' : 'student_dashboard';
    const redirectMessage = `User registered successfully. Redirecting to /${dashboard}`;

    // Return full user object (excluding password)
    return NextResponse.json(
      { 
        message: redirectMessage,
        user: {
          id: newUser._id.toString(),
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
        },
        dashboard: dashboard
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('❌ Registration error:', error);
    
    // Handle MongoDB duplicate key error
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
