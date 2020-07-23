alert("Larger the size of picture ,longer the time it would take to apply filter.")

var image = null;
var imgCanvas;
var imgFile;

function Upload() {
  imgFile = document.getElementById("upfile");
  image = new SimpleImage(imgFile);
  grayImage = new SimpleImage(imgFile);
  redImage = new SimpleImage(imgFile);
  rainbowImage = new SimpleImage(imgFile);
  blurImage = new SimpleImage(imgFile);
  summerImage = new SimpleImage(imgFile);
  imgCanvas = document.getElementById("can");
  image.drawTo(imgCanvas);
}
function imageIsLoaded() {
  if(image == null || ! image.complete()) {
    alert("Image is not loaded");
  }
  else {
    return true;
  }
}
function filterGray() {
  for(var pixel of grayImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}

function doGray() {
  if(imageIsLoaded(grayImage)) {
    filterGray();
    grayImage.drawTo(imgCanvas);
  }
}

function filterRed() {
  for(var pixel of redImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    if(avg < 128) {
      pixel.setRed(2*avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }
    else{
      pixel.setRed(255);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(2*avg-255);
    }
  }
}

function doRed() {
  if(imageIsLoaded(redImage)) {
    filterRed();
    redImage.drawTo(imgCanvas);
  }
}
function filterRainbow() {
  for(var pixel of rainbowImage.values()) {
    var x = pixel.getX()
    var y = pixel.getY();
    var w = rainbowImage.getWidth();
    var h = rainbowImage.getHeight();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    if(y <= h/7) {
      if (avg < 128) {
      pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      }
      else {
        pixel.setRed(255);
        pixel.setGreen(2*avg - 255);
        pixel.setBlue(2*avg - 255);
      }
    }
     else if (y > h/7 && y <= (h*2)/7) 
  {
    if (avg < 128) {
      pixel.setRed(2*avg);
      pixel.setGreen(0.8*avg);
      pixel.setBlue(0);
    }
    else {
      pixel.setRed(255);
      pixel.setGreen(1.2*avg-51);
      pixel.setBlue(2*avg-255);
    }
  }
    else if (y > (h*2)/7 && y <= (h*3)/7) 
  {
    if (avg < 128) {
      pixel.setRed(2*avg);
      pixel.setGreen(2*avg);
      pixel.setBlue(0);
    }
    else {
      pixel.setRed(255);
      pixel.setGreen(255);
      pixel.setBlue(2*avg-255);
    }
  }
    else if (y > (h*3)/7 && y <= (h*4)/7) 
  {
    if (avg < 128) {
      pixel.setRed(0);
      pixel.setGreen(2*avg);
      pixel.setBlue(0);
    }
    else {
      pixel.setRed(2*avg-255);
      pixel.setGreen(255);
      pixel.setBlue(2*avg-255);
    }
  }
    else if (y > (h*4)/7 && y <= (h*5)/7) 
  {
    if (avg < 128) {
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(2*avg);
    }
    else {
      pixel.setRed(2*avg-255);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(255);
    }
  }
     else if (y > (h*5)/7 && y <= (h*6)/7) 
  {
    if (avg < 128) {
      pixel.setRed(0.8*avg);
      pixel.setGreen(0);
      pixel.setBlue(2*avg);
    }
    else {
      pixel.setRed(1.2*avg-51);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(255);
    }
  }
    else if (y > (h*6)/7 && y <= (h*7)/7) 
  {
    if (avg < 128) {
      pixel.setRed(1.6*avg);
      pixel.setGreen(0);
      pixel.setBlue(1.6*avg);
    }
    else {
      pixel.setRed(0.4*avg + 153);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(0.4*avg + 153);
    }
  }
  }
}

function doRainbow() {
  if(imageIsLoaded(rainbowImage)) {
    filterRainbow();
    rainbowImage.drawTo(imgCanvas);
  }
}

function filterBlur() {
  for(var pixel of blurImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    rand = Math.random();
    if(rand < 0.6) {
      blurImage.setPixel(x,y,pixel);
    }
    else {
      nearByPixel(x,y);
    }
  }
}

function nearByPixel(x,y) {
  var w = blurImage.getWidth();
  var h = blurImage.getHeight();
  var tempx = x + Math.floor(5 * rand);
  var tempy = y + Math.floor(5 * rand);
  if(tempx >= w) {
    tempx = w - Math.floor(5 * rand) -1;
  }  
  if(tempy >= h) {
    tempy = h - Math.floor(5 * rand) -1;  
  }
    var newPix = blurImage.getPixel(tempx, tempy);
    blurImage.setPixel(x,y,newPix);
}

function doBlur() {
  if(imageIsLoaded(blurImage)) {
    filterBlur();
    blurImage.drawTo(imgCanvas);
  }
}

function filterSummertane() {
  for(var px of summerImage.values()){
    var a = px.getRed();
    var b = px.getBlue();
    var c = px.getGreen();
    if(px.getRed()<128 && px.getGreen()<128){
      px.setBlue((a*0.5)+b);
    }
    else{
      px.setGreen((a*0.1)+(b*0.1)+c);
      px.setBlue((a*0.1)+(c*0.1)+b);
    }
  }
}
function doSummertane() {
  if(imageIsLoaded(summerImage)) {
    filterSummertane();
    summerImage.drawTo(imgCanvas);
  }
}


function reset() {
  if(image == null || ! image.complete()) {
    alert('Image is not loaded');
  }
  else if(imageIsLoaded(image)) {
      grayImage = new SimpleImage(imgFile);
      redImage = new SimpleImage(imgFile);
    rainbowImage = new SimpleImage(imgFile);
    blurImage = new SimpleImage(imgFile);
    SimpleImage(imgFile);
    summerImage = new SimpleImage(imgFile);
      image.drawTo(imgCanvas);
    }
  }