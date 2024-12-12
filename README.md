# Project 3 - Team 0S

This repository contains the implementation of a Panda Express Point-of-Sale (POS) system for CSCE 331.

## 🌐 Live Website
https://project-3-team-0-s.vercel.app/cashier

## 🛠️ Features
- **Cashier Interface**: Streamlined for fast order entry and payment processing.
- **Inventory Management**: Supports real-time updates and stock tracking.
- **Accessibility**: Designed with features to assist users with visual impairments and language barriers.
- **Manager Portal**: Advanced tools for managing menu items, staff, and system reports.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.

## 🚀 Technologies Used
- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (AWS-hosted)
- **Hosting**: Vercel
- **Version Control**: GitHub

## 📂 Project Structure
```plaintext
├── client
│   ├── README.md
│   ├── public/      # Public assets such as images and fonts
│   ├── src/         # Source code for the frontend
│   ├── jsdoc.json   # JSDoc configuration for documentation
│   └── package.json # Client dependencies and scripts
├── docs/            # Auto-generated documentation files
├── meetingMinutes/  # Meeting records for sprints
├── resetDatabase/   # Scripts and data for resetting the database
├── server/          # Backend code and server configurations
└── docs/            # Documentation output folder (generated with TypeDoc)
└── README.md        # Project documentation
```

## 🔧 Installation and Setup
To clone, build, and run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/connorrclarke/project-3-team-0S.git
   cd project-3-team-0S
   ```

2. **Install dependencies**:
   For both the client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Run the project (In Two Separate Terminals)**:
   - **Client**: 
     ```bash
     cd client
     npm start
     ```
   - **Server**:
     ```bash
     cd server
     npm run dev
     ```

4. **Access the application** (You will need the .env file to run locally - You can email me for this):
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5555/api](http://localhost:5555/api)

## 📖 Documentation
- **High-Level Details**: Refer to this `README.md`.
- **Code Documentation**: Generated with TypeDoc, hosted in the `docs/` directory. [https://connorrclarke.github.io/project-3-team-0S/](https://connorrclarke.github.io/project-3-team-0S/)

## 🧑‍💻 Contributors
- Connor Clarke, Luke Lopez, Meenalika Singh, Siddhi Mittal

## 🗒️ Acknowledgments
This project was developed as part of CSCE 331 coursework at **Texas A&M University**.

---
