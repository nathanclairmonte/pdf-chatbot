import { PDFLoader } from "langchain/document_loaders";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// get paper from s3 bucket (should be publicly accessible)
const _fetchPDF = async (pdfName) => {
    // build s3 URL
    const pdfLink = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${encodeURIComponent(
        pdfName
    )}`;

    try {
        // fetch PDF file
        const response = await fetch(pdfLink, { method: "GET" });

        // save as blob
        const fileBlob = await response.blob();

        return fileBlob;
    } catch (error) {
        console.log(error);
    }
};

export default async function handler(req, res) {
    console.log("splitting into chunks...");
    // load and split PDF into chunks
    try {
        // get file blob and load PDF with langchain
        const fileBlob = await _fetchPDF(req.query.fileName);
        const loader = new PDFLoader(fileBlob, {
            pdfjs: () => import("pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js"),
        });
        const data = await loader.load();

        // split into chunks
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 20,
        });
        const docs = await splitter.splitDocuments(data);

        return res.status(200).json({
            result: {
                type: "success",
                message: `Success! \"${req.query.fileName}\" loaded.`,
                docs: docs,
            },
        });
    } catch (error) {
        return res.status(500).json({
            result: {
                type: "error",
                message: `Something went wrong :(\n${error}`,
                docs: [],
            },
        });
    }
}
