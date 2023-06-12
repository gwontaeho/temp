"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, toggleNotification } from "@/apis";
import { Time } from "@/components/Time";

export default function Myaccount() {
    const queryClient = useQueryClient();
    const { email, isAllowedNotification } = queryClient.getQueryData(["user"]) || {};

    const { data = [] } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => getNotifications(),
    });

    const { mutate } = useMutation({
        mutationFn: () => toggleNotification(),
        onSuccess: () => {
            queryClient.setQueryData(["user"], (data) => data && { ...data, isAllowedNotification: !data.isAllowedNotification });
        },
    });

    useEffect(() => {
        return () => {
            queryClient.setQueryData(["user"], (data) => data && { ...data, hasNewNotification: false });
        };
    }, []);

    const handleClickToggleNotification = () => {
        let result = true;
        if (isAllowedNotification) result = confirm("이메일 알림을 끄시겠습니까?");
        if (result) mutate();
    };

    if (!email) return null;

    return (
        <main className="flex-1">
            <div className="flex flex-col p-2">
                <button className="self-end button text-xs p-2 w-fit" onClick={handleClickToggleNotification}>
                    {isAllowedNotification ? "이메일 알림 끄기" : "이메일 알림 켜기"}
                </button>
            </div>
            <ul>
                {data.map(({ id, title, content, href, createdAt }) => {
                    return (
                        <li key={`notification-${id}`} className="border-b last:border-b-0 first:border-t">
                            <Link href={href} className="block p-4 transition hover:bg-gray-100">
                                <div className="flex justify-between mb-1">
                                    <p className="text-sm">{title}</p>
                                    <Time time={createdAt} className="text-xs text-gray-500" />
                                </div>
                                <p className="text-xs text-gray-500">{content}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
