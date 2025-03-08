document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const toggleSidebar = document.getElementById('toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    
    toggleSidebar.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        // En dispositivos móviles, alternar entre expandido y contraído
        if (window.innerWidth <= 992) {
            sidebar.classList.toggle('expanded');
        }
    });
    
    // Cerrar sidebar expandido al hacer clic fuera en dispositivos móviles
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            sidebar.classList.contains('expanded') && 
            !sidebar.contains(e.target) && 
            e.target !== toggleSidebar) {
            sidebar.classList.remove('expanded');
        }
    });
    
    // Manejo de ventana de notificaciones
    const notificationBtn = document.querySelector('.notifications button');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // Aquí iría el código para mostrar las notificaciones
            alert('Notificaciones: \n- Nueva solicitud recibida\n- 2 solicitudes pendientes requieren atención');
        });
    }
    
    // Filtro de búsqueda de solicitudes
    const searchInput = document.querySelector('.search-container input');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('tbody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
    
    // Simulación de datos para el dashboard
    function updateDashboardStats() {
        const currentDate = new Date();
        const hour = currentDate.getHours();
        
        // Simular fluctuaciones en las estadísticas según la hora del día
        const totalRequests = 128 + Math.floor(Math.random() * 10);
        const pendingRequests = 40 + Math.floor(Math.random() * 10);
        const resolvedRequests = totalRequests - pendingRequests;
        const newCustomers = 15 + Math.floor(Math.random() * 5);
        
        // Actualizar valores en el DOM
        const statValues = document.querySelectorAll('.stat-value');
        
        if (statValues.length >= 4) {
            statValues[0].textContent = totalRequests;
            statValues[1].textContent = pendingRequests;
            statValues[2].textContent = resolvedRequests;
            statValues[3].textContent = newCustomers;
        }
    }
    
    // Actualizar estadísticas al cargar y cada 5 minutos
    updateDashboardStats();
    setInterval(updateDashboardStats, 5 * 60 * 1000);
    
    // Manejo de los botones de acción en la tabla
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const requestId = row.querySelector('td:first-child').textContent;
            const clientName = row.querySelector('td:nth-child(2)').textContent;
            const action = this.querySelector('i').classList.contains('fa-eye') ? 'ver' : 'editar';
            
            if (action === 'ver') {
                showRequestDetails(requestId, clientName);
            } else {
                editRequest(requestId, clientName);
            }
        });
    });
    
    // Función para mostrar detalles de la solicitud
    function showRequestDetails(requestId, clientName) {
        // Aquí iría el código para mostrar los detalles de la solicitud
        // Por ahora, solo mostraremos un mensaje
        alert(`Detalles de la solicitud ${requestId} de ${clientName}`);
    }
    
    // Función para editar la solicitud
    function editRequest(requestId, clientName) {
        // Aquí iría el código para editar la solicitud
        // Por ahora, solo mostraremos un mensaje
        alert(`Editando solicitud ${requestId} de ${clientName}`);
    }
    
    // Agregar funcionalidad de ordenamiento a la tabla
    const tableHeaders = document.querySelectorAll('th');
    
    tableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const table = this.closest('table');
            const index = Array.from(this.parentNode.children).indexOf(this);
            const rows = Array.from(table.querySelectorAll('tbody tr'));
            const ascending = !this.classList.contains('sort-asc');
            
            // Limpiar clases de ordenamiento
            tableHeaders.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
            });
            
            // Aplicar clase de ordenamiento
            this.classList.add(ascending ? 'sort-asc' : 'sort-desc');
            
            // Ordenar filas
            rows.sort((a, b) => {
                const aValue = a.children[index].textContent;
                const bValue = b.children[index].textContent;
                
                if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                    return ascending ? parseFloat(aValue) - parseFloat(bValue) : parseFloat(bValue) - parseFloat(aValue);
                } else {
                    return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
            });
            
            // Reordenar tabla
            const tbody = table.querySelector('tbody');
            rows.forEach(row => tbody.appendChild(row));
        });
    });
    
    // Agregar estilos para el ordenamiento
    const style = document.createElement('style');
    style.textContent = `
        th {
            cursor: pointer;
            user-select: none;
        }
        
        th::after {
            margin-left: 5px;
            opacity: 0.5;
        }
        
        th.sort-asc::after {
            content: '↑';
        }
        
        th.sort-desc::after {
            content: '↓';
        }
        
        th:hover::after {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Adaptación para dispositivos móviles
    function handleResize() {
        if (window.innerWidth <= 992) {
            sidebar.classList.add('collapsed');
            sidebar.classList.remove('expanded');
        }
    }
    
    // Inicializar y agregar listener para cambios de tamaño de ventana
    handleResize();
    window.addEventListener('resize', handleResize);
}); 