
/**@noResolution */
declare module 'liveupdate_reszip.reszip' {
    export function version_match(filename: string): boolean;
    export function load_and_mount_zip(zip_file_location: any, opt: {
        filename: any, delete_old_file: boolean, on_finish: () => void,
        on_progress: () => void
    });
}