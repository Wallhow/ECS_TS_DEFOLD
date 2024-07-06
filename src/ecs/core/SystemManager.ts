/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ComponentsIDs, Components } from "../baseComponents/Components";
import { ecs } from "./ECS";


export type System<components extends ComponentsIDs[number][]> = {
    UUID: number;
    isEnabled: boolean;
    components: readonly string[],
    update?: (entities: { id: number, components: { [K in components[number]]: Components[K] } }[], dt: number) => void;
    input?: (entities: { id: number, components: { [K in components[number]]: Components[K] } }[], action_id: string | hash, action: any) => void;
};


export function SystemManager() {
    let ecs: ecs;
    const systems: System<any>[] = [];
    let systemsIDs = -1;
    function create<components extends ComponentsIDs[number][]>(componentsFiltering: components,
        methods?: {
            update?: (entities: { id: number, components: { [K in components[number]]: Components[K] } }[], dt: number) => void
            input?: (entities: { id: number, components: { [K in components[number]]: Components[K] } }[], action_id: string | hash, action: any) => void;
        }) {

        const system: System<components> = {
            UUID: systemsIDs++,
            isEnabled: true,
            components: componentsFiltering,
            ...methods,
        };
        systems.push(system);

        return systemsIDs;
    }

    function update(dt: number) {
        for (const system of systems) {
            if (system.isEnabled) {
                const entities = getEntities(system.components);
                if (system.update != undefined)
                    system.update(entities, dt);
            }
        }
    }

    function setEnabled(descSystem: number, isEnabled: boolean) {
        if (systems[descSystem] != undefined)
            systems[descSystem].isEnabled = isEnabled;
        else assert(false, 'system with descriptor ' + descSystem + 'not found');
    }

    function getEntities(components: readonly string[]) {
        const entities: { id: number; components: { [x: string]: any; } }[] = [];

        const res = ecs.getEntitiesWithComponents(components as ComponentsIDs[number][]);

        if (res.length > 0) {
            const e = res;
            if (e != undefined) {
                for (const i of e) {
                    const entity = ecs.getEntity(i);
                    if (entities.find(e => e.id === i) == undefined)
                        entities.push({ id: i, components: entity });
                }
            }
        }
        return entities;
    }

    function input(action_id: string | hash, action: any) {
        const inputSystems = systems.filter(system => system.components.includes('InputComponent'));
        if (inputSystems.length > 0)
            for (const system of inputSystems) {
                const entities = getEntities(system.components);
                if (system.input != undefined)
                    system.input(entities, action_id, action);
            }
    }

    function init(_ecs: ecs, systems: (() => number)[]) {
        ecs = _ecs;
        for (const system of systems)
            system();
    }
    return {
        update, input, create, init, setEnabled
    };

}