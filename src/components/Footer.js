import Link from "next/link";
import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";

const Footer = () => {
    return (
        <div className="mt-16 flex flex-col justify-center gap-4">
            <div>
                <p className="text-sm text-[#5f6368]">
                    Made by{" "}
                    <Link
                        href="https://www.linkedin.com/in/nathanclairmonte/"
                        target="_blank"
                        className="text-[#eb9722]"
                    >
                        Nathan Clairmonte
                    </Link>
                    . Powered by{" "}
                    <Link href="https://nextjs.org/" target="_blank" className="text-[#eb9722]">
                        Next.js
                    </Link>
                    ,{" "}
                    <Link
                        href="https://next-auth.js.org/"
                        target="_blank"
                        className="text-[#eb9722]"
                    >
                        NextAuth.js
                    </Link>{" "}
                    and{" "}
                    <Link href="https://langchain.com/" target="_blank" className="text-[#eb9722]">
                        LangChain
                    </Link>
                    .
                </p>
            </div>
            <div className="flex flex-row justify-center gap-5">
                <Link href="https://www.linkedin.com/in/nathanclairmonte/" target="_blank">
                    <BsLinkedin className="text-2xl text-[#eb9722]" />
                </Link>
                <Link href="https://github.com/nathanclairmonte" target="_blank">
                    <BsGithub className="text-2xl text-[#eb9722]" />
                </Link>
                <Link href="https://twitter.com/cIairmonte" target="_blank">
                    <BsTwitter className="text-2xl text-[#eb9722]" />
                </Link>
            </div>
        </div>
    );
};

export default Footer;
