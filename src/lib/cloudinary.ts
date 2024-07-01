const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

interface CloudinaryUploadResponse {
    public_id: string;
    url: string;
}


const uploads = (file:any, folder:any):Promise<CloudinaryUploadResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
        file,
        (result:any) => {
            resolve({
            public_id : result.public_id,
            url: result.url,
            });
        },
        {
            resource_type : "auto",
            folder: folder,
        }
        )
    })
}

export { uploads, cloudinary }