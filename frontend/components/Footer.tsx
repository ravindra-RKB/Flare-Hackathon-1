export function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                <p>© {new Date().getFullYear()} FlareTrust. Built on Flare Network.</p>
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        FTSO Powered
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        FDC Integrated
                    </span>
                    <a href="#" className="hover:text-white transition-colors">GitHub</a>
                    <a href="#" className="hover:text-white transition-colors">Docs</a>
                </div>
            </div>
        </footer>
    );
}
