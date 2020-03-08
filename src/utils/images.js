// import logo from "assets/img/logo.png";
import defaultBg from "assets/img/defaultBg.jpeg";

const images = {
  logo:
    "https://cdn-images-1.medium.com/max/280/1*DqOmR8pN1KGfPUUlZC7Bqg@2x.png",
  defaultBg
};
export default function(imageName) {
  return images[imageName];
}
