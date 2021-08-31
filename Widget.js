define([
  'dojo/_base/declare', 
  'jimu/BaseWidget', 
  'dojo/on',
  './my/Person'
],
function(
  declare, 
  BaseWidget, 
  on,
  Person
) {

  return declare([BaseWidget], {

    baseClass: 'send-file',

    postCreate: function() {
      this.inherited(arguments);
      var imageFileEl = this.imageFile
      var fileToUploadEl = this.fileToUpload
      var lblErrorEl = this.lblError
      var customBtnEl = this.customBtn
      var folk = new Person("phiggins", 42, "Tennessee");
      var myJSON = JSON.stringify(folk);
      alert(myJSON);

      var object = {  
        doupload: function() {
            // var upload = new Upload({title: 'Rodrigo', file:'img.png'})
            
            // console.log('doupload',upload)
            alert('your file has been uploaded');

        },
        validExtension: function(file) {
          var allowedFiles = [".rar", ".zip"];
          var fileUpload = file
          console.log('myFile', fileUpload)
          var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
          if (!regex.test(fileUpload.value)) {
            lblErrorEl.innerHTML = "Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only.";
            return false;
          } else {
            lblErrorEl.innerHTML = "";
            return true;
          }
        }
      };
    
      var isValid = object.validExtension.bind(object)
      var up = object.doupload.bind(object)
      
      on(imageFileEl, 'change', function() {
        if(isValid(imageFileEl)) {
          fileToUploadEl.innerHTML = imageFileEl.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]
        } else {
          fileToUploadEl.innerHTML = "No file chosen, yet"
        }
      })

      on(customBtnEl, 'click', function() {
        up();
      })
    },

    // on(imageFileEl, "onProgress", function(data){
    //   console.warn("onProgress", data);
    //   dojo.byId("fileToUpload").value = "";
    //   dojo.forEach(data, function(d){
    //     dojo.byId("fileToUpload").value += "("+d.percent+"%) "+d.name+" \n";
    //   });
    // });
  
    // on(imageFileEl, "onComplete", function(data){
    //   console.warn("onComplete", data);
    //   dojo.forEach(data, function(d){
    //     dojo.byId("uploadedFiles").value += d.file+" \n";
    //     dojo.byId("rgtCol").innerHTML += imageHTML(d);//'<img src="'+d.file+'" />';
    //     rmFiles+=d.file+";";
    //   });
    // });

    // Destroy = function(){
    //   f0.destroyAll();
    // }

    // cleanUp = function(){
    //   dojo.byId("rgtCol").innerHTML = "";
    //   dojo.byId("uploadedFiles").value = "";
    //   dojo.byId("fileToUpload").value = "";
    //   dojo.xhrGet({
    //     url:uploadUrl,
    //     handleAs:"text",
    //     content:{
    //       rmFiles:rmFiles
    //     }
    //   });
    //   rmFiles = "";
    // };
    
    // unload.addOnUnload(function(){
    //   console.log("You're leaving the page");
    //   cleanUp();
    // });
  });
});
