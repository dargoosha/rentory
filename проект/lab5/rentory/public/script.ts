interface Warehouse {
    IdWarehouse: number;
    IdWarehouseType: number;
    IdTemperature: number;
    Humidity: number;
    Ventilation: number;
    IdCity: number;
    Address: string;
    IdSize: number;
    PrisePerDay: number;
    TypeName: string;
    SizeName: string;
    CityName: string;
    TemperatureName: string;
}

interface Filters {
    type: string[];
    size: string[];
    temperature: string[];
    humidity: string[];
    ventilation: string[];
    city: string[];
    dateFrom: string | null;
    dateTo: string | null;
}

interface Booking {
    IdBooking: number;
    IdWarehouse: number;
    IdClient: number;
    StartDate: string;
    EndDate: string;
    BookingStatus: string;
    Prise: number;
    PaymentStatus: string;
}

interface User {
    IdClient: number;
    FullName: string;
    Email: string;
    Phone: string;
}

const cityMapping: { [key: string]: string } = {
    kyiv: 'київ',
    kharkiv: 'харків',
    zaporizhzhia: 'запоріжжя',
    dnipro: 'дніпро',
    cherkasy: 'черкаси',
};

document.addEventListener('DOMContentLoaded', async () => {
    const warehouseContainer: HTMLElement | null = document.getElementById('warehouseContainer');
    const modal: HTMLElement | null = document.getElementById('bookingModal');
    const closeButton: HTMLElement | null = document.querySelector('.close-button');
    const submitButton: HTMLElement | null = document.querySelector('.submit-button');

    let allWarehouses: Warehouse[] = [];
    let allBookings: Booking[] = [];
    let currentWarehouseId: number | null = null; 

    const filters: Filters = {
        type: [],
        size: [],
        temperature: [],
        humidity: [],
        ventilation: [],
        city: [],
        dateFrom: null,
        dateTo: null,
    };

    async function fetchWarehouses(): Promise<Warehouse[]> {
        try {
            const response: Response = await fetch('http://localhost:5000/api/warehouse');
            console.log('Отримані склади:', response);
            if (!response.ok) {
                throw new Error('Не вдалося отримати дані про склади');
            }
            const warehouses: Warehouse[] = await response.json();
            return warehouses;
        } catch (error: unknown) {
            console.error('Помилка при отриманні складів:', error);
            return [];
        }
    }

    async function fetchBookings(): Promise<Booking[]> {
        try {
            const response: Response = await fetch('http://localhost:5000/api/booking');
            if (!response.ok) {
                throw new Error('Не вдалося отримати дані про бронювання');
            }
            const bookings: Booking[] = await response.json();
            return bookings;
        } catch (error: unknown) {
            console.error('Помилка при отриманні бронювань:', error);
            return [];
        }
    }

    async function fetchUsers(): Promise<User[]> {
        try {
            const response: Response = await fetch('http://localhost:5000/api/user');
            if (!response.ok) {
                throw new Error('Не вдалося отримати дані про користувачів');
            }
            const users: User[] = await response.json();
            return users;
        } catch (error: unknown) {
            console.error('Помилка при отриманні користувачів:', error);
            return [];
        }
    }

    function calculateDaysBetweenDates(dateFrom: string | null, dateTo: string | null): number {
        if (!dateFrom || !dateTo) return 0;

        const startDate: Date = new Date(dateFrom);
        const endDate: Date = new Date(dateTo);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 0;

        const diffTime: number = endDate.getTime() - startDate.getTime();
        const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays > 0 ? diffDays : 0;
    }

    function formatDate(dateStr: string | null): string {
        if (!dateStr) return 'невідомо';
        const date: Date = new Date(dateStr);
        if (isNaN(date.getTime())) return 'невідомо';
        const day: string = date.getDate().toString().padStart(2, '0');
        const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
        const year: string = date.getFullYear().toString();
        return `${day}.${month}.${year}`;
    }

    function filterWarehouses(warehouses: Warehouse[]): Warehouse[] {
        return warehouses.filter((warehouse: Warehouse) => {
            if (filters.type.length > 0) {
                const typeMatch: boolean = filters.type.some((type: string) => {
                    if (type === 'ordinary') return warehouse.TypeName.toLowerCase().includes('звичайний');
                    if (type === 'refrigerated') return warehouse.TypeName.toLowerCase().includes('холодильний');
                    return false;
                });
                if (!typeMatch) return false;
            }

            if (filters.size.length > 0) {
                const sizeMatch: boolean = filters.size.some((size: string) => {
                    const sizeNum: number = parseInt(warehouse.SizeName, 10);
                    if (size === 'small') return sizeNum >= 1 && sizeNum <= 10;
                    if (size === 'medium') return sizeNum > 10 && sizeNum <= 100;
                    if (size === 'large') return sizeNum > 100 && sizeNum <= 1000;
                    if (size === 'extra-large') return sizeNum > 1000;
                    return false;
                });
                if (!sizeMatch) return false;
            }

            if (filters.temperature.length > 0) {
                const tempMatch: boolean = filters.temperature.some((temp: string) => {
                    const tempNum: number = parseInt(warehouse.TemperatureName, 10);
                    if (temp === 'standard') return tempNum >= 5 && tempNum <= 25;
                    if (temp === 'cool') return tempNum >= 0 && tempNum <= 5;
                    if (temp === 'frozen') return tempNum <= -18;
                    return false;
                });
                if (!tempMatch) return false;
            }

            if (filters.humidity.length > 0) {
                const humidityMatch: boolean = filters.humidity.some((humidity: string) => {
                    const humidityNum: number = warehouse.Humidity;
                    if (humidity === 'standard') return humidityNum >= 40 && humidityNum <= 60;
                    if (humidity === 'low') return humidityNum < 40;
                    if (humidity === 'high') return humidityNum > 60;
                    return false;
                });
                if (!humidityMatch) return false;
            }

            if (filters.ventilation.length > 0) {
                const ventilationMatch: boolean = filters.ventilation.some((vent: string) => {
                    if (vent === 'ventilated') return warehouse.Ventilation === 1;
                    if (vent === 'non-ventilated') return warehouse.Ventilation === 0;
                    return false;
                });
                if (!ventilationMatch) return false;
            }

            if (filters.city.length > 0) {
                const cityMatch: boolean = filters.city.some((city: string) => {
                    const cityInUkrainian: string = cityMapping[city] || city;
                    return warehouse.CityName.toLowerCase() === cityInUkrainian.toLowerCase();
                });
                if (!cityMatch) return false;
            }

            if (filters.dateFrom && filters.dateTo) {
                const dateFrom: Date = new Date(filters.dateFrom);
                const dateTo: Date = new Date(filters.dateTo);

                const isBooked: boolean = allBookings.some((booking: Booking) => {
                    if (booking.IdWarehouse !== warehouse.IdWarehouse) return false;

                    const bookingStart: Date = new Date(booking.StartDate);
                    const bookingEnd: Date = new Date(booking.EndDate);

                    return (
                        (dateFrom >= bookingStart && dateFrom <= bookingEnd) ||
                        (dateTo >= bookingStart && dateTo <= bookingEnd) ||
                        (dateFrom <= bookingStart && dateTo >= bookingEnd)
                    );
                });

                if (isBooked) return false;
            }

            return true;
        });
    }

    async function renderWarehouses(): Promise<void> {
        if (!warehouseContainer) {
            console.error('Контейнер для складів не знайдено');
            return;
        }

        if (allWarehouses.length === 0) {
            allWarehouses = await fetchWarehouses();
        }

        const filteredWarehouses: Warehouse[] = filterWarehouses(allWarehouses);
        warehouseContainer.innerHTML = '';
        filteredWarehouses.forEach((warehouse: Warehouse) => {
            const card: HTMLDivElement = document.createElement('div');
            card.classList.add('warehouse-card');
            card.innerHTML = `
                <div class="warehouse-image">
                    <img src="/warehouse.png" alt="Зображення складу">
                </div>
                <div class="warehouse-info">
                    <h3>${warehouse.TypeName || 'Невідомо'}</h3>
                    <p>${warehouse.SizeName || 'Невідомо'}</p>
                    <p>${warehouse.PrisePerDay || 0} грн за добу</p>
                </div>
                <button class="book-button" data-warehouse-id="${warehouse.IdWarehouse}">Забронювати!</button>
            `;
            warehouseContainer.appendChild(card);
        });

        const bookButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.book-button');
        bookButtons.forEach((button: HTMLElement) => {
            button.addEventListener('click', openModal);
        });
    }

    async function openModal(event: Event): Promise<void> {
        const target: HTMLElement = event.target as HTMLElement;
        const warehouseId: string | null = target.getAttribute('data-warehouse-id');

        if (!warehouseId) {
            console.error('ID складу не знайдено');
            return;
        }

        currentWarehouseId = parseInt(warehouseId); // Зберігаємо IdWarehouse

        try {
            const response: Response = await fetch(`http://localhost:5000/api/warehouse/${warehouseId}`);
            if (!response.ok) {
                throw new Error('Не вдалося отримати дані про склад');
            }
            const warehouseData: Warehouse | Warehouse[] = await response.json();
            console.log('Отримані дані складу:', warehouseData);

            const warehouse: Warehouse = Array.isArray(warehouseData) ? warehouseData[0] : warehouseData;

            if (warehouse && modal) {
                const modalWarehouseType: HTMLElement | null = document.getElementById('modalWarehouseType');
                const modalPrice: HTMLElement | null = document.getElementById('modalPrice');
                const modalType: HTMLElement | null = document.getElementById('modalType');
                const modalSize: HTMLElement | null = document.getElementById('modalSize');
                const modalTemperature: HTMLElement | null = document.getElementById('modalTemperature');
                const modalHumidity: HTMLElement | null = document.getElementById('modalHumidity');
                const modalCity: HTMLElement | null = document.getElementById('modalCity');
                const modalAddress: HTMLElement | null = document.getElementById('modalAddress');
                const modalDates: HTMLElement | null = document.getElementById('modalDates');

                const days: number = calculateDaysBetweenDates(filters.dateFrom, filters.dateTo);
                const totalPrice: number = days > 0 ? warehouse.PrisePerDay * days : warehouse.PrisePerDay;

                if (modalWarehouseType) modalWarehouseType.textContent = warehouse.TypeName || 'Невідомо';
                if (modalPrice) {
                    modalPrice.textContent = days > 0 
                        ? `${totalPrice} грн за ${days} днів` 
                        : `${warehouse.PrisePerDay || 0} грн за добу (вкажіть період у фільтрах)`;
                }
                if (modalType) modalType.textContent = `Тип складу: ${warehouse.TypeName || 'Невідомо'}`;
                if (modalSize) modalSize.textContent = `Розмір: ${warehouse.SizeName || 'Невідомо'}`;
                if (modalTemperature) modalTemperature.textContent = `Температура: ${warehouse.TemperatureName || 'Невідомо'}`;
                if (modalHumidity) modalHumidity.textContent = `Вологість: ${warehouse.Humidity || 'Невідомо'}`;
                if (modalCity) modalCity.textContent = `Місце: ${warehouse.CityName || 'Невідомо'}`;
                if (modalAddress) modalAddress.textContent = `Адреса: ${warehouse.Address || 'Невідомо'}`;
                if (modalDates) {
                    const formattedDateFrom: string = formatDate(filters.dateFrom);
                    const formattedDateTo: string = formatDate(filters.dateTo);
                    modalDates.textContent = `Дата: Від ${formattedDateFrom} до ${formattedDateTo}`;
                }

                modal.style.display = 'flex';
            } else {
                console.error('Дані про склад відсутні або modal не знайдено');
            }
        } catch (error: unknown) {
            console.error('Помилка при отриманні даних складу:', error);
        }
    }

    async function createBooking(): Promise<void> {
        if (!currentWarehouseId) {
            console.error('ID складу не визначено');
            return;
        }

        if (!filters.dateFrom || !filters.dateTo) {
            console.error('Дати бронювання не вказані');
            return;
        }

        const fullNameInput: HTMLInputElement | null = document.querySelector('#clientFullName');
        const emailInput: HTMLInputElement | null = document.querySelector('#clientEmail');
        const phoneInput: HTMLInputElement | null = document.querySelector('#clientPhone');

        if (!fullNameInput || !emailInput || !phoneInput) {
            console.error('Поля для введення даних клієнта не знайдені');
            return;
        }

        const fullName: string = fullNameInput.value.trim();
        const email: string = emailInput.value.trim();
        const phone: string = phoneInput.value.trim();

        if (!fullName || !email || !phone) {
            console.error('Усі поля клієнта мають бути заповнені');
            return;
        }

        try {
            const users: User[] = await fetchUsers();
            const maxIdClient: number = users.length > 0 
                ? Math.max(...users.map(user => user.IdClient)) 
                : 0;
            const newIdClient: number = maxIdClient + 1;

            const newUser: User = {
                IdClient: newIdClient,
                FullName: fullName,
                Email: email,
                Phone: phone,
            };

            const userResponse: Response = await fetch('http://localhost:5000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!userResponse.ok) {
                throw new Error('Не вдалося створити користувача');
            }

            const bookings: Booking[] = await fetchBookings();
            const maxIdBooking: number = bookings.length > 0 
                ? Math.max(...bookings.map(booking => booking.IdBooking)) 
                : 0;
            const newIdBooking: number = maxIdBooking + 1;

            const days: number = calculateDaysBetweenDates(filters.dateFrom, filters.dateTo);
            const warehouse: Warehouse | undefined = allWarehouses.find(w => w.IdWarehouse === currentWarehouseId);
            if (!warehouse) {
                throw new Error('Склад не знайдено');
            }
            const totalPrice: number = days > 0 ? warehouse.PrisePerDay * days : warehouse.PrisePerDay;

            const newBooking: Booking = {
                IdBooking: newIdBooking,
                IdWarehouse: currentWarehouseId,
                IdClient: newIdClient,
                StartDate: filters.dateFrom,
                EndDate: filters.dateTo,
                BookingStatus: 'Confirmed',
                Prise: totalPrice,
                PaymentStatus: 'Pending', 
            };

            const bookingResponse: Response = await fetch('http://localhost:5000/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBooking),
            });

            if (!bookingResponse.ok) {
                throw new Error('Не вдалося створити бронювання');
            }

            allBookings = await fetchBookings();

            closeModal();
            showSuccessNotification();
        } catch (error: unknown) {
            console.error('Помилка при створенні бронювання:', error);
        }
    }

    function closeModal(): void {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function showSuccessNotification(): void {
        if (Notification.permission === "granted") {
            new Notification("Бронювання складу", {
                body: "Вітаємо! Ви успішно забронювали склад.",
                icon: "warehouse.png"
            });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission: string) => {
                if (permission === "granted") {
                    new Notification("Бронювання складу", {
                        body: "Вітаємо! Ви успішно забронювали склад.",
                        icon: "warehouse.png"
                    });
                }
            });
        }
    }

    function setupFilters(): void {
        const typeCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="type"]');
        const sizeCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="size"]');
        const temperatureCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="temperature"]');
        const humidityCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="humidity"]');
        const ventilationCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="ventilation"]');
        const cityCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="city"]');
        const dateFromInput: HTMLInputElement | null = document.querySelector('input[name="date-from"]');
        const dateToInput: HTMLInputElement | null = document.querySelector('input[name="date-to"]');

        const updateFilter = (checkboxes: NodeListOf<HTMLInputElement>, filterKey: keyof Filters) => {
            checkboxes.forEach((checkbox: HTMLInputElement) => {
                checkbox.addEventListener('change', () => {
                    const selectedValues: string[] = Array.from(checkboxes)
                        .filter((cb: HTMLInputElement) => cb.checked)
                        .map((cb: HTMLInputElement) => cb.value);
                    (filters[filterKey] as string[]) = selectedValues;
                    renderWarehouses();
                });
            });
        };

        updateFilter(typeCheckboxes, 'type');
        updateFilter(sizeCheckboxes, 'size');
        updateFilter(temperatureCheckboxes, 'temperature');
        updateFilter(humidityCheckboxes, 'humidity');
        updateFilter(ventilationCheckboxes, 'ventilation');
        updateFilter(cityCheckboxes, 'city');

        if (dateFromInput) {
            dateFromInput.addEventListener('change', () => {
                filters.dateFrom = dateFromInput.value || null;
                renderWarehouses();
            });
        }

        if (dateToInput) {
            dateToInput.addEventListener('change', () => {
                filters.dateTo = dateToInput.value || null;
                renderWarehouses();
            });
        }
    }

    allBookings = await fetchBookings();
    renderWarehouses();
    setupFilters();

    if (submitButton) {
        submitButton.addEventListener('click', createBooking);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    window.onclick = (event: MouseEvent) => {
        if (event.target === modal) {
            closeModal();
        }
    };

    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then((permission: string) => {
            if (permission === "granted") {
                console.log("Дозвіл на сповіщення отримано");
            }
        });
    }
});