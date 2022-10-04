import { pd, metaSelector, skMirroningCheck } from "./utils.js";

skMirroningCheck.addEventListener('change', (event) => {
    pd.preventDefault(event);
    !event.target.checked;
    if(metaSelector == null) {
        console.log("metaSelector is null");
        return;
    } 
    metaSelector.style.visibility = event.target.checked ? 'visible' : 'hidden';
});
