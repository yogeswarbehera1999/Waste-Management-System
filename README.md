# 🌱 Waste Management System - Full Stack MERN Application

A comprehensive waste management system built with MongoDB, Express.js, React, and Node.js featuring role-based authentication, real-time tracking, and mobile-responsive design.

## 🚀 Features

### **Authentication System**
- **Citizen Login**: OTP-based authentication via phone number
- **Supervisor/Admin Login**: Username and password authentication
- **Role-based Access Control**: Separate dashboards for each user type

### **Citizen Dashboard**
- **Post Complaints**: Submit waste management issues with photo evidence
- **Track Vehicle**: Real-time waste collection vehicle location
- **View Status**: Monitor complaint status updates

### **Supervisor Dashboard**
- **Machinery Defect Reporting**: Report equipment issues with photos
- **Vehicle Tracking**: Monitor collection vehicle locations
- **Qube Fulfillment**: Submit MCC/MRF cube completion reports
- **Mo Khata Entry**: Record waste generation and stock data
- **View Citizen Complaints**: Read-only access to all complaints

### **Admin Dashboard**
- **Comprehensive Management**: View and manage all submissions
- **Status Updates**: Approve/reject all reports and complaints
- **Color-coded Status System**:
  - 🟡 Yellow: Started
  - 🔵 Blue: In Progress
  - 🟢 Green: Approved
  - 🔴 Red: Rejected

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Image Handling**: Base64 encoding for camera captures

## 📱 Key Features

### **Camera-Only Photo Capture**
- All forms use camera-only image capture (no file selection)
- Real-time photo preview with delete option
- Base64 encoding for database storage

### **Auto-Generated Timestamps**
- Live, uneditable date/time fields in all forms
- Real-time updates displayed to users

### **Mobile-First Design**
- Fully responsive across all device sizes
- Touch-friendly interface elements
- Optimized for mobile camera usage

### **Data Persistence**
- All data stored permanently in MongoDB
- Proper data relationships and validation
- Secure API endpoints with authentication

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- Modern web browser with camera support

### Installation

1. **Clone and Install Dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install
```

2. **Environment Setup**
```bash
# Create server/.env file with:
MONGODB_URI=mongodb://localhost:27017/waste-management
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5001
NODE_ENV=development
```

3. **Start the Application**
```bash
# From root directory (starts both frontend and backend)
npm run dev
```

4. **Create Default Users**
- Visit the application at `http://localhost:5173`
- Click "Create Default Users (Dev)" on login page
- Use credentials:
  - **Supervisor**: `supervisor1` / `supervisor123`
  - **Admin**: `admin1` / `admin123`

## 📋 Form Specifications

### **Citizen Complaint Form**
- **Fields**: Name, Phone, Ward Number, Area, Category, Description
- **Categories**: 22 predefined complaint types
- **Photo**: Camera-only capture required
- **Timestamp**: Auto-generated and read-only

### **Machinery Defect Form**
- **Fields**: Supervisor Name, Contact, Machine Type, Description
- **Machines**: 7 predefined machine types
- **Photo**: Camera-only defect image
- **Timestamp**: Auto-generated and read-only

### **Qube Fulfillment Form**
- **Fields**: Supervisor details, Category (MCC/MRF), Cube Number
- **Cube Ranges**: MCC (1-14), MRF (1-6)
- **Ward**: Fixed as "Gopalpur NAC"
- **Photo**: Camera-only completion proof

### **Mo Khata Entry Form**
- **Fields**: Supervisor details, Generation data, Stock information
- **Timestamp**: Auto-generated and read-only
- **Purpose**: Track waste generation and stock levels

## 🎨 Design System

### **Color Scheme**
- **Primary**: Clean white backgrounds (#ffffff)
- **Accent**: Elegant green borders and headings (#4CAF50)
- **Status Colors**: Yellow, Blue, Green, Red for different states

### **UI Components**
- **Tab Navigation**: Smooth transitions between sections
- **Modal Forms**: Accessible overlay forms with proper focus management
- **Data Tables**: Responsive tables with sorting and filtering
- **Status Badges**: Color-coded status indicators

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-based Access**: Proper authorization checks
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests

## 📊 Database Schema

### **Users Collection**
- Supports multiple authentication methods (OTP for citizens, credentials for staff)
- Role-based user types with appropriate field requirements

### **Complaints Collection**
- Complete citizen complaint data with photo evidence
- Status tracking and administrative updates

### **Defects Collection**
- Machinery defect reports with supervisor information
- Photo documentation and status management

### **Qubes Collection**
- Cube fulfillment tracking for MCC/MRF categories
- Ward-specific data with photo verification

### **Khata Collection**
- Mo Khata generation and stock tracking
- Supervisor-submitted data with timestamps

## 🚀 Production Deployment

### **Environment Variables**
```bash
MONGODB_URI=your-production-mongodb-connection-string
JWT_SECRET=your-production-jwt-secret-key
PORT=5001
NODE_ENV=production
```

### **Build Commands**
```bash
# Build frontend
npm run build

# Start production server
cd server && npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details

---

**Built with ❤️ for cleaner cities and better waste management**