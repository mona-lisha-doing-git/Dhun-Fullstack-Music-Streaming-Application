import { v2 as cloudinary} from "cloudinary"
import albumModel from "../models/albumModel.js"

const addAlbum = async (req,res)=>{
    try{
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColour = req.body.bgColour;
        const imageFile = req.file; // middleware will track the image that we uploaded
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"}); // to upload the imagefile in our cloudinary storage

        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url
        }

        const album = albumModel(albumData);
        await album.save();
        res.json({success: true, message: "Album added"});

    }catch(error){
        res.json({success: false});
    }
}

const listAlbum = async (req,res)=>{
    try{
        const allAlbums = await albumModel.find({});
        res.json({success: true, albums: allAlbums});
    }catch(error){
        res.json({success: false});
    }
}

const removeAlbum = async (req,res)=>{
    try{
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message: "Album Removed."});

    }catch(error){
        res.json({success:false, message: "Something went Wrong!"});

    }
}

export {addAlbum, listAlbum, removeAlbum}