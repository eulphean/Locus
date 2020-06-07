class Eyelid {
    constructor() {
        // Acquire upper lid. 
        this.upperLid = select('.upperLid');
        console.log(this.upperLid); 
        this.upperLidYPos = 0;  
        this.upperLidMinPos = -height/2; // Range for animation. 

        // Acquire bottom lid. 
        this.lowerLid = select('.lowerLid');
        console.log(this.lowerLid);
        this.lowerLidYPos = height/2; 
        this.lowerLidMaxPos = height; // Range for animation. 
    }

    draw() {
        // Till these conditions are met, keep animating. 
        if (this.upperLidYPos > this.upperLidMinPos && this.lowerLidYPos < this.lowerLidMaxPos) {
            this.upperLidYPos = this.upperLidYPos - 2; 
            this.lowerLidYPos = this.lowerLidYPos + 2; 
            this.upperLid.position(0, this.upperLidYPos);
            this.lowerLid.position(0, this.lowerLidYPos);
        }
    }
}