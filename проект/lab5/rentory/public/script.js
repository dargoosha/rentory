
document.addEventListener('DOMContentLoaded', function() {
    const warehouseContainer = document.getElementById('warehouseContainer');
    const modal = document.getElementById('bookingModal');
    const closeButton = document.querySelector('.close-button');
    const submitButton = document.querySelector('.submit-button');

    async function fetchWarehouses() {
        try {
            const response = await fetch('http://localhost:5000/api/warehouse'); 
            console.log('Отримані склади:', response);// Запит до твого ендпоінту
            if (!response.ok) {
                throw new Error('Не вдалося отримати дані про склади');
            }
            const warehouses = await response.json();
            
            return warehouses;
        } catch (error) {
            console.error('Помилка при отриманні складів:', error);
            return [];
        }
    }

    // Функція для відображення складів
    async function renderWarehouses() {
        const warehouses = await fetchWarehouses(); // Отримуємо дані з сервера
        warehouseContainer.innerHTML = ''; // Очищаємо контейнер
        warehouses.forEach(warehouse => {
            const card = document.createElement('div');
            card.classList.add('warehouse-card');
            card.innerHTML = `
                <div class="warehouse-image">
                    <img src="/warehouse.png" alt="Зображення складу">
                </div>
                <div class="warehouse-info">
                    <h3>${warehouse.TypeName}</h3>
                    <p>${warehouse.SizeName}</p>
                    <p>${warehouse.PrisePerDay} грн за добу</p>
                </div>
                <button class="book-button" data-warehouse-id="${warehouse.IdWarehouse}">Забронювати!</button>
            `;
            warehouseContainer.appendChild(card);
        });

        const bookButtons = document.querySelectorAll('.book-button');
        bookButtons.forEach(button => {
            button.addEventListener('click', openModal);
        });
    }

    async function openModal(event) {
        const warehouseId = event.target.getAttribute('data-warehouse-id');
        try {
            const response = await fetch(`http://localhost:5000/api/warehouse/${warehouseId}`);
            if (!response.ok) {
                throw new Error('Не вдалося отримати дані про склад');
            }
            const warehouseData = await response.json();
            console.log('Отримані дані складу:', warehouseData);
    
            // Перевіряємо, чи є дані масивом, і беремо перший елемент, якщо потрібно
            const warehouse = Array.isArray(warehouseData) ? warehouseData[0] : warehouseData;
    
            if (warehouse && modal) {
                // Перевіряємо, чи є потрібні поля, і підставляємо значення або "Невідомо", якщо їх немає
                document.getElementById('modalWarehouseType').textContent = warehouse.TypeName || 'Невідомо';
                document.getElementById('modalPrice').textContent = `${warehouse.PrisePerDay || 0} грн за добу`;
                document.getElementById('modalType').textContent = `Тип складу: ${warehouse.TypeName || 'Невідомо'}`;
                document.getElementById('modalSize').textContent = `Розмір: ${warehouse.SizeName || 'Невідомо'}`;
                document.getElementById('modalTemperature').textContent = `Температура: ${warehouse.TemperatureName || 'Невідомо'}`;
                document.getElementById('modalHumidity').textContent = `Вологість: ${warehouse.Humidity || 'Невідомо'}`;
                document.getElementById('modalCity').textContent = `Місце: ${warehouse.CityName || 'Невідомо'}`;
                document.getElementById('modalAddress').textContent = `Адреса: ${warehouse.Address || 'Невідомо'}`;
    
                modal.style.display = 'flex';
            } else {
                console.error('Дані про склад відсутні або modal не знайдено');
            }
        } catch (error) {
            console.error('Помилка при отриманні даних складу:', error);
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function showSuccessNotification() {
        if (Notification.permission === "granted") {
            new Notification("Бронювання складу", {
                body: "Вітаємо! Ви успішно забронювали склад.",
                icon: "warehouse.png"
            });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("Бронювання складу", {
                        body: "Вітаємо! Ви успішно забронювали склад.",
                        icon: "warehouse.png"
                    });
                }
            });
        }
    }

    renderWarehouses();

    if (submitButton) {
        submitButton.addEventListener('click', function() {
            closeModal();
            showSuccessNotification();
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Дозвіл на сповіщення отримано");
            }
        });
    }
});