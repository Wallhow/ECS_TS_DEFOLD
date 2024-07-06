/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */

/** @noResolution */
declare module 'instant_games_bridge.bridge' {
    let exports: InstantGamesBridge;
    export = exports;
}

/** @noSelf **/
interface InstantGamesBridge {
    initialize(opt?: { forciblySetPlatformId: PLATFORM_ID }): Promise<any>;
    readonly platform: Platform;
    readonly game: Game;
    readonly storage: Storage;
    readonly advertisement: Advertisement;
    readonly leaderboard: Leaderboard;
    readonly social: Social;
}
/** @noSelf **/
interface Platform {
    id: PLATFORM_ID, language(): string,
    sendMessage(msg: Message): any;
}
/** @noSelf **/
interface Social {
    isShareSupported: boolean;
    isInviteFriendsSupported: boolean;
    share(shareOptions: any): Promise<any>;
    inviteFriends(): Promise<any>;
}

type ShareOptions = {
    'vk': { link: string }
};

/** @noSelf **/
interface Leaderboard {
    isSetScoreSupported: boolean;
    isGetScoreSupported: boolean;
    isGetEntriesSupported: boolean;
    setScore(setScoreOptions: ScoreOptions): Promise<any>;
}

type ScoreOptions = {
    'yandex': {
        leaderboardName: string,
        score: number
    }
};
/** @noSelf **/
interface Game {
    visibilityState: 'visible' | 'hidden';
    on(event: EVENT_NAME, callback: (state: any) => void): void;
}
/** @noSelf **/
interface Storage {
    defaultType: 'platform_internal' | 'local_storage';
    get(key: string): string;
    set(key: string, val: string): void;
    isSupported(): boolean;
}
/** @noSelf **/
interface Advertisement {
    on(event: EVENT_NAME, callback: (state: REWARDED_STATE | INTERSTITIAL_STATE) => void): void;
    // once(event: EVENT_NAME, callback: (state: REWARDED_STATE | INTERSTITIAL_STATE) => void): void;
    listeners: {
        rewarded_state_changed: Array<() => void>,
        interstitial_state_changed: Array<() => void>
    };
    hideBanner(): void;
    showRewarded(): void;
    showInterstitial(opt?: any): void;

    showBanner(bannerOpt?: BannerOptions): void;
    rewardedState(): REWARDED_STATE

}

type BannerOptions = {
    'vk': {
        position?: 'top', // Необязательный параметр, по умолчанию = bottom
        layoutType?: 'resize', // Необязательный параметр
        canClose?: boolean // Необязательный параметр
    },
    'crazy_games': {
        containerId: 'div-container-id'
    },
    'game_distribution': {
        containerId: 'div-container-id'
    }
};

type Message = 'game_ready';


type PLATFORM_ID =
    'vk' | 'yandex' | 'crazy_games' | 'absolute_games' | 'game_distribution' | 'mock';


type MODULE_NAME =
    'platform' | 'player' | 'game' | 'storage' | 'advertisement' | 'social' | 'device' | 'leaderboard';

type EVENT_NAME =
    'interstitial_state_changed' | 'rewarded_state_changed' | 'banner_state_changed' | 'visibility_state_changed';

type REWARDED_STATE =
    'loading' | 'opened' | 'closed' | 'failed' | 'rewarded';

type BANNER_STATE =
    'loading' | 'shown' | 'hidden' | 'failed';

type STORAGE_TYPE =
    'local_storage' | 'platform_internal';

type DEVICE_TYPE =
    'desktop' | 'mobile' | 'tablet' | 'tv';

type PLATFORM_MESSAGE =
    'game_ready' | 'in_game_loading_started' | 'in_game_loading_stopped' | 'gameplay_started' | 'gameplay_stopped' | 'player_got_achievement';

type ACTION_NAME = 'initialize' | 'authorize_player' | 'share' | 'invite_friends' | 'join_community' | 'create_post' |
    'add_to_home_screen' | 'add_to_favorites' | 'rate' | 'set_leaderboard_score' | 'get_leaderboard_score' |
    'get_leaderboard_entries' | 'show_leaderboard_native_popup';

type VISIBILITY_STATE =
    'visible' | 'hidden';

type INTERSTITIAL_STATE = 'loading' | 'opened' | 'closed' | 'failed';

type InitCallback = () => void;
