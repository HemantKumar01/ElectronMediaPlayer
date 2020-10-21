//function to load video, when a video is "OPEN WITH" this app
function loadVideo(args){
    console.log(args[index]);
    
    if(path.extname(args[index])=='.mp4' || path.extname(args[index])=='.mp3' || path.extname(args[index])=='.gif' || path.extname(args[index])=='.ogg' || path.extname(args[index])=='.3gp' || path.extname(args[index])=='.wmv' || path.extname(args[index])=='.flv' || path.extname(args[index])=='.mov' || path.extname(args[index])=='.webm' || path.extname(args[index])=='.mkv' || path.extname(args[index])=='.avi' ||path.extname(args[index])=='.mpg' || path.extname(args[index])=='.MPG'|| path.extname(args[index])=='.3gpp'){
        document.title=path.basename(args[index]) + " - HMedia Player";
        document.querySelector('#headTitle').innerHTML=path.basename(args[index]) + " - HMedia Player";
    
        video.src=args[index];
    
        video.onended=()=>{
            if(index<(args.length-1)){
                if(!loop){
                    ++index;
                    loadVideo(args);
                }
            }
        }
    }else{
        if(index<(args.length-1)){
            if(!loop){
                ++index;
                loadVideo(args);
            }
        }
    }
}

//function to load when the app is started directly, whithout any video
function loadHome(){
    
    
}