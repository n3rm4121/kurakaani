export const Footer = () => {
    return (
        <footer className="border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p className="text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} SocialApp. All rights reserved.
                </p>
            </div>
        </footer>
    )
}