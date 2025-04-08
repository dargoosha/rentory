document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            console.log(`${checkbox.name}: ${checkbox.value} is ${checkbox.checked ? 'selected' : 'unselected'}`);
        });
    });
});