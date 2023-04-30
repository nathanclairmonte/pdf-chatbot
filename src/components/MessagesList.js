import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "@/styles/MessagesList.module.css";

const MessagesList = ({ messages, messageListRef, loading }) => {
    // function to help select styling class
    const _styleHelper = (messageType, numMessages, idx) => {
        if (messageType === "query" && loading && idx === numMessages - 1) {
            return styles.query_message_loading;
        } else {
            if (messageType === "response") {
                return styles.response_message;
            } else {
                return styles.query_message;
            }
        }
    };

    return (
        <div className="flex h-[65vh] w-[100vw] max-w-4xl flex-col items-center justify-center border border-[#30373d] bg-zinc-950 sm:w-[75vw] sm:rounded-lg">
            <div
                ref={messageListRef}
                className="scrollbar-hidden h-full w-full overflow-y-scroll rounded-lg"
            >
                {messages &&
                    messages.map((msg, idx) => (
                        // Most recent query (user) msg will be animated whie response loads
                        <div key={idx} className={_styleHelper(msg.type, messages.length, idx)}>
                            {/* Display icon based on msg type */}
                            {msg.type === "query" ? (
                                <Image
                                    src="/user-icon.png"
                                    alt="You"
                                    width="30"
                                    height="30"
                                    className="mr-6 h-8 w-8 rounded-sm"
                                    priority={true}
                                />
                            ) : (
                                <Image
                                    src="/bot-icon.png"
                                    alt="AI"
                                    width="30"
                                    height="30"
                                    className="mr-6 h-8 w-8 rounded-sm"
                                    priority={true}
                                />
                            )}
                            <div className={styles.markdown_output}>
                                <ReactMarkdown linkTarget="_blank">{msg.text}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MessagesList;
