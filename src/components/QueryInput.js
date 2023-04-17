import { IoIosSend } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const QueryInput = ({ loading, queryInputRef, history, docs, apiKey, setLoading, setMessages }) => {
    // state
    const [query, setQuery] = useState("");

    // error handler
    const errorHandler = (error_message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                text: `Meep morp. Houston, we have a problem! \n\n${error_message}`,
                type: "response",
            },
        ]);
        setLoading(false);
        setQuery("");
    };

    // handle submission of a query
    const handleSubmitQuery = async (event) => {
        // prevent browser refresh
        event.preventDefault();

        // return if input is empty
        if (query.trim() === "") {
            return;
        }

        // start query process: set loading to true, update messages list w query and reset query
        setLoading(true);
        setQuery("");
        setMessages((prevMessages) => [...prevMessages, { text: query, type: "query" }]);

        // send query to backend API route
        const response = await fetch("api/bot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, history, docs, apiKey }),
        });
        const data = await response.json();

        // error handling
        if (data.result.type === "error") {
            errorHandler(data.result.message);
            return;
        }

        // if no errors, update messages list with response
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                text: data.result.message,
                type: "response",
            },
        ]);
        setLoading(false);
    };

    // facilitate multiline input
    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey && query) {
            handleSubmitQuery(event);
        } else if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
        }
    };

    return (
        <form
            onSubmit={handleSubmitQuery}
            className="flex w-[75vw] max-w-4xl flex-row items-center rounded-lg border border-[#30373d] bg-zinc-950"
        >
            {/* <textarea /> replace with input?? */}
            <input
                disabled={loading}
                onKeyDown={handleEnterKeyPress}
                ref={queryInputRef}
                autoFocus={false}
                autoComplete="off"
                rows={1}
                type="text"
                id="query"
                name="query"
                placeholder={loading ? "Waiting for response..." : "E.g. What is this PDF about?"}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="flex-grow resize-none rounded-lg border-none bg-zinc-950 px-6 py-4 text-lg text-[#ececf1] outline-none placeholder:text-[#5f6368] disabled:opacity-50"
            />
            <button
                type="submit"
                disabled={loading}
                className="mr-3 flex border-none bg-none p-1 text-[#eb9722] hover:rounded-sm hover:bg-[#1f2227] disabled:cursor-not-allowed disabled:bg-none disabled:opacity-90"
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    <IoIosSend className="text-2xl" />
                )}
            </button>
        </form>
    );
};

export default QueryInput;
