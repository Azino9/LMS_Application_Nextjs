# Postman Testing Guide - User Registration API

## ✅ API Route Completed

**File**: `app/api/register/route.ts`

### Features Implemented:
- ✅ MongoDB connection and User model integration
- ✅ Input validation (name, email, password, role)
- ✅ Email format validation with regex
- ✅ Password hashing with bcryptjs (12 salt rounds)
- ✅ Duplicate user check
- ✅ Full user object returned (excluding password)
- ✅ Detailed console logging
- ✅ Error handling for MongoDB errors

---

## 🧪 Testing with Postman

### Step 1: Download and Install Postman
- Visit: https://www.postman.com/downloads
- Download and install for Windows
- Open Postman application

### Step 2: Create New Request

1. Click **"New"** → **"HTTP Request"**
2. Set the method to **POST**
3. Enter URL: `http://localhost:3000/api/register`

### Step 3: Configure Request Body

1. Click on the **"Body"** tab
2. Select **"raw"**
3. Choose **"JSON"** from the dropdown
4. Paste this test data:

```json
{
  "name": "Kalvian Tester",
  "email": "kalvian@example.com",
  "password": "secure123",
  "role": "student"
}
```

### Step 4: Send Request

Click the **"Send"** button

---

## ✅ Expected Successful Response

**Status**: `201 Created`

**Response Body**:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "674f1234567890abcdef1234",
    "email": "kalvian@example.com",
    "name": "Kalvian Tester",
    "role": "student",
    "createdAt": "2025-11-21T10:30:00.000Z",
    "updatedAt": "2025-11-21T10:30:00.000Z"
  }
}
```

**Terminal Output**:
```
📝 New user registration attempt: {
  email: 'kalvian@example.com',
  name: 'Kalvian Tester',
  role: 'student',
  timestamp: '2025-11-21T10:30:00.000Z',
  ip: 'unknown'
}
✅ User registration successful: {
  id: new ObjectId('674f1234567890abcdef1234'),
  email: 'kalvian@example.com',
  name: 'Kalvian Tester',
  role: 'student',
  timestamp: 2025-11-21T10:30:00.000Z
}
```

---

## 🧪 Additional Test Cases

### Test 2: Duplicate Email
**Request Body**:
```json
{
  "name": "Another User",
  "email": "kalvian@example.com",
  "password": "password123",
  "role": "admin"
}
```

**Expected Response**: `400 Bad Request`
```json
{
  "error": "User already exists with this email"
}
```

---

### Test 3: Invalid Email
**Request Body**:
```json
{
  "name": "Test User",
  "email": "invalid-email",
  "password": "secure123",
  "role": "student"
}
```

**Expected Response**: `400 Bad Request`
```json
{
  "error": "Invalid email format"
}
```

---

### Test 4: Short Password
**Request Body**:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123",
  "role": "student"
}
```

**Expected Response**: `400 Bad Request`
```json
{
  "error": "Password must be at least 6 characters long"
}
```

---

### Test 5: Missing Fields
**Request Body**:
```json
{
  "name": "Test User",
  "email": "test@example.com"
}
```

**Expected Response**: `400 Bad Request`
```json
{
  "error": "All fields are required"
}
```

---

### Test 6: Invalid Role
**Request Body**:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "secure123",
  "role": "teacher"
}
```

**Expected Response**: `400 Bad Request`
```json
{
  "error": "Invalid role selected"
}
```

---

## 📸 Submission Screenshots Needed

### Screenshot 1: API Route Code
- Open `app/api/register/route.ts` in VS Code
- Capture the full code showing:
  - MongoDB connection
  - bcrypt password hashing
  - User model integration
  - Error handling

### Screenshot 2: Postman Request & Response
Capture showing:
- URL: `http://localhost:3000/api/register`
- Method: POST
- Body tab with JSON data
- Successful 201 response with full user object

### Screenshot 3 (Optional): Terminal Logs
Show terminal output with:
- Registration attempt log
- Registration success log
- User details

---

## 🔍 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Check `.env.local` has correct `MONGODB_URI`
- Verify password is URL-encoded (`@` should be `%40`)
- Whitelist IP in MongoDB Atlas

### Error: "User model is not defined"
- Make sure `app/models/User.ts` exists
- Restart dev server

### Error: Port already in use
- Stop existing dev server
- Run `npm run dev` again

---

## 🎯 Success Checklist

- [x] bcryptjs installed
- [x] API route updated with MongoDB integration
- [x] Password hashing implemented
- [x] Duplicate user check added
- [x] Full user object returned
- [x] Console logging added
- [ ] Dev server running
- [ ] Test registration in Postman
- [ ] Take screenshots for submission
- [ ] Verify user is saved in MongoDB Atlas

---

## 🚀 Next Steps

After successful testing:
1. Integrate registration with signup page UI
2. Update NextAuth to authenticate against MongoDB users
3. Add email verification (optional)
4. Add password reset functionality (optional)
