// especial dia das mães
var cenaMaes = {
    scene: 0,
    nextScene: 1,
    skinModel: null,
    init: function(){
        this.mount();
        this.listenerButtons();
    },
    mount: function(){
        $('.scene[data-scene='+this.scene+']').addClass('active');
    },
    listenerButtons: function(){
        $('.nextScene').click(function(e){
            e.preventDefault();
            cenaMaes.changeScene();
            //console.log('clicked');
        });
        $('.chooseModelBtn').click(function(e){
            e.preventDefault();
            var model = $(this).attr('data-model');
            cenaMaes.chooseModel(model);
            //console.log('choose model btn');     
        });
        $(".btnChoseImage").click(function() {
            $("#uploadedImage").click();
        });
        $("#uploadedImage").change(function() {
            //console.log('file selected');
            cenaMaes.mountMergeScene();
        });
        $('#sendScene').click(function(e){
            e.preventDefault();
            cenaMaes.sendImage();
            //console.log('send imagel btn');
        });
    },
    changeScene: function(){
        $('.scene').removeClass('active');
        $('.scene[data-scene='+this.nextScene+']').addClass('active');

        this.nextScene++;
        this.scene++;
    },
    chooseModel: function(model){
        this.skinModel = model;
        $('.model-doll[data-model='+model+']').show();
        var mask_a = document.getElementById('mask_a');
        var mask_b = document.getElementById('mask_b');
        
        var image_mask_a = document.getElementById('image-mask-a');
        var image_mask_b = document.getElementById('image-mask-b');
        
        var mask = document.getElementById('mask');
        var maskImage = document.getElementById('image-mask');

        if(model=="a"){
            mask.src = mask_a.src;
            maskImage.src = image_mask_a.src;
        }else{
            mask.src = mask_b.src;
            maskImage.src = image_mask_b.src;
        }
        
        this.changeScene();
    },
    mountMergeScene: function(){
        var output = document.getElementById('uploadedImage');
        var preview = document.getElementById('preview');
        preview.src = window.URL.createObjectURL(output.files[0]);
        var photoOriginal = document.getElementById('photoOriginal');
        photoOriginal.src = window.URL.createObjectURL(output.files[0]);
        preview.addEventListener("load", function(){
            // dragControl.resize();
        });
        
        this.changeScene();
        this.dragImage();
    },
    dragImage: function(){
        dragControl.init();
    },
    mergeImage: function(){
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        var img = document.getElementById("preview");
        var mask = document.getElementById("mask");
        var imageLeft = img.style["left"].substr(0, img.style["left"].indexOf("px"));
        var imageTop = img.style["top"].substr(0, img.style["top"].indexOf("px"));
        //console.log(imageTop);
        
        ctx.drawImage(img, imageLeft, imageTop, img.offsetWidth, img.offsetHeight); 
        ctx.drawImage(mask, 0, 0, 530, 531); 
    },
    sendImage: function(){
        var canvas = document.getElementById("canvas");
        var finalImage = document.getElementById('finalImage');
        finalImage.src = canvas.toDataURL();
        cenaMaes.saveFile();
        cenaMaes.changeScene();
    },
    saveFile: function(){
        var canvas = document.getElementById("canvas");
        var saveFileBtn = document.getElementById("saveFile");
        saveFileBtn.href = canvas.toDataURL('image/png');
    },
    changeStep: function(){
        switch(this.scene){
            case 0:
            break;
        }
    },
    sendMerged: function(){},
    getFinalImage: function(){}
}

