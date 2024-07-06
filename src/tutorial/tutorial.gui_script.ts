
import * as druid from 'druid.druid';
import { getNodes } from '../utils/ui/gui/utilsFun';
import { tween } from '../utils/defoldTweens/Tween';
import { newShrinkText } from '../utils/ui/gui/components/ShrinkText';

interface props {
    druid: DruidClass;

}


export function init(this: props): void {
    Manager.init_gui();
    this.druid = druid.new(this);

    const nodes = getNodes([
        'contentContainer', 'labelStep1', 'labelStep2', 'labelStep3', 'tutorialLabel', 'button', 'label'
    ] as const);

    newShrinkText(nodes.labelStep1, 'y').set(Lang.get_text('labelStep1'));
    newShrinkText(nodes.labelStep2, 'y').set(Lang.get_text('labelStep2'));
    newShrinkText(nodes.labelStep3, 'y').set(Lang.get_text('labelStep3'));


    this.druid.new_button('btnOptions', () => {
        Sound.set_active(!Sound.is_active());
        _updateMusicToggleButton();
    });
    _updateMusicToggleButton();

    let pressCounter = 0;
    this.druid.new_button(nodes.button, () => {
        pressCounter++;

        if (pressCounter > 2) {
            if (pressCounter > 3) {
                Storage.set('is_not_fst', true);
                Scene.load('game');
            }
            gui.set_text(nodes.label, Lang.get_text('startGame'));
        }
        else {
            tutorialMoveNext();
        }
    });

    function _updateMusicToggleButton() {
        gui.set_enabled(gui.get_node('musicOn'), Sound.is_active());
        gui.set_enabled(gui.get_node('musicOff'), !Sound.is_active());
    }

    function tutorialMoveNext() {
        tween(nodes.contentContainer, 'gui')
            .moveBy(0.2, { x: -400 })
            .start();
    }
}


export function on_input(this: props, action_id: string | hash, action: unknown): void {
    const res = this.druid.on_input(action_id, action) as any as boolean;

    return res as any as void;
}

export function update(this: props, dt: number): void {
    this.druid.update(dt);
}

export function on_message(this: props, message_id: string | hash, message: any, sender: string | hash | url): void {
    Manager.on_message_gui(this, message_id, message, sender);
    this.druid.on_message(message_id, message, sender);
}

export function final(this: props): void {
    this.druid.final();
}
