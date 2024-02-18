//FILE UPLOADS USING NODEjs AND MULTER

const express =require('express');
const multer=require('multer');
const path=require("path");

const app=express();
const PORT=5000;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//disk storage in multer
const storage=multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null,"./uploads");
    },
    filename : function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    },
});

const upload=multer({storage});

//  for handling the form data
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    return res.render('homepage');
})

//post request at /upload route
app.post('/upload',upload.single('profileImage'),(req,res)=>{
    // console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
});


app.listen(PORT,()=> console.log(`Server started at PORT ${PORT}`));
