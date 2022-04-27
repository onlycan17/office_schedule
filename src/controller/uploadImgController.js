
export const uploadPhotos = async (req, res) => {
    let imgUrl = new Array();
    
    const file = req.files.forEach(element => {
      console.log(element);
      imgUrl.push(element.location);
    });
  
    return res
      .status(201)
      .json({ url:imgUrl });
}