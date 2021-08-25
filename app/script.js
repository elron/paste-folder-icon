const { ipcRenderer } = require("electron");


var CLIPBOARD = new CLIPBOARD_CLASS("my_canvas", true);

/**
 * image pasting into canvas
 *
 * @param {string} canvas_id - canvas id
 * @param {boolean} autoresize - if canvas will be resized
 */
function CLIPBOARD_CLASS(canvas_id, autoresize) {
  var _self = this;
  var canvas = document.getElementById(canvas_id);
  var ctx = document.getElementById(canvas_id).getContext("2d");

  //handlers
  document.addEventListener(
    "paste",
    function (e) {
      _self.paste_auto(e);
    },
    false
  );

  /* events fired on the drop targets */
  document.addEventListener(
    "dragover",
    function (e) {
      // prevent default to allow drop
      e.preventDefault();
    },
    false
  );
  document.addEventListener("drop", function (e) {
    // prevent default action (open as link for some elements)
    // add event handler to canvas if desired instead of document
    //debugger;
    e.preventDefault();
    var items = e.dataTransfer.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        document.getElementById("instructions").style.visibility = "hidden";
        //image
        var blob = items[i].getAsFile();
        var URLObj = window.URL || window.webkitURL;
        var source = URLObj.createObjectURL(blob);
        _self.paste_createImage(source);
      }
    }
  });

  //on paste
  this.paste_auto = function (e) {
    if (e.clipboardData) {
      var items = e.clipboardData.items;
      if (!items) return;

      //access data directly
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          //image
          var blob = items[i].getAsFile();
          var URLObj = window.URL || window.webkitURL;
          var source = URLObj.createObjectURL(blob);
          this.paste_createImage(source);
        }
      }
      e.preventDefault();
    }
  };
  //draw pasted image to canvas
  this.paste_createImage = function (source) {
    //debugger;
    var pastedImage = new Image();
    pastedImage.onload = function () {
      if (autoresize == true) {
        //resize
        canvas.width = pastedImage.width;
        canvas.height = pastedImage.height;
      } else {
        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(pastedImage, 0, 0);
    };
    pastedImage.src = source;
  };
}

// detect blank canvas: https://stackoverflow.com/a/17386803/177416
function isCanvasBlank(canvas) {
  var blank = document.createElement("canvas");
  blank.width = canvas.width;
  blank.height = canvas.height;

  return canvas.toDataURL() === blank.toDataURL();
}

document.getElementById("saveButton").addEventListener("click", function () {
  debugger;
  var form = document.getElementById("myForm");
  //if (form.valid()) {
  var image = document.getElementById("my_canvas");
  if (!isCanvasBlank(image)) {
    var imageData = image.toDataURL("image/png");
    imageData = imageData.replace("data:image/png;base64,", "");
    document.getElementById("imageData").value = imageData;

    ipcRenderer.send("image:iconize", {
      imageBase64: imageData,
    });
  } else {
    // Pass null, otherwise the POST will submit { id = "imageData" } for this field.
    document.getElementById("imageData").value = null;
  }
  //form.submit();
  //}
});

ipcRenderer.on("folder:path", (path, folderPath) => {
  console.log("path", path);
  console.log("folderPath", JSON.parse(folderPath));
  console.log("folderPath", JSON.parse(folderPath));
  alert(JSON.stringify(folderPath));
});

ipcRenderer.on("paths", (args, paths) => {
  const { exePath, folderPath } = paths;
  console.log("paths", paths);
  document.getElementById("exePath").innerText = exePath;
  document.getElementById("folderPath").innerText = folderPath;
});