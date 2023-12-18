"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { deleteCookie } from "cookies-next";

export const MyaccountNav = () => {
    const pathname = usePathname();

    const lis = [
        { label: "알림", href: "/myaccount" },
        { label: "전문가 정보", href: "/myaccount/expert" },
        { label: "의뢰한 프로젝트", href: "/myaccount/requests" },
        { label: "지원한 프로젝트", href: "/myaccount/applications" },
    ];

    const handleClickSignout = () => {
        deleteCookie("token");
        location.href = location.origin;
    };

    return (
        <nav className="hidden md:block w-60 sticky top-0 border-r">
            <ul>
                {lis.map(({ label, href }) => (
                    <li key={href}>
                        <Link
                            href={href}
                            aria-current={pathname === href ? "page" : "false"}
                            className="block p-4 transition text-xs aria-[current=page]:bg-gray-100 hover:bg-gray-100"
                        >
                            {label}
                        </Link>
                    </li>
                ))}
                <li>
                    <button className="p-4 text-xs transition hover:bg-gray-100 w-full text-left" onClick={handleClickSignout}>
                        로그아웃
                    </button>
                </li>
            </ul>
        </nav>
    );
};
