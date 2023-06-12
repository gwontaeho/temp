"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { deleteCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { getUser } from "@/apis";

const Menu = ({ isSignedIn }) => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (open) document.body.style = "overflow-y:hidden";
        else document.body.style = "overflow-y:overlay";
    }, [open]);

    const handleClickSignout = () => {
        deleteCookie("token");
        location.href = location.origin;
    };

    const Item = ({ href, label }) => (
        <li>
            <Link
                href={href}
                className="p-4 flex items-center justify-center transition aria-[current=page]:bg-gray-100 hover:bg-gray-100 text-sm"
                aria-current={pathname === href ? "page" : "false"}
            >
                {label}
            </Link>
        </li>
    );

    return (
        <>
            <button className="md:hidden text-sm" onClick={() => setOpen((prev) => !prev)}>
                {open ? "닫기" : "메뉴"}
            </button>
            <dialog open={open} className="p-0 fixed top-20 left-0 w-screen h-[calc(100vh-5rem)] bg-white z-50">
                <nav>
                    <ul>
                        <Item href="/projects" label="프로젝트 목록" />
                        <Item href="/request" label="프로젝트 의뢰하기" />
                        <hr />
                        {isSignedIn ? (
                            <>
                                <Item href="/myaccount" label="알림" />
                                <Item href="/myaccount/expert" label="전문가 정보" />
                                <Item href="/myaccount/requests" label="의뢰한 프로젝트" />
                                <Item href="/myaccount/applications" label="지원한 프로젝트" />
                                <hr />
                                <li>
                                    <button className="transition p-4 w-full text-sm hover:bg-gray-100" onClick={handleClickSignout}>
                                        로그아웃
                                    </button>
                                </li>
                            </>
                        ) : (
                            <Item href="/signin" label="로그인" />
                        )}
                    </ul>
                </nav>
            </dialog>
        </>
    );
};

export const Header = ({ isSignedIn }) => {
    const { data } = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(),
        placeholderData: {},
        enabled: isSignedIn,
    });
    const { email, hasNewNotification } = data;

    return (
        <header className="flex h-20 border-b items-center justify-center bg-slate-50">
            <div className="flex px-8 w-full max-w-5xl justify-between">
                <Link href="/">
                    <div className="md:mr-8">외주123</div>
                </Link>
                <nav className="flex-1 hidden md:flex">
                    <div className="flex-1">
                        <Link href="/projects" className="mr-4 text-sm">
                            프로젝트 목록
                        </Link>
                        <Link href="/request" className="text-sm">
                            프로젝트 의뢰하기
                        </Link>
                    </div>

                    {isSignedIn ? (
                        <Link href="/myaccount" className="relative text-sm">
                            {email}
                            {hasNewNotification && (
                                <span className="absolute flex h-1.5 w-1.5 top-0 right-[-6px]">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500" />
                                </span>
                            )}
                        </Link>
                    ) : (
                        <Link href="/signin" className="text-sm">
                            로그인
                        </Link>
                    )}
                </nav>
                <Menu isSignedIn={isSignedIn} user={data} />
            </div>
        </header>
    );
};
