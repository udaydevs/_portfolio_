"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type GitHubUser = {
    login: string;
    public_repos: number;
    followers: number;
    following: number;
    avatar_url: string;
};

export default function GitStats() {
    const [data, setData] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await fetch("https://api.github.com/users/udaydevs");
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        getStats();
    }, []);

    if (loading) {
        return <p className="font-mono mt-2">Loading GitHub stats...</p>;
    }

    if (!data) {
        return;
    }

    return (
        <div className="my-4 w-full font-mono">
            <div className="flex w-full h-auto justify-between">
                <div><p className="font-black text-lg">GitHub Stats</p>
                </div>
                <div><button onClick={() => router.push('/gitstats')} className="rounded-2xl border border-dashed font-semibold h-auto px-2 py-1 w-auto text-xs font-sans transition hover:border-[var(--portfolio-accent)] hover:bg-[var(--portfolio-accent)] hover:text-white"> View all</button>
                </div>
            </div>

            <div className="flex justify-evenly items-center  mt-2">
                <img
                    src={data.avatar_url}
                    alt="avatar"
                    className="w-15 h-15 rounded-full"
                />

                <div className="text-sm ">
                    <p>User Id: <i>{data.login}</i></p>
                    <p>Repos: {data.public_repos}</p>
                    <p>Followers: {data.followers}</p>
                    <p>Following: {data.following}</p>
                </div>
            </div>
        </div>
    );
}
