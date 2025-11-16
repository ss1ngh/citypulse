
const cityData = {
    weather: {
        temperature: 22,
        condition: 'Partly Cloudy',
        icon: 'cloud-sun',
        aqi: 45,
        aqiStatus: 'Good',
        aqiColor: 'success',
        humidity: 65,
        windSpeed: 12,
        lastUpdated: '2025-11-16T14:30:00Z'
    },
    events: [
        {
            id: 1,
            title: "Farmer's Market",
            location: "City Hall",
            date: "2025-11-18",
            time: "09:00",
            description: "Weekly farmer's market with local produce and crafts."
        },
        {
            id: 2,
            title: "Public Library Book Fair",
            location: "Main Library",
            date: "2025-11-20",
            time: "10:00",
            description: "Annual book fair with local authors and book signings."
        },
        {
            id: 3,
            title: "Community Cleanup",
            location: "Riverside Park",
            date: "2025-11-22",
            time: "08:00",
            description: "Help keep our city clean! Gloves and bags provided."
        },
        {
            id: 4,
            title: "Winter Festival",
            location: "City Center Plaza",
            date: "2025-11-25",
            time: "16:00",
            description: "Annual winter festival with ice sculptures and holiday market."
        }
    ],
    traffic: {
        density: 68,
        status: 'Moderate',
        statusColor: 'warning',
        incidents: 3,
        averageSpeed: 32
    },
    alerts: [
        {
            id: 1,
            title: 'Major Accident on Highway 101',
            category: 'accident',
            severity: 'high',
            date: '2025-11-16',
            description: 'Multi-vehicle collision on northbound Highway 101 near exit 42. Expect significant delays. Emergency services on scene.',
            location: 'Highway 101 North, near Exit 42',
            status: 'Active',
            lastUpdated: '2025-11-16T15:20:00Z'
        },
        {
            id: 2,
            title: 'Heavy Wind Warning',
            category: 'weather',
            severity: 'high',
            date: '2025-11-16',
            description: 'Winds up to 45 mph expected this afternoon. Secure outdoor objects and use caution when driving high-profile vehicles.',
            location: 'Citywide',
            status: 'In Effect',
            expires: '2025-11-16T20:00:00Z'
        },
        {
            id: 3,
            title: 'Severe Water Logging',
            category: 'flood',
            severity: 'high',
            date: '2025-11-16',
            description: 'Heavy rainfall has caused severe water logging in downtown area. Avoid low-lying streets and underpasses.',
            location: 'Downtown District',
            affectedAreas: ['Main St', 'Riverside Dr', '5th Avenue'],
            status: 'Ongoing',
            lastUpdated: '2025-11-16T14:45:00Z'
        },
        {
            id: 4,
            title: 'Major Traffic Jam - City Center',
            category: 'traffic',
            severity: 'high',
            date: '2025-11-16',
            description: 'Heavy congestion reported around City Center due to earlier accident. Expect delays of 30+ minutes.',
            location: 'City Center Ring Road',
            delay: '30+ minutes',
            status: 'Clearing',
            lastUpdated: '2025-11-16T15:10:00Z'
        },
        {
            id: 5,
            title: 'Power Outage - North District',
            category: 'utilities',
            severity: 'medium',
            date: '2025-11-16',
            description: 'Unexpected power outage affecting approximately 500 homes in the North District. Crews are working to restore power.',
            location: 'North District',
            affectedAreas: ['Pine St', 'Oak Ave', 'Maple Dr'],
            status: 'Under Investigation',
            estimatedRestoration: '2025-11-16T18:30:00Z'
        },
        {
            id: 6,
            title: 'Public Transport Disruption',
            category: 'transport',
            severity: 'medium',
            date: '2025-11-16',
            description: 'Signal failure at Central Station causing delays on Red and Blue lines. Alternative transportation recommended.',
            affectedLines: ['Red Line', 'Blue Line'],
            status: 'Ongoing',
            lastUpdated: '2025-11-16T14:30:00Z'
        }
    ],
    cityZones: [
        {
            id: 'central-park',
            name: 'Central Park',
            type: 'park',
            description: 'The largest public park in the city, featuring walking trails, playgrounds, and open green spaces.',
            contact: 'parks@citypulse.gov',
            hours: '6:00 AM - 10:00 PM',
            facilities: ['Playground', 'Restrooms', 'Picnic Areas', 'Walking Trails']
        },
        {
            id: 'city-hospital',
            name: 'City General Hospital',
            type: 'hospital',
            description: '24/7 emergency medical services and specialized healthcare facilities.',
            contact: 'emergency@cityhospital.org',
            phone: '(555) 123-4567',
            emergency: true
        },
        {
            id: 'metro-mall',
            name: 'Metro Shopping Mall',
            type: 'mall',
            description: 'Premier shopping destination with over 200 stores, restaurants, and entertainment options.',
            contact: 'info@metromall.com',
            hours: '10:00 AM - 9:00 PM',
            parking: true
        },
        {
            id: 'tech-park',
            name: 'Innovation Tech Park',
            type: 'industrial',
            description: 'Business and technology hub housing leading tech companies and startups.',
            contact: 'contact@techpark.org',
            hours: '8:00 AM - 8:00 PM',
            facilities: ['Coworking Spaces', 'Conference Rooms', 'Cafeteria']
        }
    ]
};

const pageContent = document.getElementById('page-content');
const navItems = document.querySelectorAll('.nav-item');
let currentPage = 'dashboard';

function init() {
    setupEventListeners();
    
    loadPage(currentPage);
    
    updateClock();
    setInterval(updateClock, 1000);
}

