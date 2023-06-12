"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getApplications } from "@/apis";
import { Price } from "@/components/Price";

export const ApplicationList = () => {
    const { data } = useQuery({
        queryKey: ["applications"],
        queryFn: () => getApplications(),
        placeholderData: [],
    });

    return (
        <ul>
            {data.map(({ id, Project }) => {
                const { title, price, duration, isOpen } = Project;

                return (
                    <li key={`application-${id}`} className="border-b last:border-b-0 transition hover:bg-gray-100">
                        <Link href={`/projects/${Project.id}`} className="flex p-4 items-center">
                            <div className="flex-1">
                                <p className="mb-2 text-sm">{title}</p>
                                <div className="text-xs text-gray-500 flex">
                                    <Price price={price} className="mr-2" />
                                    <p className="mr-2">·</p>
                                    <p>{!duration ? "계약 시 협의" : `${duration}일`}</p>
                                </div>
                            </div>
                            <p className="text-xs">{isOpen ? "지원 완료" : "마감"}</p>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};
