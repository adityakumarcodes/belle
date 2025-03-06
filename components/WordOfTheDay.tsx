'use client'
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { createClient } from "@/lib/supabase/client";

interface Word {
    id: number;
    word: string;
    meaning: string;
}

const WordOfTheDay = () => {
    const [data, setData] = useState<Word[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const supabase = createClient();
                const { data: words, error } = await supabase
                    .from('words')
                    .select('*');

                if (error) throw error;
                setData(words);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchWords();
    }, []);

    if (error) return <p>{error}</p>;
    if (!data || loading) return <Spinner />;

    return (
        <div className="select-none flex items-center text-center justify-center flex-col bg-cover rounded-[50px] m-2 p-5 text-white transition-all duration-150 hover:cursor-pointer"
            onClick={() => setCounter((counter + 1) % data.length)}
            style={{
                backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) ,url("https://images.unsplash.com/photo-1536147116438-62679a5e01f2?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdyZWVufGVufDB8fDB8fHww") '
            }}>
            <h2 style={{ fontFamily: "Dancing Script", margin: '10px' }}>
                {data[counter].word}
            </h2>
            <h6>{data[counter].meaning}</h6>
            <div className="mt-10" />
        </div >
    );
};

export default WordOfTheDay;
