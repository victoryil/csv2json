export const dropzoneFile = document.getElementById('dropzone-file')
export const metaSelector = document.getElementById('meta-selector');
export const metaType = document.getElementById('meta-type');
export const skMirroningCheck = document.getElementById('skMirroning');

export const pd = {
    preventDefault: (event) => {
        event.preventDefault();
        event.stopPropagation();
    }
}