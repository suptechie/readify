<h1 align="center">📖 Readify</h1>

<p align="center">
  <strong>Discover, read, and manage your favorite articles effortlessly.</strong>
</p>

<p align="center">
  <a href="http://readify-gamma.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Visit-Readify-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Visit Readify" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next%20JS-15-black?style=flat&logo=next.js&logoColor=white" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-%2320232a?style=flat&logo=react&logoColor=%2361DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TurboPack-Enabled-3178C6?style=flat&logo=turborepo&logoColor=white" alt="TurboPack Enabled" />
</p>

---

## 🌟 Features

- **🕶️ Anonymous Posting**: Share thoughts without an account
- **🎨 Theme Customization**: Toggle between light and dark themes
- **📖 Personalized Feed**: Customize your article feed
- **👍 Like & Share**: Interact with favorite articles
- **🔍 Search with Debounce**: Smooth, responsive searching
- **📸 Cloudinary Image Uploads**: Effortless image management
- **📊 Nuqs State Management**: Efficient search and pagination
- **🔐 JWT Authentication**: Secure and private access

---

## 🛠️ Tech Stack

<table align="center">
  <tr>
    <td align="center"><strong>Category</strong></td>
    <td align="center"><strong>Technology</strong></td>
  </tr>
  <tr>
    <td align="center">Framework</td>
    <td align="center">
      <a href="https://nextjs.org/">
        <img src="https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 15" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">Frontend</td>
    <td align="center">
      <a href="https://tailwindcss.com/">
        <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
      </a>
      <a href="https://www.radix-ui.com/">
        <img src="https://img.shields.io/badge/Radix%20UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white" alt="Radix UI" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">Image Hosting</td>
    <td align="center">
      <a href="https://cloudinary.com/">
        <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">Database</td>
    <td align="center">
      <a href="https://www.mongodb.com/">
        <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
      </a>
      <a href="https://mongoosejs.com/">
        <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">State Management</td>
    <td align="center">
      <a href="https://nuqs.js.org/">
        <img src="https://img.shields.io/badge/Nuqs-000000?style=for-the-badge&logo=react&logoColor=white" alt="Nuqs" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">Authentication</td>
    <td align="center">
      <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT" />
    </td>
  </tr>
</table>

---

## 📚 Libraries & Tools

<p align="center">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React%20Query-%23FF4154.svg?style=for-the-badge&logo=react-query&logoColor=white" alt="React Query" />
  <img src="https://img.shields.io/badge/ESLint-%234B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Zod-%231E90FF.svg?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=react-hook-form&logoColor=white" alt="React Hook Form" />
  <img src="https://img.shields.io/badge/SWR-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="SWR" />
  <img src="https://img.shields.io/badge/clsx-%234A4A4A.svg?style=for-the-badge&logo=npm&logoColor=white" alt="clsx" />
</p>

---

## 📷 Screenshots

<table align="center">
  <tr>
    <td align="center"><strong>Light Theme</strong></td>
    <td align="center"><strong>Dark Theme</strong></td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/f81df7fc-16c6-4f3d-81a8-38b6a993b924" alt="Light Theme" width="100%" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/4e911b13-78a7-473a-9879-9834e6013599" alt="Dark Theme" width="100%" />
    </td>
  </tr>
</table>

---

## 🚀 Installation

Follow these steps to set up and run the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sinanptm/readify
   cd readify
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory with the following variables:

   ```env
   MONGO_URI=mongodb+srv://<your-mongo-connection-string>
   NODE_ENV=dev
   TOKEN_SECRET=ea5dee072dab5318e42e44d6a9a8aa44ec8a6e84f82ea15
   NEXT_PUBLIC_API_URL=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=dlew32edm
   CLOUDINARY_URL=<your-cloudinary-url>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   CLOUDINARY_API_KEY=372488991866449
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` in your browser to see Readify in action.

---

<p align="center">
  Made with ❤️ by the sinanptm
</p>
