import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Main content with padding for fixed navbar */}
            <main className="flex-1 pt-32 md:pt-28">
                {children}
            </main>

            <Footer />
        </div>
    );
}
