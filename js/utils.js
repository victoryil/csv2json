export const dropzoneFile = document.getElementById('dropzone-file')

export const pd = {
    preventDefault: (event) => {
        event.preventDefault();
        event.stopPropagation();
    }
}