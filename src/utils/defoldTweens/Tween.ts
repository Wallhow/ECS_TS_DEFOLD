/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { TweensForNode, _newTweensForNode } from "./TweenGUI";

//TODO: 
type TweensForGO = {};

export function tween<T extends 'gui' | 'go'>(obj: string | node | hash, type: T): T extends 'go' ? TweensForGO : TweensForNode {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return  type == 'gui' ? _newTweensForNode(obj) : _newTweensForGO(obj) as any;
}

function _newTweensForGO(obj: hash): TweensForGO {
    throw Error('Tween for go is not implemented');
    return {

    };
}

