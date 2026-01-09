import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '../../lib/api/auth';

export default function AdminHeader() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authApi.logout();
        } catch (e) { }
        localStorage.removeItem('token');
        router.push('/admin/login');
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-blue-600">SkyBoard Admin</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/admin/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Dashboard
                            </Link>
                            <Link href="/admin/content" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Content Manager
                            </Link>
                            <Link href="/" target="_blank" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                View Public Board
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
