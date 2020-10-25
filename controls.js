video.addEventListener("pause",()=>{
    document.querySelector("#playImage").src="./res/play-w.png";
});

video.addEventListener("play",()=>{
    document.querySelector("#playImage").src="./res/pause-w.png";
});


    function playPause(){
        if(video.paused && !video.ended){
            document.querySelector("#playGrow").src="./res/pause-w.png";
            document.querySelector("#playGrow").className="playAfter";
            setTimeout(()=>{document.querySelector("#playGrow").className="playGrow";},1000);
            video.play();
        }else if(video.ended){
            video.load();
        }else{
            document.querySelector("#playGrow").src="./res/play-w.png";
            document.querySelector("#playGrow").className="playAfter";
            setTimeout(()=>{document.querySelector("#playGrow").className="playGrow";},1000);
            video.pause();
        }
    }

    function fullscreen(){
        var window=remote.getCurrentWindow();
        window.setFullScreen(window.isFullScreen()?false:true);
        if(window.isFullScreen()){
            document.getElementById('fullSImage').src="./res/close-fullScreen-w.png";
            document.getElementById('titlebar').style.display="none";
            document.getElementById("holder").style.marginTop="0";
        }else{
            document.getElementById('fullSImage').src="./res/fullScreen-w.png";
            document.getElementById('titlebar').style.display="block";
            document.getElementById("holder").style.marginTop="32px";
        }
    };

function changeVideo(direction){
    //if we do "if(index<args)" then next will led to index=args which is not possible
    if(direction=="next" && index<(args.length-1)){
        console.log('next from args')
                ++index;
                loadVideo(args);
    }else if(direction=="previous"){   
        console.log('prev from args')  
                index=index>2?index-1:args.length-1;
                loadVideo(args);
    }else{
        console.log('after args')
        console.log(index);
        //if file list not loaded;
        if(files==undefined){
            console.log(args)
            files=fs.readdir((args[index].replace(path.basename(args[index]),'')),(err,filesList)=>{
            if(filesList!=null && filesList!=undefined && err==null){
                
                filePath=(args[index].replace(path.basename(args[index]),''));
                console.log('file- '+filePath);
                files=filesList;  

                for(var ii=0;ii<files.length;ii++){
                    if(path.extname(filePath+files[ii])=='.mp4' ||  path.extname(filePath+files[ii])=='.gif' || path.extname(filePath+files[ii])=='.ogg' || path.extname(filePath+files[ii])=='.3gp' || path.extname(filePath+files[ii])=='.wmv' || path.extname(filePath+files[ii])=='.flv' || path.extname(filePath+files[ii])=='.mov' || path.extname(filePath+files[ii])=='.webm' || path.extname(filePath+files[ii])=='.mkv' || path.extname(filePath+files[ii])=='.avi' ||path.extname(filePath+files[ii])=='.mpg' || path.extname(filePath+files[ii])=='.MPG'|| path.extname(filePath+files[ii])=='.3gpp'){
                        if(args.indexOf(filePath+files[ii])==(-1)){
                        args.push(filePath+files[ii]);
                        }
                    }
                }
                console.log(args)
                if(direction=="next" && index<(args.length)){
                    //loading next video- filepath="args[index].replace(path.basename[args[index]],'')"+ 
                    //name="files[(thisIndex+1)]"
                    ++index;
                    console.log(index);
                    loadVideo(args);
                }
            }
            });
        }else{
            //if after loading all the videos of a folder, next is clicked,
            //again first video will be loaded;
            index=2;
            loadVideo(args)
        }
    }
}

    function changeTime(direction,seconds){
        if(direction=='back'){
            document.querySelector("#back5sImage").className="playAfter";
            setTimeout(()=>{document.querySelector("#back5sImage").className="playGrow";},1000);
            video.currentTime-=seconds;
        }else if(direction=='front'){
            document.querySelector("#front5sImage").className="playAfter";
            setTimeout(()=>{document.querySelector("#front5sImage").className="playGrow";},1000);
            video.currentTime+=seconds;
        }
    }

    function muteVideo(){
       video.muted=video.muted?false:true;
       if(video.muted){
           document.querySelector("#muteImage").src="./res/sound-muted-w.png";
           document.getElementById('rv').value=0;
       }else{
            changeVolume();
       }
    }

    function changeVolume(){
        //init videovolume
        video.volume=volume;
        localStorage.setItem("volume",volume.toString());
        document.getElementById('rv').value=volume*100;
        if(volume>0.5 && volume<=1){
            document.querySelector("#muteImage").src="./res/sound-full-w.png";
        }else if(volume<=0.5 && volume>0){
            document.querySelector("#muteImage").src="./res/sound-half-w.png"
        }else{
            document.querySelector("#muteImage").src="./res/sound-muted-w.png";
        }
    }

    document.getElementById('rv').oninput=()=>{
        video.muted=false;
        volume=document.getElementById('rv').value/100;
        changeVolume(); 
    }    

    //hide controls pane after 3 seconds
    window.addEventListener("mousemove",()=>{
        controlPane.style.display="block";
        if(timeout!=undefined){
            clearTimeout(timeout);
        }
        timeout=setTimeout(()=>{
            controlPane.style.display="none";
        },2500)
    });

    //pause video on single click
    video.addEventListener("click",()=>{
       playPause();
    });

    //fullscreen on double click
    video.addEventListener("dblclick",()=>{
         fullscreen();
     });

     //to avoid spacebar to click focus buttons;
     document.querySelectorAll("button").forEach((item)=>{
        item.addEventListener('focus',()=>{item.blur()})
     })

    window.addEventListener("keyup",keyboardHandler);
    //settig shortcut keys for control buttons
    function keyboardHandler(e){
        if(e.keyCode==32){ //spacebar
            playPause();
        }else if(e.keyCode==37){ //arrow_left
            changeTime('back',5)
        }else if(e.keyCode==39){ //arrow_left
            changeTime('front',5)
        }
    }