var dragControl = {
    // enable drag
    draggable: false,
    
    // movement
    movement: true,
    mouseX: 0,
    mouseY: 0,
    restMouseX: 0,
    restMouseY: 0,
    image: document.getElementById('preview'),
    workbox: document.getElementById('work-box'),
    scale: 1,
    range_min_px: 120,
    range_max_px: 500,
    canvas: document.getElementById("canvas"),
    ctx: '',
    rotate_value: 90,
    counter:0,
    
    canvas_b:'',
    ctx_b:'',
    
    // functions
    init: function(){
        //console.log('initialized');
        var workbox = document.getElementById('image-mask');
        this.canvas_b=document.getElementById("canvas_temp");
        this.ctx = document.getElementById("canvas").getContext('2d');
        this.ctx_b = document.getElementById("canvas_temp").getContext("2d");
        
        dragControl.image=document.getElementById('preview');
        dragControl.workbox=document.getElementById('work-box');
        
        workbox.addEventListener('mousedown', this.startDrag);
        workbox.addEventListener('mouseup', this.endDrag);
        workbox.addEventListener('mousemove', this.dragging);
        
        workbox.addEventListener("touchstart", this.startTouch, true);
        workbox.addEventListener('touchmove', this.touching, true);
        workbox.addEventListener('touchend', this.endTouch, true);
        workbox.addEventListener('touchcancel', this.endTouch, true);
        
        $("#rangeSelector").change(function(){
            var rangeSelector = $('#rangeSelector');
            var preview = document.getElementById('preview');
            preview.style['width']=(rangeSelector.val())+'px';
            dragControl.merge();
        });
        $('#rotate').click(function(e){
            e.preventDefault();
            dragControl.rotate();
            //console.log('send imagel btn');
        });
        
        var image = document.getElementById("preview");
        image.onload = function(){
            dragControl.draw();
        }
        
        dragControl.merge();
    },
    resize: function(){
        var preview = document.getElementById('preview');
        preview.style['width']=400+'px';
        dragControl.merge();
    },
    startDrag: function(e){
        dragControl.draggable = true;
        restMouseX = e.clientX;
        restMouseY = e.clientY;
        image_left = dragControl.image.offsetLeft;
        image_top = dragControl.image.offsetTop;
        
        // dragControl.draw();
        $('#image-mask').addClass('transparent');
        // $('.preview').removeClass('disabled');
    },
    endDrag: function(e){
        dragControl.draggable = false;
        // dragControl.merge();
        //console.log('can`t drag');
        
        $('#image-mask').removeClass('transparent');
    },
    dragging: function(e){
        //console.log('foi');
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        dragControl.image=document.getElementById('preview');
        dragControl.workbox=document.getElementById('work-box');
        
        if(dragControl.draggable){
            //console.log('draggable');
            deltaX = mouseX - restMouseX;
            deltaY = mouseY - restMouseY;
            image_width = dragControl.image.offsetWidth;
            image_height = dragControl.image.offsetHeight;
            
            dragControl.image.style["left"] = (image_left + deltaX) + 'px';
            dragControl.image.style["top"] = (image_top + deltaY) + 'px';
            
            dragControl.draw();
            //console.log(mouseX + ' - ' + image_left);
        } else {
            
        }
    },
    startTouch: function(e){
        //console.log('starting touch');
        dragControl.draggable = true;
        dragControl.restMouseX = e.touches[0].clientX;
        dragControl.restMouseY = e.touches[0].clientY;
        dragControl.image_left = dragControl.image.offsetLeft;
        dragControl.image_top = dragControl.image.offsetTop;
        
        dragControl.draw();
        //console.log(e.touches[0].clientX);
    },
    touching: function(e){
        e.preventDefault();
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        //console.log(mouseX);
        
        if(dragControl.draggable){
            //console.log('draggable');
            deltaX = mouseX - dragControl.restMouseX;
            deltaY = mouseY - dragControl.restMouseY;
            image_width = dragControl.image.offsetWidth;
            image_height = dragControl.image.offsetHeight;
            
            dragControl.image.style["left"] = (dragControl.image_left + deltaX) + 'px';
            dragControl.image.style["top"] = (dragControl.image_top + deltaY) + 'px';
            
            dragControl.draw();
            //console.log(mouseX + ' - ' + dragControl.image_left);
        } else {
            
        }
    },
    endTouch: function(e){
        dragControl.draggable = false;
        dragControl.merge();
        //console.log('can`t drag');
        
        // $('.preview').addClass('disabled');
    },
    decrease: function(){
        //console.log('decreased');
        dragControl.scale = dragControl.scale - 0.05;
        dragControl.image.style["width"] = (dragControl.image.offsetWidth * dragControl.scale)+"px";
        dragControl.image.style["height"] = (dragControl.image.offsetHeight * dragControl.scale)+"px";
        dragControl.draw();
    },
    increase: function(){
        //console.log('increased');
        dragControl.scale = dragControl.scale + 0.05;
        dragControl.image.style["width"] = (dragControl.image.offsetWidth * dragControl.scale)+"px";
        dragControl.image.style["height"] = (dragControl.image.offsetHeight * dragControl.scale)+"px";
        dragControl.draw();
    },
    merge: function(){
        dragControl.draw();
    },
    drawTemp: function(){
        dragControl.ctx_b.drawImage( document.getElementById("photoOriginal"), 0, 0 );
    },
    clearTemp: function(){
        dragControl.ctx_b.clearRect(0,0,dragControl.canvas_b.width,dragControl.canvas_b.height);
    },
    rotate: function(){
        this.clearTemp();
        var width = document.getElementById("photoOriginal").width;
        var height = document.getElementById("photoOriginal").height;
        switch(dragControl.counter){
            case 0:
            dragControl.ctx_b.translate( height, 0 );
            break;
            case 1:
            dragControl.ctx_b.translate( width, height );
            break;
            case 2:
            dragControl.ctx_b.translate( 0, width );
            break;
            case 3:
            dragControl.ctx_b.translate( 0, 0 );
            break;
        }
        dragControl.ctx_b.rotate( 90*Math.PI/180 );
        this.drawTemp();
        this.duplicate();
    },
    duplicate: function(){
        var image = document.getElementById("preview");
        image.src = dragControl.canvas_b.toDataURL("image/png");
        image.onload = function(){
            dragControl.draw();
        }
    },
    draw: function(){
        var c = document.getElementById("canvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        var img = document.getElementById("preview");
        var mask = document.getElementById("mask");
        var imageLeft = img.style["left"].substr(0, img.style["left"].indexOf("px"));
        var imageTop = img.style["top"].substr(0, img.style["top"].indexOf("px"));
        //console.log(imageTop);
        
        ctx.drawImage(img, imageLeft, imageTop, img.offsetWidth, img.offsetHeight); 
        ctx.drawImage(mask, 0, 0, 530, 531); 
    }
}

document.addEventListener("DOMContentLoaded", function() {
    cenaMaes.init();
});