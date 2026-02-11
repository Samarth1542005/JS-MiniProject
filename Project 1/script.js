const colorBoxes = document.querySelectorAll(".color-box");

colorBoxes.forEach((box) => {
    box.addEventListener("click", () => {
        const color = box.dataset.color;
        document.body.style.backgroundColor = color;
    });
});
