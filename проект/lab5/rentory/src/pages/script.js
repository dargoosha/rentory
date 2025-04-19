document.addEventListener('DOMContentLoaded', function() {
    // Знаходимо всі кнопки з класом book-button
    const bookButtons = document.querySelectorAll('.book-button');
    
    // Додаємо обробник кліку для кожної кнопки
    bookButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    function openModal() {
        document.getElementById('bookingModal').style.display = 'flex';
    }

    function closeModal() {
        document.getElementById('bookingModal').style.display = 'none';
    }

    window.onclick = function(event) {
        const modal = document.getElementById('bookingModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
});