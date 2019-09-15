//Converting url from high images to low resolution images
const convertUrlToSpecificWidth = url => {
  try {
    let splittedUrlIs = url.split("/id/");
    let urlIs = splittedUrlIs[0];
    let newAppendedUrl = splittedUrlIs[1].split("/", 1)[0];

    let newUrl = `${urlIs}/id/${newAppendedUrl}/320/240`;
    return newUrl;
  } catch (e) {
    //Fallback if url mismatch or something went bad in url traversing
    return (
      "https://picsum.photos/320/240?random=" + Math.floor(Math.random() * 100)
    );
  }
};

export default convertUrlToSpecificWidth;