function setupEventListeners() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            if (page && page !== currentPage) {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                currentPage = page;
                loadPage(page);
            }
        });
    });

    document.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (card) {
            e.preventDefault();
            const cardType = card.getAttribute('data-card-type');
            if (cardType) {
                showCardDetails(cardType);
            }
        }
    });

    document.addEventListener('click', (e) => {
        const cardPopup = document.getElementById('card-popup');
        const alertPopup = document.getElementById('alert-popup');
        
        if (e.target === cardPopup) {
            closePopup();
        }
        if (e.target === alertPopup) {
            closeAlertPopup();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
            closeAlertPopup();
        }
    });

    function closeAlertPopup() {
        const popup = document.getElementById('alert-popup');
        if (popup) {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('.popup-close') || e.target.classList.contains('popup-overlay')) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
    
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'feedback-form') {
            e.preventDefault();
            handleFeedbackSubmit(e.target);
        }
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            const category = e.target.getAttribute('data-category');
            filterAlerts(category);
            
            // Update active filter
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });
}

function loadPage(page) {
    // Clear any existing modals
    const existingModal = document.querySelector('.location-modal');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }

    // Load the requested page
    switch (page) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'map':
            renderMapPage();
            // Initialize map markers after a small delay to ensure DOM is ready
            setTimeout(initMapMarkers, 100);
            break;
        case 'alerts':
            renderAlertsPage();
            break;
        case 'feedback':
            renderFeedbackPage();
            break;
        default:
            renderDashboard();
    }
    
    // Update active navigation item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
}

