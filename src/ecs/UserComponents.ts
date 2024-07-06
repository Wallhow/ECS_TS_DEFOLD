/* eslint-disable @typescript-eslint/no-empty-function */


import { InputKeys } from "../ecs/CONSTS";
import { newController } from "../game/core/input/Controller";
import { newContainer } from "../utils/ui/uigo/container";
import { v2 } from "./core/types";

export const UserComponentsIDs = [
    'UserComponent', 'GO', 'InputComponent', 'VelocityComponent'
] as const;

export type UserComps = {
    UserComponent: {
        name: string,
        UUID: 'UserComponent'
    },

    GO: { hash: hash },

    GameObject: { id: hash, direction: v2 }

    VelocityComponent: v2,

    InputComponent: {
        init: (controller: ReturnType<typeof newController>) => void
    },
};

