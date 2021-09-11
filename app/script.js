const { ipcRenderer } = require("electron");

var CLIPBOARD = new CLIPBOARD_CLASS("my_canvas", true);

document.getElementById("myForm").classList.add("is-blank");

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
  ctx.fillStyle = "blue";

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
        // document.getElementById("instructions").style.visibility = "hidden";
        //image
        var blob = items[i].getAsFile();
        var URLObj = window.URL || window.webkitURL;
        var source = URLObj.createObjectURL(blob);
        _self.paste_createImage(source, true);
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

          // let reader = new FileReader();
          // reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
          // reader.onload = function () {
          //   document
          //     .getElementById("img")
          //     .setAttribute("src", `${reader.result}`);
          // };

          this.paste_createImage(source);
        }
      }
      e.preventDefault();
    }
  };
  //draw pasted image to canvas
  this.paste_createImage = function (source, replace) {
    console.log("source", source);
    // document.getElementById("myForm").classList.add('is-blank');
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
        // Turn transparency on
      }
      ctx.drawImage(pastedImage, 0, 0);

      if (replace) replaceFolderIcon();
      document.getElementById("myForm").classList.remove("is-blank");
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

function replaceFolderIcon() {
  // debugger;
  var form = document.getElementById("myForm");
  //if (form.valid()) {
  var image = document.getElementById("my_canvas");
  if (!isCanvasBlank(image)) {
    console.log("starting1");
    document.getElementById("myForm").classList.add("is-loading");
    var imageData = image.toDataURL("image/png");
    imageData = imageData.replace("data:image/png;base64,", "");
    document.getElementById("imageData").value = imageData;

    ipcRenderer.send("image:iconize", {
      imageBase64: imageData,
    });
  } else {
    console.log("canvas is blank");
    // Pass null, otherwise the POST will submit { id = "imageData" } for this field.
    document.getElementById("imageData").value = null;
  }
}
ipcRenderer.on("currenticon:get", (path, rawdata) => {
  console.log("path", path);
  console.log("rawdata", rawdata);

  const blob = new Blob([rawdata]);
  console.log("blob", blob);

  var URLObj = window.URL || window.webkitURL;
  var source = URLObj.createObjectURL(blob);

  CLIPBOARD.paste_createImage(source, false);
});

ipcRenderer.on("paths", (args, paths) => {
  const { exePath, folderPath, folderName } = paths;
  console.log("paths", paths);
  document.getElementById("folderName").innerText =
    folderName !== "." ? folderName : "[Folder Name]";
});

ipcRenderer.on("loading:end", (args, data) => {
  setTimeout(() => {
    document.getElementById("myForm").classList.remove("is-loading");
    // document.getElementsByClassName("title-dothis")[0].style.display = "none";
    // document.getElementsByClassName("title-done")[0].style.display = "block";
    document.getElementsByClassName("closing-in-wrap")[0].style.opacity = "1";

    let closeIn = 3000;
    document.getElementsByClassName("closing-in")[0].innerText = closeIn / 1000;

    setInterval(() => {
      if (closeIn <= 1000) window.close();
      closeIn = closeIn - 1000;
      document.getElementsByClassName("closing-in")[0].innerText = closeIn / 1000;
    }, 1000);
  }, 1000);
});

const html = document.getElementsByTagName("html")[0];
const body = document.getElementsByTagName("body")[0];
console.log("html", html);
console.log("body", body);

document.addEventListener("dragenter", () => {
  console.log("dragenter");
  body.classList.add("is-dragging");
});
document.addEventListener("dragover", () => {
  console.log("dragover");
  body.classList.add("is-dragging");
});
document.addEventListener("dragleave", () => {
  console.log("dragleave");
  body.classList.remove("is-dragging");
});
document.addEventListener("drop", () => {
  console.log("drop");
  body.classList.remove("is-dragging");
});
