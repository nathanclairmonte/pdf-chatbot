import { useRef, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CgSoftwareUpload } from "react-icons/cg";
import { IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";

const MAX_FILE_SIZE_MB = 16;

const SAMPLE_PDFS = [
    {
        key: 0,
        fileName: "pdfchatbot-samplePDF-Attention_Is_All_You_Need.pdf",
        name: "Attention Is All You Need",
        selected: true,
    },
    {
        key: 1,
        fileName: "pdfchatbot-samplePDF-EMBC_Lung_Volume_Paper.pdf",
        name: "CNN-Based Lung Volume Clf",
        selected: false,
    },
    {
        key: 2,
        fileName: "pdfchatbot-samplePDF-GPT4_Technical_Report.pdf",
        name: "GPT-4 Technical Report",
        selected: false,
    },
];

const PDFInput = ({ setDocs, setMessages, session }) => {
    // state
    const [file, setFile] = useState(null);
    const [currentFilename, setCurrentFilename] = useState("");
    const [loading, setLoading] = useState(false);
    const [fileChosen, setFileChosen] = useState(false);
    const [status, setStatus] = useState({
        type: "neutral",
        message: "",
    });
    const [samplePDFs, setSamplePDFs] = useState(SAMPLE_PDFS);

    // reference for the file input
    const fileInputRef = useRef(null);

    // clear status message whenever session changes
    useEffect(() => {
        setStatus({
            type: "neutral",
            message: "",
        });
    }, [session]);

    // select status styling based on message type
    const _statusStyleHelper = (type) => {
        if (type === "error") {
            // return error styles
            return "text-center text-lg text-red-600";
        } else if (type === "success") {
            // return success styles
            return "text-center text-lg text-green-600";
        } else {
            // return neutral styles
            return "text-center text-lg text-white";
        }
    };

    // store user PDF in state
    const storePDF = async (event) => {
        // prevent browser refresh
        event.preventDefault();

        // update relevant state if file exists
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            setFileChosen(true);
        }
    };

    // handle the closing of a file
    const handleCloseFile = () => {
        // clear file input
        fileInputRef.current.value = null;
        fileInputRef.current.files = null;

        // reset all file-related pieces of state
        setFile(null);
        setFileChosen(false);
        setCurrentFilename("");
    };

    // handle loading of a PDF
    const handleLoadPDF = async (event) => {
        // prevent browser refresh
        event.preventDefault();

        // ensure that a file is chosen
        if (!fileChosen) {
            setStatus({
                type: "error",
                message: "Please choose a PDF first!",
            });
            return;
        }

        // ensure user isn't re-loading the same PDF
        if (file.name === currentFilename) {
            setStatus({
                type: "success",
                message: "That PDF is already loaded!",
            });
            return;
        }

        // cap max file size at 16 MB (for now)
        const fileSize = parseInt((file.size / 1024 / 1024).toFixed(4));
        if (fileSize > MAX_FILE_SIZE_MB) {
            setStatus({
                type: "error",
                message: `PDF is too large :( Max size is ${MAX_FILE_SIZE_MB} MB`,
            });
            return;
        }

        // save current filename and start file load process
        setCurrentFilename(file.name);
        setLoading(true);

        // give status update
        setStatus({
            type: "neutral",
            message: `Loading \"${file.name}\"...`,
        });

        // get pre-signed URL for S3 upload and concat into formData object
        const fileName = encodeURIComponent(file.name);
        const fileType = encodeURIComponent(file.type);
        const s3Response = await fetch(
            `/api/upload-to-s3?fileName=${fileName}&fileType=${fileType}`
        );
        const { url, fields } = await s3Response.json();

        const formData = new FormData();
        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // use pre-signed URL to upload file to S3
        try {
            const upload = await fetch(url, {
                method: "POST",
                body: formData,
            });
            if (!upload.ok) {
                setStatus({
                    type: "error",
                    message: "Upload to S3 bucket failed. (No further information).",
                });
            }
        } catch (error) {
            const errorMsg = await upload.text();
            setStatus({
                type: "error",
                message: `Upload to S3 bucket failed. \n ${upload.status} ${errorMsg}`,
            });
        }

        // call split API route to split PDF into docs (chunks)
        console.log(file.name);
        console.log(`api/split?fileName=${file.name}`);
        const docsResponse = await fetch(`api/split?fileName=${file.name}`);
        const data = await docsResponse.json();

        // update status message with split API route result
        setStatus({
            type: data.result.type,
            message: data.result.message,
        });

        // update docs state with returned chunks (if they are returned)
        if (data.result.docs.length !== 0) {
            setDocs(data.result.docs);
        }

        // reset messages list if load was successful
        if (data.result.type === "success") {
            setMessages([
                {
                    text: "Ask a question about the PDF :)",
                    type: "response",
                },
            ]);
        }
        setLoading(false);
    };

    // function to handle loading of a sample PDF
    const handleLoadSamplePDF = async (event) => {
        // prevent browser refresh
        event.preventDefault();

        // sample PDFs are already in S3, don't need to reload.
        // instead, go straight to splitting step

        // get selected sample pdf name and filename
        const sample = samplePDFs.filter((pdf) => pdf.selected)[0];
        console.log(sample);
        const { fileName: sampleFileName, name: sampleName } = sample;

        // give status update
        setLoading(true);
        setStatus({
            type: "neutral",
            message: `Loading \"${sampleName}\"...`,
        });

        // call split API route to split PDF into docs (chunks)
        const docsResponse = await fetch(`api/split?fileName=${sampleFileName}&name=${sampleName}`);
        const data = await docsResponse.json();

        // update status message with split API route result
        setStatus({
            type: data.result.type,
            message: data.result.message,
        });

        // update docs state with returned chunks (if they are returned)
        if (data.result.docs.length !== 0) {
            setDocs(data.result.docs);
        }

        // reset messages list if load was successful
        if (data.result.type === "success") {
            setMessages([
                {
                    text: "Ask a question about the PDF :)",
                    type: "response",
                },
            ]);
        }
        setLoading(false);
    };

    return (
        <div className="flex w-[75vw] max-w-4xl flex-col">
            {session ? (
                <p className="p-2 text-lg text-zinc-200">Please select a PDF:</p>
            ) : (
                <div className="mb-4 flex flex-col">
                    <p className="-mb-2 p-2 text-lg text-zinc-200">
                        To load your own PDFs, please{" "}
                        <Link href="/auth/signin" className="text-[#eb9722] hover:opacity-80">
                            Sign In
                        </Link>
                    </p>
                    <p className="p-2 text-lg text-zinc-200">
                        In the meantime though, you can select a sample PDF to load:
                    </p>
                </div>
            )}
            <div className="flex flex-col items-center justify-center gap-2">
                <form
                    onSubmit={session ? handleLoadPDF : handleLoadSamplePDF}
                    className={`flex w-full flex-col items-stretch ${
                        session ? "gap-2 sm:flex-row" : "gap-4"
                    }`}
                >
                    {session ? (
                        // if logged in, show PDF loading input
                        <div className="flex flex-row gap-2 sm:w-2/3">
                            <input
                                accept="application/pdf"
                                ref={fileInputRef}
                                disabled={loading}
                                autoFocus={false}
                                type="file"
                                id="file"
                                name="file"
                                onChange={storePDF}
                                className="w-full resize-none rounded-[0.3rem] border border-[#30373d] p-3 text-[1.1rem] text-[#ececf1] outline-none disabled:opacity-50"
                            />
                            {fileChosen ? (
                                <button
                                    onClick={handleCloseFile}
                                    className="cursor-pointer border-none bg-none hover:opacity-80"
                                >
                                    <IoIosCloseCircle className="text-[26px] text-red-600" />
                                </button>
                            ) : null}
                        </div>
                    ) : (
                        // if not logged in, show sample PDFs
                        <div className="flex flex-row flex-wrap items-center justify-center gap-3">
                            {samplePDFs.map((pdf) => (
                                <button
                                    type="button"
                                    className={`flex items-center justify-center rounded-full border-2 border-[#eb9722] px-4 py-3 text-zinc-50 ${
                                        pdf.selected ? "bg-[#eb9722]" : "bg-inherit"
                                    }`}
                                    onClick={() => {
                                        setSamplePDFs(
                                            samplePDFs.map((x) => {
                                                if (x.key === pdf.key) {
                                                    return { ...x, selected: true };
                                                } else {
                                                    return { ...x, selected: false };
                                                }
                                            })
                                        );
                                    }}
                                >
                                    {pdf.name}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`h-14 w-full flex-grow rounded-[0.3rem] border-none bg-[#eb9722] p-2 text-white hover:cursor-pointer hover:opacity-80 disabled:cursor-not-allowed disabled:bg-[#1f2227] ${
                            session ? "sm:h-auto sm:w-1/3" : ""
                        }`}
                    >
                        {loading ? (
                            <div className="flex flex-row items-center justify-center gap-3">
                                <CircularProgress
                                    color="inherit"
                                    size={20}
                                    className="h-6 w-6 text-white"
                                />{" "}
                                <p className="text-base text-white">Loading...</p>
                            </div>
                        ) : (
                            <div className="flex flex-row justify-center gap-2">
                                <CgSoftwareUpload className="h-6 w-6 text-white" />
                                <p className="text-base text-white">Load PDF</p>
                            </div>
                        )}
                    </button>
                </form>
                {status.message ? (
                    <div className="mt-2 flex flex-grow items-center justify-center">
                        <p className={_statusStyleHelper(status.type)}>{status.message}</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default PDFInput;
