function setupCopyCodeButton(clipboard, codeWindow){
    //Fetch elements
    const copyCodeButton = codeWindow.querySelector(".copy-code-button");
    const codeBlock = codeWindow.querySelector("pre > code");

    //Setup click action
    copyCodeButton.addEventListener("click", function () {
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
        clipboard.writeText(textContent);
    });
}

function setupCopyCodeButtons(clipboard){
    const codeWindows = document.querySelectorAll(".code-window");
    codeWindows.forEach((codeWindow) => setupCopyCodeButton(clipboard, codeWindow));
}


if (navigator && navigator.clipboard){
    setupCopyCodeButtons(navigator.clipboard);
}