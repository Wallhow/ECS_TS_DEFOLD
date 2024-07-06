import { ecs } from "../../ecs/core/ECS";
import { ControllerSystem } from "../../ecs/systems/ControllerSystem";
import { GoSetPositionSystem } from "../../ecs/systems/GoSetPositionSystem";
import { MoveSystem } from "../../ecs/systems/MoveSystem";
import { TintSystem } from "../../ecs/systems/TintSystem";
import { newCharEntity } from "./entities/CharEntity";

//TODO : Перенести update, input и т.д. в корутину!
export function MainLoop() {
    newCharEntity({ x: 0, y: 0 });

    ecs.systems.init(ecs,
        [
            ControllerSystem,
            MoveSystem,
            GoSetPositionSystem,
            TintSystem
        ]);
}