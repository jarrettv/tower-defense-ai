import { Engine, Actor, Vector, Color, CollisionType } from 'excalibur';

import Bullet from './bullet'
import Enemy from './enemy'

// Define a Tower class
export default class Tower extends Actor {
  bullets: Bullet[];
  cooldown: number;

  constructor(x: number, y: number) {
    super({
      pos: new Vector(x, y),
      width: 33,
      height: 33,
      color: Color.Black,
      collisionType: CollisionType.PreventCollision,
    });

    this.bullets = [];
    this.cooldown = 0;
  }

  // Update the tower's state
  update(engine: Engine, delta: number) {
    super.update(engine, delta)
    this.cooldown -= delta;

    const enemies = engine.currentScene.actors.filter(actor => actor instanceof Enemy);

    // If the tower is ready to fire and there are enemies nearby, shoot a bullet
    if (this.cooldown <= 0 && enemies.length > 0) {
      const enemy = enemies[0];  // Choose the first enemy in the array
      console.log("create bullet");
      const bullet = new Bullet(this.pos.x, this.pos.y, enemy);
      this.cooldown = 2000;  // Set the cooldown to 20 frames
      engine.add(bullet)
    }
  }
}
