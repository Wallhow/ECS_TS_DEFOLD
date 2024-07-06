/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * @noSelfInFile
*/

import { InputKeys } from "../ecs/CONSTS";
import { newController } from "../game/core/input/Controller";
import { newContainer } from "../utils/ui/uigo/container";
import { v2 } from "./core/types";

export const UserComponentsIDs = [
    'UserComponent', 'GO', 'InputComponent', 'VelocityComponent', 'TintComponent'
] satisfies (Required<keyof UserComps>)[];

export type UserComps = {
    UserComponent: {
        name: string,
        UUID: 'UserComponent'
    },

    GO: { hash: hash },

    GameObject: { id: hash, direction: v2 }

    VelocityComponent: v2,
    TintComponent: v2 & { z: number } & { spriteUrl: url },

    InputComponent: {
        init: (controller: ReturnType<typeof newController>) => void
    },
};




