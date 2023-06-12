"use client";
import { useState } from "react";
import dayjs from "dayjs";

export const ProjectApplications = ({ Applications }) => {
    const [selected, setSelected] = useState(0);

    if (Applications.length === 0)
        return (
            <div className="border-t p-8" id="applications">
                지원자가 없습니다
            </div>
        );

    const { content, createdAt, User } = Applications[selected];
    const { email, Expert } = User;
    const { nickname, contact, introduction } = Expert;
    const c = dayjs(createdAt).format("YYYY. MM. DD HH:mm");

    return (
        <div className="border-t flex md:flex-row flex-col" id="applications">
            <div className="flex space-x-2 p-4 overflow-x-auto border-b md:hidden">
                {Applications.map((Application, i) => {
                    const { User } = Application;
                    const { email, Expert } = User;
                    const { nickname } = Expert;
                    return (
                        <button key={`application-${email}-${i}`} className="button w-fit" aria-selected={selected === i} onClick={() => setSelected(i)}>
                            {nickname}
                        </button>
                    );
                })}
            </div>
            <div className="flex flex-[2] flex-col p-8 border-r">
                <p className="mb-8 text-2xl">{nickname}님의 지원서</p>
                <p className="mb-1 text-sm text-gray-500">전문가 소개</p>
                <pre className="mb-8 whitespace-pre-wrap text-sm">{introduction}</pre>
                <p className="mb-1 text-sm text-gray-500">전달 내용</p>
                <pre className="whitespace-pre-wrap text-sm mb-8">{content}</pre>
                <p className="mb-1 text-sm text-gray-500">이메일</p>
                <p className="mb-8">{email}</p>
                <p className="mb-1 text-sm text-gray-500">연락처</p>
                <p className="mb-8">{!contact ? "-" : contact}</p>
                <p className="text-xs">{c}</p>
            </div>
            <div className="flex-[1] flex-col p-8 hidden md:flex">
                {Applications.map((Application, i) => {
                    const { User } = Application;
                    const { email, Expert } = User;
                    const { nickname } = Expert;
                    return (
                        <button key={`application-${email}-${i}`} className="button mb-2" aria-selected={selected === i} onClick={() => setSelected(i)}>
                            {nickname}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
