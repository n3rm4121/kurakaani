# Kurakaani

Built with modern web technologies like React, TypeScript, Supabase, and TailwindCSS, it emphasizes a seamless and responsive user experience.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [Docs](#docs)

## Features
- Real-time post sharing and interaction
- Post like and repost functionality
- User authentication via Supabase
- Responsive design with TailwindCSS
- Form handling with `react-hook-form` and validation using `zod`

## Tech Stack
- **Frontend:** React, TypeScript, Vite, TailwindCSS, ShadCN/UI
- **Backend:** Supabase (Database & Authentication)
- **Routing:** React Router
- **Form Handling:** React Hook Form, Zod for validation
- **Other Libraries:** uuid, shadcn/ui, context-api

## Project Setup

Follow the steps below to set up the project locally.

### Prerequisites

- Node.js >= 14
- Supabase account and project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/n3rm4121/kurakaani.git
   cd kurakaani
   ```

2. Install dependencies:

```bash
npm install
```

3. Setup Environment Variables:
 Create a `.env` file at the root of the project and add the following variables, replacing placeholders with your Supabase keys:
```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
4. Start the development server:

   ```bash
   npm run dev
   ```
   The app should now be running at ``http://localhost:5173.``





## Docs

Welcome to the documentation for the project **KuraKaani** built with React! Below is a detailed explanation of the key libraries and tools used, along with the reasons behind their selection.

## 1. TypeScript

- TypeScript is a statically typed superset of JavaScript that enhances code quality and developer productivity.
- Used throughout the project to ensure type safety, catch errors early, and provide better editor support.
- Enables us to define clear interfaces and types for components, hooks, and data structures, leading to more maintainable code.

---

## 2. ShadCN/UI

- ShadCN/UI is a collection of accessible and customizable React components that help build consistent user interfaces.
- Stored in `/src/components/ui` directory as reusable UI components like buttons, forms, and dialogs. Used throughout the application to maintain a unified design system.
- Allows us to install only the components needed for the project instead of bloating the project with unused components from larger libraries like Ant Design or Bootstrap.

---

## 3. Context API

- The Context API is a built-in feature of React that allows us to manage global state without prop drilling.
- Used in `/src/contexts/postContext` to manage the state of posts fetched from the Supabase database and provide it to components like the Home Page in `/src/components/posts/Postlist.tsx` to update the UI when new posts are created.

---

## 4. Vite

- Vite is a modern build tool that offers a fast development server and optimized production builds.
- It leverages ESBuild for bundling, resulting in quick startup times and rapid HMR (Hot Module Replacement) updates.

---

## 5. Supabase

- Supabase is an open-source Firebase alternative that provides a suite of tools for building scalable applications, including authentication, database, and storage services.

---

## 6. React Router Dom

- React Router Dom is a declarative routing library for React that keeps the UI in sync with the URL.
- Used in `./src/App.tsx` to define routes for different pages like Home and Docs.

---

## 7. UUID

- UUID generates unique identifiers for entities like posts or users, ensuring global uniqueness without relying on central ID generators.
- Used in `./src/components/CreatePostForm.tsx` to generate unique IDs for images uploaded by users.

---

## 8. Tailwind CSS

- Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to style elements directly in the markup.
- Helps to maintain a clean and responsive design without writing custom CSS.

---

## 9. React Hook Form

- React Hook Form is a performant form library that helps manage form state and validation with minimal re-renders.
- Used in `./src/components/CreatePostForm.tsx` to handle form submission and validation for creating new posts.

---

## 10. Zod

- Zod is a TypeScript-first schema declaration and validation library that ensures data consistency and type safety.
- Used in `./src/components/CreatePostForm.tsx` to define the shape of the form data and validate it before submission.

---

## Conclusion

Each of these libraries was carefully chosen to improve performance, enhance developer experience, and ensure code quality. Together, they help us build a scalable, maintainable, and efficient application.

