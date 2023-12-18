"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getRecents } from "@/apis";
import { Time } from "@/components/Time";
import { Price } from "@/components/Price";

export const HomeRecents = () => {
    const { data = [] } = useQuery({
        queryKey: ["recents"],
        queryFn: () => getRecents(),
    });

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {data.map(({ id, title, price, duration, createdAt }) => {
                return (
                    <Link href={`/projects/${id}`} key={`recent-${id}`}>
                        <div className="flex flex-col p-4 border rounded transition hover:bg-gray-50">
                            <p className="line-clamp-2 text-sm h-10 mb-4">{title}</p>
                            <div className="flex justify-between text-xs text-gray-500">
                                <div className="flex">
                                    <Price price={price} />
                                    <p className="mx-1">·</p>
                                    <p>{!duration ? "계약 시 협의" : `${duration}일`}</p>
                                </div>
                                <Time time={createdAt} />
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};
