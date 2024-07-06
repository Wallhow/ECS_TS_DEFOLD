export type NodesFromTemplate<T extends readonly string[]> = { [key in T[number]]: node };

/**
 * Возвращает mapped type объект где ключ это заданное имя из списка имен нод, а значение нода с данным именем  
 * @param templateName имя темплейта в гуи сцене без '/'
 * @param nodesName имена нод которые надо из него вытащить, массив который должен быть помечен как as const
 * @param template клонированный темплейта из которой надо вытянуть заданные ноды, если не указан то берет ноды с указанного темплейта в сцене
 * @returns 
 */
export function getNodesFromTemplate<T extends readonly string[]>(templateName: string, nodesName: T, template?: AnyTable) {
    const nodesMap: NodesFromTemplate<T> = {} as NodesFromTemplate<T>;
    for (const name of nodesName)
        nodesMap[name as keyof NodesFromTemplate<T>] = template == undefined ? gui.get_node(templateName + '/' + name) : (template[templateName + '/' + name] as node);

    return nodesMap;
}

/**
 * Возвращает mapped type объект где ключ это заданное имя из списка имен нод, а значение нода с данным именем
 * достает ноды из темплейтов или из сцены  
 * @param templateName имя темплейта в гуи сцене без '/'
 * @param nodesName имена нод которые надо из него вытащить, массив который должен быть помечен как as const
 * @param template клонированный темплейта из которой надо вытянуть заданные ноды, если не указан то берет ноды с указанного темплейта в сцене
 * @returns 
 */
export function getNodes<T extends readonly string[]>(nodesName: T): NodesFromTemplate<T>;
export function getNodes<T extends readonly string[]>(nodesName: T, templateName: string): NodesFromTemplate<T>;
export function getNodes<T extends readonly string[]>(nodesName: T, templateName: string, template: AnyTable): NodesFromTemplate<T>
export function getNodes<T extends readonly string[]>(nodesName: T, templateName = '', template?: AnyTable): NodesFromTemplate<T> {
    const nodesMap: NodesFromTemplate<T> = {} as NodesFromTemplate<T>;
    templateName ?? '';
    for (const name of nodesName)
        nodesMap[name as keyof NodesFromTemplate<T>] = get_node(templateName, name, template);


    function get_node(templateName: string, nodeName: string, template: AnyTable): node {
        const templatePrefix = templateName != '' ? templateName + '/' : '';
        const nodePath = templatePrefix + nodeName;
        
        return template == undefined ? gui.get_node(nodePath) : (template[nodePath] as node);
    }
    return nodesMap;
}
