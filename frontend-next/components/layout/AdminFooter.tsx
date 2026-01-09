export default function AdminFooter() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Bandar Udara International Management System. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
