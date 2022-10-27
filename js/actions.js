import { pd, metaSelector, skMirroningCheck, headerCheckContainer } from "./utils.js";

skMirroningCheck.addEventListener('change', (event) => {
    pd.preventDefault(event);
    !event.target.checked;
    if(metaSelector == null) {
        console.log("metaSelector is null");
        return;
    } 
    metaSelector.style.display = event.target.checked ? 'block' : 'none';
    headerCheckContainer.style.display = event.target.checked ? 'block' : 'none';
});
