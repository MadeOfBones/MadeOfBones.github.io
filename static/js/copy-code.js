function setupCopyCodeButton(clipboard, codeWindow){
    //Fetch elements
    const copyCodeButton = codeWindow.querySelector(".copy-code-button");
    const codeBlock = codeWindow.querySelector("pre > code");
    const codeWindowOverlay = codeWindow.querySelector(".code-window-overlay");
    const codeWindowOverlaySwipe = codeWindow.querySelector(".code-window-overlay-swipe");
    
    //Setup animtion
    const animationKeyframes = new KeyframeEffect(
        codeWindowOverlaySwipe,
        [{ left: "-200%"}, { left: "0%"}],
        {
            fill: "forwards",
            easing: "ease-out",
            duration: 500
        }
    );
    const animation = new Animation(animationKeyframes);
    animation.addEventListener("finish", (event) => {
        codeWindowOverlay.style.display = 'none';
    });

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
        codeWindowOverlay.style.display = 'inline';
        animation.cancel();
        animation.play();
    });
}

function setupCopyCodeButtons(clipboard){
    const codeWindows = document.querySelectorAll(".code-window");
    codeWindows.forEach((codeWindow) => setupCopyCodeButton(clipboard, codeWindow));
}


if (navigator && navigator.clipboard){
    setupCopyCodeButtons(navigator.clipboard);
}