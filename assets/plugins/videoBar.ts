import mediaPlayer from "../mediaPlayer";


class VideoBar{
    private player:mediaPlayer
    private buttonsContainer:HTMLElement;
    private play:HTMLElement;
    private mute:HTMLElement;
    private main:HTMLElement;
    private bar:HTMLElement;
    private barWidth:number;
    private videoPosition:number;
    private videoLong:number
    private currentTime:number;
    private positionBox:HTMLElement;


    constructor(){
        
        this.play = document.querySelector('.play');
        this.mute = document.querySelector('.mute');
        this.main = document.querySelector('.container')
        this.buttonsContainer = document.createElement('div');
        this.buttonsContainer.className = 'botones';
        this.handler = this.handler.bind(this);
        this.barPosition = this.barPosition.bind(this);

    }

    run(player: mediaPlayer){
        this.player = player;
        this.main.appendChild(this.buttonsContainer);
        this.buttonsContainer.appendChild(this.play);
        this.buttonsContainer.appendChild(this.mute);
        this.buttonsContainer.innerHTML = `
            ${this.buttonsContainer.innerHTML} 
            <div class="video-bar">
                <div class="bar">
                    <div class='position-box'></div>
                </div?>
            </div>
        `
        this.positionBox = document.querySelector('.position-box');

        this.bar = document.querySelector('.bar');
        this.bar.onclick = this.handler;
        this.player.media.addEventListener('timeupdate', this.barPosition);

        this.barWidth = this.bar.offsetWidth;
        /* el evento loaded de data es necesario para esperar a que la data del video haya cargado y este disponible */
        this.player.media.addEventListener('loadeddata', () => {
            this.videoLong = this.player.media.duration;
        })
        

    }

    handler(elem){
        console.log('this en handler', this.player.media.duration);
        this.videoPosition = Math.round((elem.offsetX/10))*10;
        const instant = Math.round((this.videoLong/this.barWidth)*this.videoPosition);
        this.player.media.currentTime = instant;
    }

    barPosition(){
        this.videoLong = this.player.media.duration;
        this.currentTime = this.player.media.currentTime;
        this.videoPosition = Math.round(this.currentTime*(this.barWidth/this.videoLong));
        this.positionBox.style.left = `${this.videoPosition}px`;
    }
}


export default VideoBar;