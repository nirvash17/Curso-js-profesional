import mediaPlayer from "../mediaPlayer";

class VolumeBar{
    private volumeContainer:HTMLElement;
    private player:mediaPlayer;
    constructor(){
        this.volumeContainer = document.createElement('div');
        this.volumeContainer.className = 'volume-container';
        this.volumeAppear = this.volumeAppear.bind(this);
        this.volumeDisappear = this.volumeDisappear.bind(this);
        this.volumeHandler = this.volumeHandler.bind(this)

    }

    run(player:mediaPlayer){
        this.player = player;
        const mute:HTMLElement = document.querySelector(`.${this.player.buttonMute.className}`);
        const buttons:HTMLElement = document.querySelector(`.${this.player.buttonsContainer.className}`);
        console.log(mute ===  document.querySelector(`.${this.player.buttonMute.className}`),'asd');
        mute.parentNode.insertBefore(this.volumeContainer, mute.nextSibling)

        this.volumeContainer.style.transitionProperty = 'display';
        this.volumeContainer.style.transitionDuration = '1s'

        this.volumeContainer.innerHTML = `

            <div class='volume-bar-container'>
                <div class='volume-bar'> 
                    <div class='volume-box'>
                    
                    </div>
                </div>
            </div>
        `
        
        mute.onmouseover = this.volumeAppear;
        this.player.buttonsContainer.onmouseleave = this.volumeDisappear;
        const volumeBar:HTMLElement = document.querySelector('.volume-bar');
        volumeBar.onclick = this.volumeHandler;
        this.player.buttonMute.onclick = this.volumeHandler;
    }

    volumeAppear(){ 
        this.volumeContainer.style.display = 'block';
    }
    volumeDisappear(){ 
        console.log('out');
        this.volumeContainer.style.display = 'none';
    }

    volumeHandler(elem: any){
        const volumePosition = Math.ceil(elem.offsetX/5)*5;
        const volumeBox:HTMLElement = document.querySelector('.volume-box');
        console.log('volume handler')
        if(volumePosition >= 0 && volumePosition <= 50){
            this.player.media.volume = volumePosition/elem.target.offsetWidth;
            console.log(volumePosition, elem.target.offsetWidth, this.player.media.volume);
        }
        volumeBox.style.left = `${volumePosition}`;

    }
}


export default VolumeBar;