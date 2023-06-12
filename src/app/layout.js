import "./globals.css";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";

const pretendard = localFont({
    src: "./PretendardVariable.woff2",
    display: "swap",
    variable: "--font-pretendard",
});

export default async function RootLayout({ children }) {
    const cookieStore = cookies();
    const isSignedIn = !!cookieStore.get("token");

    return (
        <html lang="en" className={pretendard.className}>
            <Providers>
                <body className="flex flex-col min-h-screen">
                    <Header isSignedIn={isSignedIn} />
                    {children}
                    <footer className="h-40 border-t bg-slate-50"></footer>
                </body>
            </Providers>
        </html>
    );
}
