document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true
    });
    
    // Gestión de pestañas
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Eliminar clase active de todas las pestañas
            tabs.forEach(t => t.classList.remove('active'));
            
            // Añadir clase active a la pestaña actual
            this.classList.add('active');
            
            // Mostrar el contenido de la pestaña correspondiente
            const tabName = this.getAttribute('data-tab');
            
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabName) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // Autocompletado para ubicación (municipios y estados de México)
    const ubicaciones = [
        "Aguascalientes, Aguascalientes",
        "Asientos, Aguascalientes",
        "Calvillo, Aguascalientes",
        "Cosío, Aguascalientes",
        "Jesús María, Aguascalientes",
        "Pabellón de Arteaga, Aguascalientes",
        "Rincón de Romos, Aguascalientes",
        "San José de Gracia, Aguascalientes",
        "Tepezalá, Aguascalientes",
        "Ensenada, Baja California",
        "Mexicali, Baja California",
        "Playas de Rosarito, Baja California",
        "Tecate, Baja California",
        "Tijuana, Baja California",
        "Comondú, Baja California Sur",
        "La Paz, Baja California Sur",
        "Loreto, Baja California Sur",
        "Los Cabos, Baja California Sur",
        "Mulegé, Baja California Sur",
        "Campeche, Campeche",
        "Carmen, Campeche",
        "Champotón, Campeche",
        "Escárcega, Campeche",
        "Hecelchakán, Campeche",
        "Hopelchén, Campeche",
        "Tenabo, Campeche",
        "Chihuahua, Chihuahua",
        "Ciudad Juárez, Chihuahua",
        "Cuauhtémoc, Chihuahua",
        "Delicias, Chihuahua",
        "Hidalgo del Parral, Chihuahua",
        "Ciudad de México, Ciudad de México",
        "Álvaro Obregón, Ciudad de México",
        "Azcapotzalco, Ciudad de México",
        "Benito Juárez, Ciudad de México",
        "Coyoacán, Ciudad de México",
        "Cuajimalpa, Ciudad de México",
        "Cuauhtémoc, Ciudad de México",
        "Gustavo A. Madero, Ciudad de México",
        "Iztacalco, Ciudad de México",
        "Iztapalapa, Ciudad de México",
        "La Magdalena Contreras, Ciudad de México",
        "Miguel Hidalgo, Ciudad de México",
        "Milpa Alta, Ciudad de México",
        "Tláhuac, Ciudad de México",
        "Tlalpan, Ciudad de México",
        "Venustiano Carranza, Ciudad de México",
        "Xochimilco, Ciudad de México",
        "Durango, Durango",
        "Gómez Palacio, Durango",
        "Lerdo, Durango",
        "Celaya, Guanajuato",
        "Guanajuato, Guanajuato",
        "Irapuato, Guanajuato",
        "León, Guanajuato",
        "Salamanca, Guanajuato",
        "San Miguel de Allende, Guanajuato",
        "Silao, Guanajuato",
        "Acapulco, Guerrero",
        "Chilpancingo, Guerrero",
        "Iguala, Guerrero",
        "Taxco, Guerrero",
        "Zihuatanejo, Guerrero",
        "Pachuca, Hidalgo",
        "Tulancingo, Hidalgo",
        "Tula, Hidalgo",
        "Guadalajara, Jalisco",
        "Puerto Vallarta, Jalisco",
        "Tlaquepaque, Jalisco",
        "Tonalá, Jalisco",
        "Zapopan, Jalisco",
        "Toluca, Estado de México",
        "Ecatepec, Estado de México",
        "Naucalpan, Estado de México",
        "Nezahualcóyotl, Estado de México",
        "Tlalnepantla, Estado de México",
        "Morelia, Michoacán",
        "Uruapan, Michoacán",
        "Zamora, Michoacán",
        "Cuernavaca, Morelos",
        "Cuautla, Morelos",
        "Jiutepec, Morelos",
        "Tepic, Nayarit",
        "Monterrey, Nuevo León",
        "Apodaca, Nuevo León",
        "Escobedo, Nuevo León",
        "Guadalupe, Nuevo León",
        "San Nicolás de los Garza, Nuevo León",
        "San Pedro Garza García, Nuevo León",
        "Oaxaca, Oaxaca",
        "Puebla, Puebla",
        "Querétaro, Querétaro",
        "Cancún, Quintana Roo",
        "Playa del Carmen, Quintana Roo",
        "San Luis Potosí, San Luis Potosí",
        "Culiacán, Sinaloa",
        "Mazatlán, Sinaloa",
        "Hermosillo, Sonora",
        "Ciudad Obregón, Sonora",
        "Villahermosa, Tabasco",
        "Tampico, Tamaulipas",
        "Ciudad Victoria, Tamaulipas",
        "Nuevo Laredo, Tamaulipas",
        "Reynosa, Tamaulipas",
        "Matamoros, Tamaulipas",
        "Tlaxcala, Tlaxcala",
        "Veracruz, Veracruz",
        "Xalapa, Veracruz",
        "Coatzacoalcos, Veracruz",
        "Mérida, Yucatán",
        "Zacatecas, Zacatecas",
        "Fresnillo, Zacatecas"
    ];
    
    $("#ubicacion").autocomplete({
        source: function(request, response) {
            var term = $.ui.autocomplete.escapeRegex(request.term);
            var matcher = new RegExp(term, "i");
            response($.grep(ubicaciones, function(item) {
                return matcher.test(item);
            }));
        },
        minLength: 2,
        select: function(event, ui) {
            $("#ubicacion").val(ui.item.value);
        }
    });
    
    // Mostrar/ocultar campo de referido
    const canalSelect = document.getElementById('canal');
    const referidoContainer = document.querySelector('.referido-container');
    
    canalSelect.addEventListener('change', function() {
        if (this.value === 'referido') {
            referidoContainer.classList.remove('d-none');
            document.getElementById('referido_nombre').setAttribute('required', 'required');
        } else {
            referidoContainer.classList.add('d-none');
            document.getElementById('referido_nombre').removeAttribute('required');
        }
    });
    
    // Validación y manejo del formulario
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (form.checkValidity()) {
            // Recoger los datos del formulario
            const formData = {
                nombres: document.getElementById('nombres').value,
                apellidos: document.getElementById('apellidos').value,
                telefono: document.getElementById('telefono').value,
                correo: document.getElementById('correo').value,
                ubicacion: document.getElementById('ubicacion').value,
                canal: document.getElementById('canal').value
            };
            
            // Imprimir los datos en la consola
            console.log('Datos del formulario:', formData);
            
            // Mostrar el toast de éxito (configurado para no cerrarse automáticamente)
            var successToast = new bootstrap.Toast(document.getElementById('successToast'), {
                autohide: false
            });
            successToast.show();
            
            // Limpiar el formulario
            form.reset();
        }
        
        this.classList.add('was-validated');
    });
    
    // Formato de teléfono mientras se escribe
    const phoneInput = document.getElementById('telefono');
    phoneInput.addEventListener('input', function(e) {
        // Eliminar todo lo que no sea número
        let value = this.value.replace(/\D/g, '');
        
        // Limitar a 10 dígitos
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        // Actualizar el valor del campo
        this.value = value;
    });
    
    // Añadir validación específica para 10 dígitos
    phoneInput.addEventListener('blur', function() {
        if (this.value.length > 0 && this.value.length !== 10) {
            this.setCustomValidity('El número telefónico debe tener exactamente 10 dígitos');
            this.classList.add('is-invalid');
        } else {
            this.setCustomValidity('');
            this.classList.remove('is-invalid');
        }
    });
    
    // Efecto hover en la tarjeta de inspiración
    const inspirationCard = document.querySelector('.inspiration-card');
    if (inspirationCard) {
        inspirationCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15)';
        });
        
        inspirationCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    }
    
    // Prevenir envío de formulario al presionar Enter
    form.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            return false;
        }
    });
    
    // Botón para cambiar de la sección "Más información" al formulario
    const switchToFormBtn = document.getElementById('switchToFormBtn');
    if (switchToFormBtn) {
        switchToFormBtn.addEventListener('click', function() {
            // Activar la pestaña del formulario
            document.querySelector('.tab[data-tab="formulario"]').click();
        });
    }
}); 