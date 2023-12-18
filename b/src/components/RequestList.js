"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getRequests } from "@/apis";
import { Price } from "@/components/Price";

export const RequestList = () => {
    const { data } = useQuery({
        queryKey: ["requests"],
        queryFn: () => getRequests(),
        placeholderData: [],
    });

    return (
        <ul>
            {data.map((row) => {
                const { id, title, price, duration, isOpen, Applications } = row;
                return (
                    <li key={`request-${id}`} className="border-b last:border-b-0 transition hover:bg-gray-100">
                        <Link href={`/projects/${id}`} className="flex p-4 items-center">
                            <div className="flex-1 mr-4">
                                <p className="mb-2 text-sm">{title}</p>
                                <div className="text-xs text-gray-500 flex">
                                    <Price price={price} className="mr-2" />
                                    <p className="mr-2">·</p>
                                    <p>{Boolean(duration) ? `${duration}일` : "계약 시 협의"}</p>
                                </div>
                            </div>

                            <p className="text-xs">{isOpen ? `${Applications.length}명 지원` : `마감(${Applications.length})`}</p>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};
