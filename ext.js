let fileInput = document.getElementById('fichier');
fileInput.addEventListener('change', loadimage);
  let canvas = document.getElementById("cnv");
  let context = canvas.getContext("2d");
  let img = new Image();
  
  img.onload = function(){
  
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img,0,0);
  
  };
  
  let isdr = false;
  let moused = false;
  let rad = 15;
  var init;
  function savecnv(){
  
      init = context.getImageData(0,0,cnv.width,cnv.height);
  
  }
  
  
  document.getElementById('reinit').addEventListener("click",function(event){
  
  context.putImageData(init,0,0);
  
  });
  
  document.getElementById("cercle").addEventListener("click",function(){
  
  isdr = true;
  
  });
  
  document.getElementById("valid").addEventListener("click",function(){
  moused = false;
  isdr = false;
  let image = new Image();
  image.src = canvas.toDataURL();
  let link = document.createElement("a");
  link.href = image.src;
  link.download = "image.png";
  link.click(); 
  
  });
  
  
  
  canvas.addEventListener("mousedown",function(event){
  moused = true;
  savecnv();
  if(isdr){
  
      var x = event.clientX - cnv.getBoundingClientRect().left,
          y = event.clientY - cnv.getBoundingClientRect().top;
      stackBlurCanvasRGBA('cnv', x, y, 30, 30, 10);
  
  }
  });
  
  
  canvas.addEventListener("mousemove",function(event){
  
      if(isdr && moused){
          var x = event.clientX - cnv.getBoundingClientRect().left,
          y = event.clientY - cnv.getBoundingClientRect().top;
          stackBlurCanvasRGBA('cnv', x, y, 30, 30, 10);
      }
      
  });
  
  canvas.addEventListener("mouseup",function(){
      moused = false;
  })
  
  
  
  
  
  
  
  function verif(fich){
  
  let format = ["image/jpeg","image/jpg","image/png"]; 
  
  for(let i = 0;i<format.length;i++){
      if(fich.type == format[i]){
          return true;
      }
      
  }
  return false;
  }
  
  function loadimage(){
  
  let fc = document.getElementById('fichier');
  console.log(fc.files);
  
  let fichier = fc.files[0];
  console.log("File name:" + fichier.name);
  let date = new Date(fichier.lastModified);
  console.log("Last modified:" + date);
  
  
    if(verif(fichier) == true){
      
      if(fc.files.length == 0){
      throw "file missing";
    }else{
      try{
     
      let image = new Image();
      let reader = new FileReader();
      reader.readAsDataURL(fichier);
      reader.onloadend = function() {
          image.src = reader.result;
          
          image.onload = function(){
              const canvas = document.getElementById('cnv');
                canvas.width = upload.clientWidth;
                canvas.height = upload.clientHeight;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
              
              document.getElementById("dis").style.display = "none";
          }
  
      }
  
    }
    catch(error){
      console.log(error);
    }
  }
  
  
  
  
  }
  }