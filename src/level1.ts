import { Engine, Input, Scene, SceneActivationContext, Timer, Vector } from "excalibur";
import Enemy from "./enemy";
import Tower from "./tower";

export default class Level1 extends Scene {
  path: Vector[];
  constructor() {
    super();
    this.path = [];
  }
 
  onInitialize(): void {    
    this.path =  [
      new Vector(100, 100),
      new Vector(700, 100),
      new Vector(700, 500),
      new Vector(100, 500)
    ];
    const tower = new Tower(650, 150);
    const tower2 = new Tower(550, 250);
    this.add(tower);
    this.add(tower2);
  }

  update(e: Engine, d: number) {
    super.update(e, d);
    if (e.input.keyboard.wasPressed(Input.Keys.W))
      this.spawnWave(e)
  }
  
  spawnWave(_game: Engine) {
    // spawn a wave of enemies
    for (var i = 0; i < 10; i++) {  
      const enemyTimer = new Timer({
        fcn: () => this.add(new Enemy(0, 0, this.path, 120)),
        interval: i * 1000
      });
      this.addTimer(enemyTimer);
      enemyTimer.start();
    }
  }
}