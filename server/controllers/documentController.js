const pdfParse = require("pdf-parse");
const fs = require("fs");

const {
    createDocument
} = require("../services/documentService");



// Upload PDF

const uploadDocument = async(req,res)=>{

    try{


        const {courseId}=req.params;


        if(!req.file){

            return res.status(400).json({
                message:"PDF file required"
            });

        }



        const dataBuffer = fs.readFileSync(
            req.file.path
        );


        const pdfData = await pdfParse(dataBuffer);



        const document = {

            courseId: courseId,

            fileName:req.file.filename,

            originalName:req.file.originalname,

            text:pdfData.text,

            uploadedAt:new Date()

        };



        const result = await createDocument(document);

res.status(201).json({

    message: "PDF uploaded successfully",

    documentId: result.insertedId,

    file: req.file.filename

});



    }
    catch(error){

        console.error(error);


        res.status(500).json({

            message:"Server Error"

        });

    }

};



module.exports={
    uploadDocument
};