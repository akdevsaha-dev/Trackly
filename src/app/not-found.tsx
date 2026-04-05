import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-screen items-center justify-center bg-black text-white px-6">
            <div className="flex flex-col items-center text-center max-w-md">

                <h1 className="text-8xl font-bold tracking-tight">404</h1>

                <p className="mt-4 text-gray-400 text-lg">
                    The page you’re looking for doesn’t exist.
                </p>

                <Link
                    href="/"
                    className="mt-8 border border-white px-6 py-3 text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300"
                >
                    Back to home
                </Link>

            </div>
        </div>
    );
}