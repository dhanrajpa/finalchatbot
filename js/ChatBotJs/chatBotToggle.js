let chatBox = document.querySelector('#chatBody');

let toggleBtn = document.querySelector("#toggleBtn");

let display = toggleBtn.style.display.value

const toggle = () => {

    if (chatBox.style.display == "none") {
        chatBox.style.display = "flex";
        chatBox.style.transition = "0.8s ease-in-out";
        chatBox.style.transform = "translateY(-40px)";
    } else {
        chatBox.style.display = "none";
    }
}

toggleBtn.addEventListener('click', toggle)

