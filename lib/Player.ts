import { Howl, Howler } from 'howler';

export function formatTime (secs: number) {
  if (!secs) return '--'
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + Math.floor(seconds);
}

// Change global volume.
// Howler.volume(0.5);

export class Sound {
  private static instance: Howl;
  private static position: number = 0; 
  private playId: number = 0

  private constructor() {}
  
  public static getInstance(): Howl {
    return Sound.instance;
  }
  
  public static create(url: string, onPlay: (sound: Howl) => void): Howl {
    if (Sound.instance) {
      Sound.instance.unload()
    }
    Sound.instance = new Howl({
        src: [url],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay: function() {
           onPlay(Sound.instance)
        },
        onend: function() {
          Sound.position = 0
          // wave.container.style.display = 'none';
          // bar.style.display = 'block';
          // self.skip('next');
        },
        onpause: function() {
          Sound.position = Sound.instance.seek()
        },
        onstop: function() {
          // Stop the wave animation.
          // wave.container.style.display = 'none';
          // bar.style.display = 'block';
        },
    })
    return Sound.instance
  }
  
  public play(): void {
    if (Sound.position && this.playId) {
      Sound.instance.seek(Sound.position, this.playId)
    }
    this.playId = Sound.instance.play(this.playId)
  }
}

export class MyPlayer {
  private static instance: MyPlayer;
  private sound?: Howl
  private playId: number = 0
  private initialSeek: number = 0
  
  private constructor() {
  }
  
  public static getInstance(): MyPlayer {
    if (!MyPlayer.instance) {
      MyPlayer.instance = new MyPlayer();
    }
    return MyPlayer.instance;
  }
  
  public createSound(url: string, source: string, seek?: number): void {
    if (this.sound) {
      this.sound.unload()
    }
    this.sound = new Howl({
      src: [url],
      html5: source === 'baidu' ? false : true,
      format: ['mp3', 'webm'],
        // onplay: function() {
        // },
        // onpause: function() {
        //   console.log('pau')
        //   MyPlayer.instance.position = MyPlayer.instance.sound?.seek()
        //   console.log(MyPlayer.instance.position)
        // },
        onstop: function() {
          // Stop the wave animation.
          // wave.container.style.display = 'none';
          // bar.style.display = 'block';
        },
      onplayerror: function(a, b) {
        console.log('play error', a, b)
      }
    })
    if (seek) {
      this.sound.seek(seek)
    }
  }

  public onPlay (fn: (sound: Howl) => void) {
    this.sound?.on('play', () => fn(this.sound!))
  }

  public onEnd (fn: (sound: Howl) => void) {
    this.sound?.on('end', () => fn(this.sound!))
  }

  public onLoaderror (fn: (sound: Howl, error: unknown) => void) {
    this.sound?.on('loaderror', (a, b) => fn(this.sound!, b))
  }

  public play() {
    if (this.sound) {
      if (this.sound.playing()) {
        this.sound.pause()
      }
      this.playId = this.sound.play()
    }
  }
  public pause () {
    this.sound?.pause()
  }

  public seek (percent: number, id?: number) {
    const d = this.sound?.duration()
    if (d) {
      const sk = d * percent / 100
      console.log('sk', sk)
      this.sound?.seek(sk)
    }
  }

  public seekSeconds (seconds: number) {
    this.sound?.seek(seconds)
  }

  public rate (rate: number) {
    this.sound?.rate(rate)
  }

  public getDP (seek: number) {
    if (this.sound) {
      const d = this.sound.duration()
      const p = seek * 100 / d
      return [ d, p ]
    }
    return [ 0, 0 ]
  }

  public playing () {
    return this.sound?.playing()
  }
}
