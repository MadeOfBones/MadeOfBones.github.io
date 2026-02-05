function addCopyButtons(clipboard) {
    const copyIcon = '<svg width="63.999996" height="63.999996" viewBox="0 0 16.933332 16.933332"><g><path style="fill:none;stroke:currentColor;stroke-width:1.10476;stroke-dasharray:none" d="m 5.3148799,4.2333116 v -2.0934305 0 h 9.4785711 v 9.4785739 h -2.09343" /><rect style="fill:none;stroke:currentColor;stroke-width:1.11627;stroke-dasharray:none" width="9.4670563" height="9.467063" x="2.1456382" y="5.3206353" /></g></svg>';
    const checkIcon = '<svg width="63.999996" height="63.999996" viewBox="0 0 16.933332 16.933332"><g><path style="fill:none;stroke:currentColor;stroke-width:2.11667;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" d="M 1.5875,7.9375 6.35,12.7 15.345833,3.7041667"/></g></svg>';

    document.querySelectorAll("pre > code").forEach(function (codeBlock) {
        var button = document.createElement("button");
        button.className = "copy-code-button";
        button.type = "button";
        button.innerText = "";
        button.innerHTML = copyIcon;
        button.title = "Copy";

        button.addEventListener("click", function () {

            let textContent = '';
            codeBlock.childNodes.forEach(function (child){
                //Remove line numer
                if(child.childNodes.length == 2){
                    textContent = textContent.concat(child.childNodes[1].textContent);
                }
                else{
                    textContent = textContent.concat(child.textContent);
                }
            });

            clipboard.writeText(textContent).then(
                function () {
                    /* Chrome doesn't seem to blur automatically, leaving the button
                       in a focused state */
                    button.blur();

                    //Show "Copied"
                    button.innerHTML = checkIcon;
                    setTimeout(function () {
                      //Return to default state (hide "Copied")
                      button.innerHTML = copyIcon;
                    }, 1000);
                },
                function (error) {
                    button.innerText = "Error";
                    console.error(error);
                }
            );
        });
        var pre = codeBlock.parentNode;
        pre.parentNode.insertBefore(button, pre);
    });
}

if (navigator && navigator.clipboard) {
    addCopyButtons(navigator.clipboard);
}