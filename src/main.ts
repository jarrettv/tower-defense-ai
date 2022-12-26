import { Engine } from "excalibur";
import Level1 from "./level1";

const game = new Engine({width:800, height:600});

game.addScene("level1", new Level1());

game.start().then(() => {
  game.goToScene("level1");
});