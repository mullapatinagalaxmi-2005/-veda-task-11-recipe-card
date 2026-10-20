const faqItems = document.querySelectorAll(".faq-item");
const toggleAllButton = document.getElementById("toggleAll");

function setFaqState(item, isOpen) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".icon");

    answer.hidden = !isOpen;
    question.setAttribute("aria-expanded", String(isOpen));

    item.classList.toggle("active", isOpen);
    icon.textContent = isOpen ? "−" : "+";
}

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        const isCurrentlyOpen =
            question.getAttribute("aria-expanded") === "true";

        // Close the other answers.
        faqItems.forEach((faq) => setFaqState(faq, false));

        // Open the selected answer if it was previously closed.
        if (!isCurrentlyOpen) {
            setFaqState(item, true);
        }

        updateToggleButton();
    });
});

function updateToggleButton() {
    const allOpen = Array.from(faqItems).every((item) => {
        return item.querySelector(".faq-question")
            .getAttribute("aria-expanded") === "true";
    });

    toggleAllButton.textContent = allOpen
        ? "Collapse All FAQs"
        : "Expand All FAQs";
}

toggleAllButton.addEventListener("click", () => {
    const allOpen = Array.from(faqItems).every((item) => {
        return item.querySelector(".faq-question")
            .getAttribute("aria-expanded") === "true";
    });

    faqItems.forEach((item) => {
        setFaqState(item, !allOpen);
    });

    updateToggleButton();
});

// Set the initial state.
faqItems.forEach((item) => setFaqState(item, false));
updateToggleButton();