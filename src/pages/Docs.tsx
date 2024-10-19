import React from 'react';

const Docs: React.FC = () => {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6">📄 Project Documentation: Libraries/Tools Used</h1>
            <p className="text-lg mb-8">
                Welcome to the documentation for the project <strong>KuraKaani</strong> built with React! Below is a detailed explanation of the key libraries and tools used,
                along with the reasons behind their selection.
            </p>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">1. TypeScript</h2>
                <p>
                    <strong>Why TypeScript?</strong>

                    <li>TypeScript is a statically typed superset of JavaScript that enhances code quality and developer productivity.</li>
                    <li>Used throughout the project to ensure type safety, catch errors early, and provide better editor support.</li>
                    <li>Enables us to define clear interfaces and types for components, hooks, and data structures, leading to more maintainable code.</li>

                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">2. ShadCN/UI</h2>
                <p>
                    <strong>Why ShadCN/UI?</strong>
                    <li>ShadCN/UI is a collection of accessible and customizable React components that help build consistent user interfaces.</li>
                    <li>Stored in <i>/src/components/ui</i> directory as reusable UI components like buttons, forms, and dialogs. Used throughout the application to maintain a unified design system. </li>
                    <li>Allow to install only the components that project needs instead of installing all the components of libraries which may not be useful for the project and increate the size of project unnecessarily</li>
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">3. Context API</h2>
                <p>
                    <strong>Why Context API?</strong>
                    <li>The Context API is a built-in feature of React that allows us to manage global state without prop drilling.</li>
                    <li>Used in <i>/src/contexts/postContext</i>
                        to manage the state of posts fetched from the Supabase database and provide it to components that need it like the Home Page in <i>/src/components/posts/Postlist.tsx</i> to update the UI when new posts are created.

                    </li>

                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">4. Vite</h2>
                <p>
                    <strong>Why Vite?</strong>
                    <li>Vite is a modern build tool that offers fast development server and optimized production builds.</li>
                    <li>It leverages ESBuild for bundling, resulting in quick startup times and rapid HMR (Hot Module Replacement) updates.</li>

                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">5. Supabase</h2>
                <p>
                    <strong>Why Supabase?</strong>
                    <li>Supabase is an open-source Firebase alternative that provides a suite of tools for building scalable applications,
                        including authentication, database, and storage services.</li>

                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">6. React Router Dom</h2>
                <p>
                    <strong>Why React Router Dom?</strong>
                    <li>React Router Dom is a declarative routing library for React that keeps the UI in sync with the URL.</li>
                    <li>Used in <i>./src/App.tsx</i> to define routes for different pages like Home and Docs.</li>
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">7. UUID</h2>
                <p>
                    <strong>Why UUID?</strong>
                    <li>UUID generates unique identifiers for entities like posts or users, ensuring global uniqueness
                        without relying on central ID generators.</li>
                    <li>Used in <i>./src/components/CreatePostForm.tsx</i> to generate unique IDs for images uploaded by users.
                    </li>
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">8. Tailwind CSS</h2>
                <p>
                    <strong>Why Tailwind CSS?</strong>
                    <li>Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to style
                        elements directly in the markup.</li>
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">9. React Hook Form</h2>
                <p>
                    <strong>Why React Hook Form?</strong>
                    <li>
                        React Hook Form is a performant form library that helps manage form state and validation with minimal
                        re-renders.
                    </li>
                    <li>
                        Used in <i>./src/components/CreatePostForm.tsx</i> to handle form submission and validation for creating
                        new posts.
                    </li>
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">10. Zod</h2>
                <p>
                    <strong>Why Zod?</strong>
                    <li>Zod is a TypeScript-first schema declaration and validation library that ensures data consistency
                        and type safety.</li>
                    <li>Used in <i>./src/components/CreatePostForm.tsx</i> to define the shape of the form data and validate it before submission.
                    </li>
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold">Conclusion</h2>
                <p>
                    Each of these libraries was carefully chosen to improve performance, enhance developer experience, and ensure code quality. Together,
                    they help us build a scalable, maintainable, and efficient application.
                </p>
            </section>
        </div>
    );
};

export default Docs;