function renderDashboard() {
    const weather = cityData.weather;
    const traffic = cityData.traffic;
    
    const html = `
        <div class="mb-6">
            <div id="current-time" class="text-lg font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"></div>
        </div>
        
        <div class="dashboard-grid">
            <!-- Weather Card -->
            <div class="card weather-card" data-card-type="weather">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-cloud-sun text-blue-500 mr-2"></i>
                        Weather & Air Quality
                    </h2>
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${getAqiBadgeClass(weather.aqi)}">
                        AQI: ${weather.aqi} (${weather.aqiStatus})
                    </span>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-5xl font-bold">${weather.temperature}°C</div>
                    <div class="text-right">
                        <div class="text-3xl"><i class="fas fa-${weather.icon}"></i></div>
                        <div>${weather.condition}</div>
                        <div class="text-sm text-gray-400">Humidity: ${weather.humidity}%</div>
                        <div class="text-sm text-gray-400">Wind: ${weather.windSpeed} km/h</div>
                    </div>
                </div>
            </div>
            
            <!-- Traffic Card -->
            <div class="card relative" data-card-type="traffic">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-traffic-light text-blue-500 mr-2"></i>
                        Traffic Status
                    </h2>
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${getTrafficBadgeClass(traffic.status.toLowerCase())}">
                        ${traffic.status}
                    </span>
                </div>
                <div>
                    <div class="mb-2 flex justify-between text-sm">
                        <span>Traffic Flow</span>
                        <span>${traffic.density}%</span>
                    </div>
                    <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-${traffic.statusColor} rounded-full" style="width: ${traffic.density}%"></div>
                    </div>
                    <div class="mt-4 flex justify-between items-start">
                        <div class="flex-1">
                            <div class="text-sm text-gray-400">Incidents</div>
                            <div class="text-lg font-bold">${traffic.incidents}</div>
                        </div>
                        <div class="flex-1 text-right">
                            <div class="text-sm text-gray-400">Avg. Speed</div>
                            <div class="text-lg font-bold">${traffic.averageSpeed} km/h</div>
                        </div>
                    </div>
                    ${traffic.incidents > 0 ? `
                        <div class="mt-4 pt-3 border-t border-gray-100">
                            <div class="flex items-center text-yellow-600 text-sm font-medium">
                                <i class="fas fa-exclamation-triangle mr-2" style="color: #ef4444 !important;"></i>
                                <span>1 major accident reported - Expect delays on Main Street</span>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- Energy Consumption Card -->
            <div class="card" data-card-type="energy">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-bolt text-blue-500 mr-2"></i>
                        Energy Usage
                    </h2>
                    <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        <i class="fas fa-check-circle mr-1"></i> Optimal
                    </span>
                </div>
                <div>
                    <div class="text-center py-4">
                        <div class="inline-block relative" style="width: 180px; height: 100px;">
                            <svg viewBox="0 0 200 100" class="w-full h-full">
                                <!-- Grid lines -->
                                <line x1="20" y1="80" x2="180" y2="80" stroke="#334155" stroke-width="1" />
                                <line x1="20" y1="60" x2="180" y2="60" stroke="#334155" stroke-width="1" stroke-dasharray="2,2" />
                                <line x1="20" y1="40" x2="180" y2="40" stroke="#334155" stroke-width="1" stroke-dasharray="2,2" />
                                <line x1="20" y1="20" x2="180" y2="20" stroke="#334155" stroke-width="1" stroke-dasharray="2,2" />
                                
                                <!-- Data line -->
                                <polyline 
                                    points="20,80 40,60 60,75 80,40 100,60 120,30 140,50 160,20 180,40" 
                                    fill="none" 
                                    stroke="#0ea5e9" 
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                
                                <!-- Data points -->
                                <circle cx="20" cy="80" r="3" fill="#0ea5e9" />
                                <circle cx="40" cy="60" r="3" fill="#0ea5e9" />
                                <circle cx="60" cy="75" r="3" fill="#0ea5e9" />
                                <circle cx="80" cy="40" r="3" fill="#0ea5e9" />
                                <circle cx="100" cy="60" r="3" fill="#0ea5e9" />
                                <circle cx="120" cy="30" r="3" fill="#0ea5e9" />
                                <circle cx="140" cy="50" r="3" fill="#0ea5e9" />
                                <circle cx="160" cy="20" r="3" fill="#0ea5e9" />
                                <circle cx="180" cy="40" r="3" fill="#0ea5e9" />
                            </svg>
                        </div>
                    </div>
                    <div class="flex justify-between p-3 text-sm">
                        <div class="bg-gray-50 p-2 rounded text-center w-24">
                            <div class="text-gray-500">Current</div>
                            <div class="font-medium">1,245 <span class="text-xs text-gray-400">kW</span></div>
                        </div>
                        <div class="bg-green-50 p-2 rounded text-center w-28">
                            <div class="text-green-500">Savings</div>
                            <div class="font-medium text-green-600">
                                <i class="fas fa-arrow-down mr-1"></i>12%
                                <span class="text-xs text-green-400 block">vs yesterday</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; width: 100%; margin-top: 1.5rem; align-items: stretch;">
            <!-- Recent Alerts Section -->
            <div class="card" style="flex: 1; min-width: 300px; display: flex; flex-direction: column; height: 100%;">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
                        Recent Alerts
                    </h2>
                </div>
                <div class="p-4 flex-1">
                    
                    <div class="space-y-4">
                        ${(() => {
                            const recentAlerts = [...cityData.alerts]
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .slice(0, 4);
                            
                            if (recentAlerts.length === 0) {
                                return `
                                    <div class="text-center py-6 text-gray-400">
                                        <i class="fas fa-inbox text-3xl mb-2.5"></i>
                                        <p class="text-sm">No recent alerts</p>
                                    </div>
                                `;
                            }
                            
                            return recentAlerts.map(alert => {
                                const timeString = new Date(alert.date).toLocaleTimeString('en-US', { 
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    hour12: true 
                                });
                                
                                return `
                                <div class="event-item cursor-pointer"
                                     onclick="showAlertDetails('${alert.id}')">
                                    <div class="mr-3">
                                        <div class="w-8 h-8 rounded-full ${getAlertIconColor(alert.severity).replace('text-', 'bg-')} bg-opacity-10 flex items-center justify-center flex-shrink-0">
                                            <i class="fas ${getAlertIcon(alert.category)} ${getAlertIconColor(alert.severity)} text-sm"></i>
                                        </div>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center justify-between">
                                            <h2 class="alert-title flex-1">
                                                <span class="mr-1.5">•</span> ${alert.title}
                                            </h2>
                                            <span class="text-xs text-gray-500 alert-category whitespace-nowrap ml-2">
                                                ${alert.category.charAt(0).toUpperCase() + alert.category.slice(1)}
                                            </span>
                                        </div>
                                        <p class="text-sm text-gray-500 truncate mt-1">${alert.description}</p>
                                    </div>
                                </div>`;
                            }).join('');
                        })()}
                    </div>
                </div>
            </div>

            <!-- Upcoming Events Section -->
            <div class="card" style="flex: 1; min-width: 300px; display: flex; flex-direction: column; height: 100%;">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-calendar-alt text-blue-500 mr-2"></i>
                        Upcoming Events
                    </h2>
                </div>
                <div class="p-4 flex-1">
                    <div class="space-y-3">
                        ${(() => {
                            // Get the upcoming events
                            const upcomingEvents = [...cityData.events]
                                .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time))
                                .filter(event => new Date(event.date + 'T' + event.time) >= new Date())
                                .slice(0, 4);
                            
                            if (upcomingEvents.length === 0) {
                                return `
                                    <div class="flex flex-col items-center justify-center h-full py-6 text-gray-400">
                                        <i class="far fa-calendar-check text-3xl mb-3"></i>
                                        <p class="text-sm">No upcoming events</p>
                                    </div>
                                `;
                            }
                            
                            return upcomingEvents.map(event => {
                                const eventDate = new Date(event.date);
                                const day = eventDate.toLocaleDateString('en-US', { day: 'numeric' });
                                const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
                                const formattedTime = new Date(`2000-01-01T${event.time}`).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                }).replace(/\s/g, '').toLowerCase();
                                
                                return `
                                <div class="event-item">
                                    <div class="event-time">
                                        <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-2">
                                            <i class="fas fa-calendar-day text-blue-500 text-xs"></i>
                                        </div>
                                        <span>${eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        <span>${formattedTime}</span>
                                    </div>
                                    <div class="event-details">
                                        <div class="event-content">
                                            <div class="flex justify-between items-baseline">
                                                <span class="event-title">${event.title}</span>
                                                <span class="event-location">${event.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                            }).join('');
                        })()}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    pageContent.innerHTML = html;
    updateClock();
}

function renderAlertsPage() {
    const html = `
        </div>
        
        <div class="card p-6">
            <div class="mb-8">
                <h2 class="text-lg font-semibold text-gray-200 mb-10">Filter Alerts</h2>
                <div class="flex flex-wrap gap-x-6 gap-y-4">
                    <button class="filter-btn active" data-category="all">All Alerts</button>
                    <button class="filter-btn" data-category="traffic">Traffic</button>
                    <button class="filter-btn" data-category="health">Health</button>
                    <button class="filter-btn" data-category="weather">Weather</button>
                    <button class="filter-btn" data-category="public">Public Notices</button>
                    <button class="filter-btn" data-category="utilities">Utilities</button>
                </div>
            </div>
            
            <div id="alerts-container" class="space-y-10">
                ${renderAlerts(cityData.alerts)}
            </div>
        </div>
    `;
    
    pageContent.innerHTML = html;
}

function renderAlerts(alerts) {
    if (alerts.length === 0) {
        return `
            <div class="text-center py-8 text-gray-400">
                <i class="fas fa-inbox text-4xl mb-2"></i>
                <p>No alerts to display</p>
            </div>
        `;
    }
    
    return alerts.map(alert => `
        <div class="p-4 bg-gray-800 rounded-lg border-l-4 ${getAlertBorderClass(alert.severity)} transition-all duration-300 hover:bg-gray-750" 
             data-category="${alert.category}">
            <div class="flex items-start justify-between">
                <div class="flex items-start flex-1">
                    <div class="mr-4 text-2xl text-${getAlertIconColor(alert.severity)}">
                        <i class="fas ${getAlertIcon(alert.category)}"></i>
                    </div>
                    <div class="flex-1 space-y-2">
                        <h3 class="text-lg font-medium">${alert.title}</h3>
                        <div class="flex items-center space-x-3 text-sm text-gray-400">
                            <span>${formatDate(alert.date)}</span>
                            <span class="w-1 h-1 rounded-full bg-gray-500 mx-1"></span>
                        </div>
                        <p class="text-gray-300 text-sm pt-1">${alert.description}</p>
                    </div>
                </div>
                <div class="flex items-center ml-4">
                    <div class="flex flex-col items-end space-y-1">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            alert.severity === 'high' ? 'bg-red-500/10 text-red-400' : 
                            alert.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-blue-500/10 text-blue-400'
                        }">
                            <span class="w-2 h-2 rounded-full mr-2 ${
                                alert.severity === 'high' ? 'bg-red-500' : 
                                alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                            }"></span>
                            ${alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function filterAlerts(category) {
    const alertsContainer = document.getElementById('alerts-container');
    
    if (category === 'all') {
        alertsContainer.innerHTML = renderAlerts(cityData.alerts);
        return;
    }
    
    const filteredAlerts = cityData.alerts.filter(alert => alert.category === category);
    alertsContainer.innerHTML = renderAlerts(filteredAlerts);
}

const mapLocations = [
    {
        id: 'farmers-market',
        name: 'Farmers Market',
        type: 'market',
        position: { x: 10, y: 70 },
        icon: 'shopping-basket',
        description: 'Local farmers market offering fresh produce, artisanal goods, and handmade crafts.',
        hours: 'Wed: 8:00 AM - 2:00 PM, Sat: 7:00 AM - 3:00 PM',
        contact: '555-0707',
        services: ['Fresh Produce', 'Local Vendors', 'Organic Options', 'Food Trucks', 'Live Music']
    },
    {
        id: 'main-library',
        name: 'Public Library',
        type: 'library',
        position: { x: 80, y: 70 },
        icon: 'book',
        description: 'The main public library with a vast collection of books, digital media, and community resources.',
        hours: 'Mon-Thu: 9:00 AM - 8:00 PM, Fri-Sat: 9:00 AM - 5:00 PM, Sun: 1:00 PM - 5:00 PM',
        contact: '555-0606',
        services: ['Book Lending', 'Computer Access', 'Study Rooms', 'Children\'s Section', 'Free Wi-Fi']
    },
    {
        id: 'hospital-1',
        name: 'City General Hospital',
        type: 'hospital',
        position: { x: 30, y: 48 },
        description: '24/7 emergency services and specialized medical care.',
        address: '123 Health St, CityPulse',
        phone: '+1 (555) 123-4567',
        hours: '24/7 Emergency Services',
        facilities: ['Emergency', 'Pharmacy', 'Pediatrics']
    },
    {
        id: 'school-1',
        name: 'City High School',
        type: 'school',
        position: { x: 50, y: 25 },
        description: 'A public high school with excellent academic programs.',
        address: '456 Education Ave, CityPulse',
        phone: '+1 (555) 987-6543',
        hours: '7:30 AM - 4:30 PM (Mon-Fri)',
        facilities: ['Library', 'Sports Field', 'Computer Lab']
    },
    {
        id: 'playground-1',
        name: 'Central Park Playground',
        type: 'playground',
        position: { x: 38, y: 67},
        description: 'A fun and safe playground for children of all ages.',
        address: '789 Park Lane, CityPulse',
        hours: '6:00 AM - 9:00 PM (Daily)',
        facilities: ['Swings', 'Slides', 'Basketball Court']
    },
    {
        id: 'airport-1',
        name: 'CityPulse International Airport',
        type: 'airport',
        position: { x: 85, y: 20 },
        description: 'International airport serving CityPulse and surrounding areas.',
        address: '1 Airport Way, CityPulse',
        phone: '+1 (555) 555-1234',
        hours: '4:00 AM - 11:00 PM (Daily)',
        facilities: ['Parking', 'Dining', 'Shopping', 'Rental Cars']
    },
    {
        id: 'hotel-1',
        name: 'Grand CityPulse Hotel',
        type: 'hotel',
        position: { x: 10, y: 30 },
        description: 'Luxury 5-star hotel with premium amenities and city views.',
        address: '101 Luxury Ave, CityPulse',
        phone: '+1 (555) 123-7890',
        hours: '24/7',
        facilities: ['Spa', 'Restaurant', 'Swimming Pool', 'Fitness Center'],
        rating: '★★★★★',
        price: '$$$$'
    },
    {
        id: 'restaurant-1',
        name: 'The Urban Fork',
        type: 'restaurant',
        position: { x: 60, y: 55 },
        description: 'Modern restaurant serving international cuisine with local ingredients.',
        address: '202 Foodie St, CityPulse',
        phone: '+1 (555) 987-1234',
        hours: '11:00 AM - 11:00 PM (Daily)',
        facilities: ['Outdoor Seating', 'Full Bar', 'Vegan Options'],
        cuisine: 'International',
        price: '$$$',
        rating: '4.5/5'
    },
    {
        id: 'accident-1',
        name: 'Traffic Accident Alert',
        type: 'accident',
        position: { x: 55, y: 80 },
        description: 'Vehicle collision reported on Main Street. Expect delays.',
        address: 'Intersection of Main St & 5th Ave, CityPulse',
        reported: new Date().toLocaleTimeString(),
        severity: 'High',
        status: 'Active',
        facilities: ['Police on Scene', 'Traffic Diversion', 'Emergency Services']
    }
];

const iconMap = {
    hospital: 'fa-hospital',
    library: 'fa-book',
    market: 'fa-shopping-basket',
    school: 'fa-graduation-cap',
    playground: 'fa-futbol',
    airport: 'fa-plane',
    hotel: 'fa-hotel',
    restaurant: 'fa-utensils',
    accident: 'fa-car-crash'
};

// Show location details in modal
function showLocationDetails(location) {
    const modal = document.createElement('div');
    modal.className = 'location-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <h2>${location.name}</h2>
            <p>${location.description}</p>
            
            <div class="location-info">
                <p><i class="fas fa-map-marker-alt"></i> ${location.address}</p>
                ${location.phone ? `<p><i class="fas fa-phone"></i> ${location.phone}</p>` : ''}
                <p><i class="fas fa-clock"></i> ${location.hours}</p>
                
                ${location.facilities && location.facilities.length ? `
                <div class="facilities">
                    <h3>Facilities:</h3>
                    <div class="facilities-list">
                        ${location.facilities.map(facility => 
                            `<span class="facility-tag">${facility}</span>`
                        ).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Close modal when clicking the X
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close when clicking outside the modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Initialize map markers
function initMapMarkers() {
    const mapMarkers = document.getElementById('map-markers');
    if (!mapMarkers) return;
    
    // Clear existing markers
    mapMarkers.innerHTML = '';
    
    // Add new markers
    mapLocations.forEach(location => {
        const marker = document.createElement('div');
        marker.className = `map-marker marker-${location.type}`;
        marker.dataset.id = location.id;
        marker.innerHTML = `
            <i class="fas ${iconMap[location.type] || 'fa-map-marker-alt'}"></i>
            <span class="marker-tooltip">${location.name}</span>
        `;
        
        // Position the marker
        marker.style.left = `${location.position.x}%`;
        marker.style.top = `${location.position.y}%`;
        
        // Add click event
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            showLocationDetails(location);
        });
        
        // Add to map
        mapMarkers.appendChild(marker);
    });
}

// Render Map Page
function renderMapPage() {
    const html = `
        <div class="card p-0 overflow-hidden" style="height: calc(100vh - 64px);">
            <div class="map-container">
                <div class="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md z-10 flex items-center">
                    <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                    <span class="text-sm text-gray-700">Click on a location to know more details</span>
                </div>
                <img src="assets/map.png" alt="City Map" id="city-map" class="city-map">
                <div id="map-markers" class="map-markers"></div>
            </div>
        </div>
    `;
    
    pageContent.innerHTML = html;
    
    // Add event listeners to zone elements
    document.querySelectorAll('.zone').forEach(zone => {
        zone.addEventListener('click', () => {
            const zoneId = zone.getAttribute('data-zone');
            const zoneData = cityData.cityZones.find(z => z.id === zoneId);
            if (zoneData) {
                showZoneDetails(zoneData);
            }
        });
        
        // Hover effects
        zone.addEventListener('mouseenter', () => {
            zone.classList.add('zone-hover');
        });
        
        zone.addEventListener('mouseleave', () => {
            zone.classList.remove('zone-hover');
        });
    });
    
    // Add modal close functionality
    const modal = document.getElementById('zone-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Show zone details in modal
function showZoneDetails(zone) {
    const modal = document.getElementById('zone-modal');
    const title = document.getElementById('zone-title');
    const details = document.getElementById('zone-details');
    
    if (!modal || !title || !details) return;
    
    // Set zone title
    title.textContent = zone.name;
    
    // Build zone details HTML
    let html = `
        <div class="mb-4">
            <p class="text-gray-300">${zone.description}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h4 class="text-sm font-semibold text-gray-400 mb-2">CONTACT</h4>
                <p><i class="fas fa-envelope mr-2 text-gray-400"></i> ${zone.contact}</p>
                ${zone.phone ? `<p class="mt-1"><i class="fas fa-phone-alt mr-2 text-gray-400"></i> ${zone.phone}</p>` : ''}
                
                ${zone.hours ? `
                    <div class="mt-4">
                        <h4 class="text-sm font-semibold text-gray-400 mb-2">HOURS</h4>
                        <p><i class="far fa-clock mr-2 text-gray-400"></i> ${zone.hours}</p>
                    </div>
                ` : ''}
            </div>
    `;
    
    // Add facilities if available
    if (zone.facilities && zone.facilities.length > 0) {
        html += `
            <div>
                <h4 class="text-sm font-semibold text-gray-400 mb-2">FACILITIES</h4>
                <ul class="space-y-1">
                    ${zone.facilities.map(facility => `
                        <li class="flex items-center">
                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                            <span>${facility}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    html += '</div>'; // Close grid
    
    // Emergency notice for hospitals
    if (zone.emergency) {
        html += `
            <div class="mt-4 p-3 bg-red-900 bg-opacity-30 border-l-4 border-red-500 rounded-r">
                <div class="flex">
                    <i class="fas fa-exclamation-triangle text-red-400 mt-1 mr-3"></i>
                    <div>
                        <h4 class="font-semibold">Emergency Services Available</h4>
                        <p class="text-sm text-gray-300">24/7 emergency care and ambulance services</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Parking info for malls
    if (zone.parking !== undefined) {
        html += `
            <div class="mt-4 p-3 bg-blue-900 bg-opacity-30 border-l-4 border-blue-500 rounded-r">
                <div class="flex">
                    <i class="fas fa-parking text-blue-400 mt-1 mr-3"></i>
                    <div>
                        <h4 class="font-semibold">${zone.parking ? 'Parking Available' : 'No Parking On Site'}</h4>
                        <p class="text-sm text-gray-300">${zone.parking ? 'Ample parking spaces available' : 'Please use public transportation'}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    details.innerHTML = html;
    modal.style.display = 'block';
}

// Render Feedback Page
function renderFeedbackPage() {
    const html = `
        <div class="max-w-3xl mx-auto">
        
        <div class="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            <div class="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                <p class="text-gray-600 mb-6">We'd love to hear your thoughts and suggestions</p>
                <form id="feedback-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <style>
                        .form-group {
                            margin-bottom: 0.5rem;
                        }
                        .form-group label {
                            display: block;
                            margin-bottom: 0.375rem;
                            font-weight: 500;
                            color: #374151;
                            font-size: 0.9375rem;
                        }
                        .form-input {
                            width: 100%;
                            padding: 0.75rem 1rem;
                            background-color: #ffffff;
                            border: 1px solid #d1d5db;
                            border-radius: 0.5rem;
                            color: #111827;
                            font-size: 0.9375rem;
                            transition: all 0.2s ease;
                            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                        }
                        .form-input:focus {
                            outline: none;
                            border-color: #3b82f6;
                            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                        }
                        .form-input::placeholder {
                            color: #9ca3af;
                        }
                        textarea.form-input {
                            min-height: 100px;
                            resize: vertical;
                            line-height: 1.5;
                        }
                        .btn-submit {
                            width: 100%;
                            padding: 0.875rem 1.5rem;
                            background-color: #3b82f6;
                            color: white;
                            font-weight: 600;
                            font-size: 1rem;
                            border: none;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            margin-top: 0.25rem;
                        }
                        .btn-submit:hover {
                            background-color: #2563eb;
                            transform: translateY(-1px);
                            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                        }
                        .btn-submit:active {
                            transform: translateY(0);
                        }
                        .required {
                            color: #ef4444;
                            margin-left: 2px;
                        }
                    </style>
                    
                        <div class="form-group">
                            <label for="name">Full Name <span class="required">*</span></label>
                            <input type="text" id="name" name="name" required 
                                   placeholder="John Doe"
                                   class="form-input">
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email Address <span class="required">*</span></label>
                            <input type="email" id="email" name="email" required
                                   placeholder="you@example.com"
                                   class="form-input">
                        </div>
                        
                        <div class="form-group">
                            <label for="location">Location</label>
                            <input type="text" id="location" name="location" 
                                   placeholder="Your city or neighborhood"
                                   class="form-input">
                        </div>
                        
                        <div class="form-group">
                            <label for="subject">Subject <span class="required">*</span></label>
                            <select id="subject" name="subject" class="form-input" required>
                                <option value="">Select a subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="feedback">Feedback</option>
                                <option value="report">Report an Issue</option>
                                <option value="suggestion">Suggestion</option>
                                <option value="complaint">Complaint</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Your Message <span class="required">*</span></label>
                        <textarea id="message" name="message" rows="4" required
                                  placeholder="Please provide details about your feedback..."
                                  class="form-input"></textarea>
                    </div>
                    
                    <div class="form-group flex items-center">
                        <input type="checkbox" id="newsletter" name="newsletter" 
                               class="mr-2 h-5 w-5 text-blue-600 rounded">
                        <label for="newsletter" class="text-sm text-gray-600">
                            Subscribe to our newsletter for updates and announcements
                        </label>
                    </div>
                    
                    <button type="submit" class="btn-submit">
                        <i class="fas fa-paper-plane mr-2"></i>
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
                                <i class="fas fa-phone-alt"></i>
                            </div>
                            <div class="contact-text">
                                <h3>Phone</h3>
                                <p>(555) 123-4567</p>
                                <p class="text-sm text-gray-500 mt-1">Mon-Fri, 9:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                        
                        <div class="contact-item">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="contact-text">
                                <h3>Address</h3>
                                <p>123 City Hall Plaza</p>
                                <p>CityPulse, CP 10001</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="contact-card">
                    <h2 class="text-xl font-semibold text-white mb-5">Connect With Us</h2>
                    <p class="text-gray-300 mb-6">Follow us on social media for the latest updates and announcements.</p>
                    
                    <div class="social-links">
                        <a href="#" class="social-link" aria-label="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="YouTube">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    pageContent.innerHTML = html;
    
    // Add form validation
    const form = document.getElementById('feedback-form');
    if (form) {
        form.addEventListener('submit', handleFeedbackSubmit);
    }
}

// Handle feedback form submission
function handleFeedbackSubmit(e) {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Get form data
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.trim() === '') {
        showError('name', 'Please enter your name');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showError('message', 'Please enter a message with at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        // In a real app, you would send the form data to a server here
        console.log('Form submitted:', data);
        
        // Show success message
        showToast('Thank you for your feedback! We will get back to you soon.');
        
        // Reset form
        form.reset();
    }
}

// Show error message for form field
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    let errorElement = field.nextElementSibling;
    
    // If the next element is not an error message, try to find it
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = field.parentElement.querySelector('.error-message');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    // Add error class to input
    field.classList.add('border-red-500');
    
    // Remove error class on input
    field.addEventListener('input', function() {
        this.classList.remove('border-red-500');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }, { once: true });
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    // Set message and type
    toast.textContent = message;
    toast.className = 'toast';
    toast.classList.add('show', type);
    
    // Hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Update clock
function updateClock() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    
    const dateTimeStr = now.toLocaleDateString('en-US', options);
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = dateTimeStr;
    }
}

// Format date to readable string
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper function to get alert icon
function getAlertIcon(category) {
    const icons = {
        traffic: 'traffic-light',
        health: 'heartbeat',
        weather: 'cloud-sun-rain',
        public: 'bullhorn',
        utilities: 'tools',
        security: 'shield-alt',
        environment: 'leaf',
        transportation: 'bus',
        default: 'info-circle'
    };
    
    return icons[category] || icons.default;
}

// Get appropriate icon for alert severity
function getAlertSeverityIcon(severity) {
    const icons = {
        critical: 'exclamation-triangle',
        high: 'exclamation-circle',
        medium: 'exclamation',
        low: 'info-circle',
        default: 'info-circle'
    };
    
    return icons[severity] || icons.default;
}

// Helper function to get alert badge class
function getAlertBadgeClass(severity) {
    const classes = {
        high: 'bg-red-900 bg-opacity-50 text-red-300',
        medium: 'bg-yellow-900 bg-opacity-50 text-yellow-300',
        low: 'bg-blue-900 bg-opacity-50 text-blue-300',
        default: 'bg-gray-700 text-gray-300'
    };
    
    return classes[severity] || classes.default;
}

// Helper function to get alert border class
function getAlertBorderClass(severity) {
    const classes = {
        high: 'border-red-500',
        medium: 'border-yellow-500',
        low: 'border-blue-500',
        default: 'border-gray-600'
    };
    
    return classes[severity] || classes.default;
}

// Helper function to get AQI badge class
function getAqiBadgeClass(aqi) {
    if (aqi <= 50) return 'bg-green-100 text-green-800';
    if (aqi <= 100) return 'bg-yellow-100 text-yellow-800';
    if (aqi <= 150) return 'bg-orange-100 text-orange-800';
    if (aqi <= 200) return 'bg-red-100 text-red-800';
    if (aqi <= 300) return 'bg-purple-100 text-purple-800';
    return 'bg-maroon-100 text-maroon-800';
}

// Helper function to get traffic badge class
function getTrafficBadgeClass(status) {
    const classes = {
        low: 'bg-green-100 text-green-800',
        moderate: 'bg-yellow-100 text-yellow-800',
        high: 'bg-orange-100 text-orange-800',
        heavy: 'bg-red-100 text-red-800',
        default: 'bg-gray-100 text-gray-800'
    };
    
    return classes[status.toLowerCase()] || classes.default;
}

// Show alert details in a popup
function showAlertDetails(alertId) {
    const alert = cityData.alerts.find(a => a.id === alertId);
    if (!alert) return;
    
    const popup = document.getElementById('alert-popup');
    const popupContent = document.getElementById('alert-popup-content');
    
    if (!popup || !popupContent) {
        console.error('Popup elements not found');
        return;
    }
    
    const html = `
        <div class="popup-header">
            <h2>
                <i class="fas ${getAlertIcon(alert.category)}" style="color: ${
                    alert.severity === 'high' ? '#ef4444' : 
                    alert.severity === 'medium' ? '#f59e0b' : '#3b82f6'
                }"></i>
                ${alert.title}
            </h2>
            <div class="border-b"></div>
        </div>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-500">Date & Time</div>
                <div>${new Date(alert.date).toLocaleString()}</div>
            </div>
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-500">Category</div>
                <span class="px-2 py-1 text-xs rounded-full ${getAlertBadgeClass(alert.severity)}">
                    ${alert.category.charAt(0).toUpperCase() + alert.category.slice(1)}
                </span>
            </div>
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-500">Severity</div>
                <span class="capitalize">${alert.severity}</span>
            </div>
            <div class="pt-2">
                <div class="text-sm text-gray-500 mb-2">Description</div>
                <p class="text-gray-700">${alert.description || 'No additional details available.'}</p>
            </div>
            ${alert.location ? `
                <div class="pt-2">
                    <div class="text-sm text-gray-500 mb-2">Location</div>
                    <p class="text-gray-700">${alert.location}</p>
                </div>
            ` : ''}
        </div>
    `;
    
    popupContent.innerHTML = html;
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Helper function to get alert icon color
function getAlertIconColor(severity) {
    const colors = {
        high: 'text-red-500',
        medium: 'text-yellow-500',
        low: 'text-blue-500',
        default: 'text-gray-500'
    };
    
    return colors[severity] || colors.default;
}

// Show card details in popup
function showCardDetails(cardType) {
    const popup = document.getElementById('card-popup');
    const popupContent = document.getElementById('popup-content');
    
    if (!popup || !popupContent) return;
    
    let content = '';
    
    switch(cardType) {
        case 'weather':
            const weather = cityData.weather;
            content = `
                <div class="popup-header">
                    <h2>
                        <i class="fas fa-cloud-sun"></i>
                        Weather Details
                    </h2>
                    <div class="border-b"></div>
                </div>
                <div class="space-y-6">
                    <div class="flex items-start justify-between">
                        <div class="space-y-2">
                            <div class="text-5xl font-bold text-gray-800">${weather.temperature}°C</div>
                            <div class="text-lg text-gray-600">${weather.condition}</div>
                        </div>
                        <div class="text-5xl text-blue-500">
                            <i class="fas fa-${weather.icon}"></i>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50 p-5 rounded-xl">
                            <div class="text-sm text-gray-500 mb-1">Humidity</div>
                            <div class="text-2xl font-semibold">${weather.humidity}%</div>
                        </div>
                        <div class="bg-blue-50 p-5 rounded-xl">
                            <div class="text-sm text-gray-500 mb-1">Wind Speed</div>
                            <div class="text-2xl font-semibold">${weather.windSpeed} km/h</div>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-gray-700">Air Quality Index (AQI)</span>
                            <span class="px-3 py-1.5 text-sm font-medium rounded-full ${getAqiBadgeClass(weather.aqi)}">
                                ${weather.aqi} (${weather.aqiStatus})
                            </span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2.5">
                            <div class="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                                 style="width: ${Math.min(weather.aqi, 100)}%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-gray-500">
                            <span>Good</span>
                            <span>Hazardous</span>
                        </div>
                    </div>
                    
                    <div class="mt-6 text-sm text-gray-600">
                        <p>Last updated: ${new Date(weather.lastUpdated).toLocaleString()}</p>
                    </div>
                </div>
            `;
            break;
            
        case 'traffic':
            const traffic = cityData.traffic;
            content = `
                <div class="popup-header">
                    <h2>
                        <i class="fas fa-traffic-light"></i>
                        Traffic Details
                    </h2>
                    <div class="border-b"></div>
                </div>
                <div class="space-y-6">
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-medium text-gray-700">Traffic Flow</span>
                            <span class="text-base font-semibold">${traffic.density}%</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2.5">
                            <div class="h-2.5 rounded-full ${getTrafficColorClass(traffic.density)} transition-all duration-500 ease-out" 
                                 style="width: ${traffic.density}%"></div>
                        </div>
                        <div class="text-sm text-gray-600 pt-1">
                            Status: <span class="font-medium">${traffic.status}</span>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50 p-5 rounded-xl">
                            <div class="text-sm text-gray-500 mb-1">Incidents Reported</div>
                            <div class="text-2xl font-bold text-gray-800">${traffic.incidents}</div>
                        </div>
                        <div class="bg-blue-50 p-5 rounded-xl">
                            <div class="text-sm text-gray-500 mb-1">Average Speed</div>
                            <div class="text-2xl font-bold text-gray-800">${traffic.averageSpeed} km/h</div>
                        </div>
                    </div>
                    
                    <div class="popup-message">
                        <h3><i class="fas fa-info-circle text-blue-500"></i> Traffic Tips</h3>
                        <ul>
                            <li class="flex items-start gap-3">
                                <i class="fas fa-info-circle text-blue-500 mt-0.5"></i>
                                <span>${getTrafficTip(traffic.density)}</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <i class="fas fa-clock text-blue-500 mt-0.5"></i>
                                <span>Best travel times: 10 AM - 3 PM, 7 PM - 6 AM</span>
                            </li>
                        </ul>
                    </div>
                </div>
            `;
            break;
            
        case 'energy':
            content = `
                <div class="popup-header">
                    <h2>
                        <i class="fas fa-bolt"></i>
                        Energy Usage Details
                    </h2>
                    <div class="border-b"></div>
                </div>
                <div class="space-y-6">
                    <div class="text-center space-y-2">
                        <div class="text-5xl font-bold text-gray-800">1,245 <span class="text-xl">kW</span></div>
                        <div class="text-green-500 font-medium inline-flex items-center justify-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                            <i class="fas fa-check-circle"></i>
                            <span>Consumption is optimal</span>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-medium text-gray-700">Daily Usage Trend</span>
                            <span class="text-xs text-blue-500">Last 24 hours</span>
                        </div>
                        <div class="h-40 p-4 bg-gray-50 rounded-xl">
                            <svg viewBox="0 0 400 120" class="w-full h-full">
                                <path d="M20,100 L60,70 L100,90 L140,50 L180,70 L220,30 L260,60 L300,20 L340,50 L380,10" 
                                      fill="none" 
                                      stroke="#3b82f6" 
                                      stroke-width="3" 
                                      stroke-linecap="round" 
                                      stroke-linejoin="round"
                                      class="drop-shadow-sm" />
                                <!-- Grid lines -->
                                <line x1="20" y1="20" x2="380" y2="20" stroke="#e5e7eb" stroke-width="1" />
                                <line x1="20" y1="60" x2="380" y2="60" stroke="#e5e7eb" stroke-width="1" />
                                <line x1="20" y1="100" x2="380" y2="100" stroke="#e5e7eb" stroke-width="1" />
                            </svg>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-4">
                        <div class="text-center bg-blue-50 p-4 rounded-xl">
                            <div class="text-sm text-gray-500 mb-1">Peak Hours</div>
                            <div class="font-semibold text-gray-800">5 PM - 9 PM</div>
                        </div>
                        <div class="text-center bg-blue-50 p-4 rounded-xl">
                            <div class="text-sm text-gray-500 mb-1">Off-Peak</div>
                            <div class="font-semibold text-gray-800">10 PM - 6 AM</div>
                        </div>
                        <div class="text-center bg-blue-50 p-4 rounded-xl">
                            <div class="text-sm text-gray-500 mb-1">Shoulder</div>
                            <div class="font-semibold text-gray-800">6 AM - 5 PM</div>
                        </div>
                    </div>
                    
                    <div class="popup-message">
                        <h3><i class="fas fa-lightbulb text-yellow-500"></i> Energy Saving Tips</h3>
                        <ul>
                            <li class="flex items-start gap-3">
                                <i class="fas fa-lightbulb text-yellow-500 mt-0.5"></i>
                                <span>Switch to LED bulbs to save up to 75% on lighting costs</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <i class="fas fa-thermometer-half text-blue-500 mt-0.5"></i>
                                <span>Set your thermostat 1°C lower to save on heating costs</span>
                            </li>
                        </ul>
                    </div>
                </div>
            `;
            break;
    }
    
    popupContent.innerHTML = content;
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close the popup
function closePopup() {
    const popup = document.getElementById('card-popup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Helper function to get traffic color class based on density
function getTrafficColorClass(density) {
    if (density < 30) return 'bg-green-500';
    if (density < 70) return 'bg-yellow-500';
    if (density < 90) return 'bg-orange-500';
    return 'bg-red-500';
}

// Helper function to get traffic tip based on density
function getTrafficTip(density) {
    if (density < 30) return 'Light traffic - Great time to travel!';
    if (density < 70) return 'Moderate traffic - Expect some delays';
    if (density < 90) return 'Heavy traffic - Consider alternative routes';
    return 'Severe traffic - Avoid if possible';
}

// Toggle profile dropdown
function toggleProfileDropdown() {
    const profile = document.getElementById('user-profile');
    profile.classList.toggle('active');
}

// Close dropdown when clicking outside
function closeDropdownOnClickOutside(element, callback) {
    document.addEventListener('click', (e) => {
        if (!element.contains(e.target)) {
            callback();
        }
    });
}

// Handle logout
function handleLogout() {
    // Add your logout logic here
    showToast('Successfully logged out', 'success');
    // Redirect to login page or home page after logout
    // window.location.href = 'login.html';
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Initialize profile dropdown
    const profileTrigger = document.querySelector('.profile-trigger');
    const profileDropdown = document.getElementById('profile-dropdown');
    const userProfile = document.getElementById('user-profile');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (profileTrigger && profileDropdown) {
        // Toggle dropdown when clicking the profile
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleProfileDropdown();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userProfile.contains(e.target)) {
                userProfile.classList.remove('active');
            }
        });
    }
    
    // Handle logout button click
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});
