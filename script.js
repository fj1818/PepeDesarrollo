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
        
        if (this.checkValidity()) {
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
            
            // Limpiar el formulario Y quitar las validaciones
            form.reset();
            form.classList.remove('was-validated');
            return; // Importante: salir de la función después de un envío exitoso
        }
        
        // Si llegamos aquí, significa que hay errores de validación
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
    
    // Alternar entre Foto1 y Foto2 al hacer clic en la imagen de perfil
    const profileImage = document.getElementById('profile-image');
    if (profileImage) {
        let currentImage = 1;
        profileImage.addEventListener('click', function() {
            currentImage = currentImage === 1 ? 2 : 1;
            this.src = `Foto${currentImage}.jpg`;
            
            // Añadir efecto de transición
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    }
    
    // Gestión de popup para galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imagePopup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const closePopup = document.getElementById('closePopup');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    const imageCounter = document.getElementById('imageCounter');
    
    // Variables para gestionar el estado del popup
    let currentImageIndex = 0;
    const galleryImages = ['Foto3.jpg', 'Foto4.jpg', 'Foto5.jpg', 'Foto6.jpg'];
    
    // Función para abrir el popup
    function openPopup(index) {
        currentImageIndex = index;
        popupImage.src = galleryImages[index];
        imagePopup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Evitar scroll
        updateCounter();
        
        // Efecto de fade-in
        setTimeout(() => {
            imagePopup.style.opacity = '1';
        }, 10);
    }
    
    // Función para cerrar el popup
    function closePopupHandler() {
        imagePopup.style.opacity = '0';
        setTimeout(() => {
            imagePopup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll
        }, 300);
    }
    
    // Función para navegar a la imagen anterior
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        popupImage.style.opacity = '0';
        setTimeout(() => {
            popupImage.src = galleryImages[currentImageIndex];
            popupImage.style.opacity = '1';
            updateCounter();
        }, 200);
    }
    
    // Función para navegar a la siguiente imagen
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        popupImage.style.opacity = '0';
        setTimeout(() => {
            popupImage.src = galleryImages[currentImageIndex];
            popupImage.style.opacity = '1';
            updateCounter();
        }, 200);
    }
    
    // Actualizar el contador de imágenes
    function updateCounter() {
        imageCounter.textContent = `${currentImageIndex + 1}/${galleryImages.length}`;
    }
    
    // Asignar eventos a los items de la galería
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openPopup(index);
        });
    });
    
    // Eventos para los controles del popup
    closePopup.addEventListener('click', closePopupHandler);
    prevImage.addEventListener('click', showPrevImage);
    nextImage.addEventListener('click', showNextImage);
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imagePopup.style.display === 'block') {
            closePopupHandler();
        } else if (e.key === 'ArrowLeft' && imagePopup.style.display === 'block') {
            showPrevImage();
        } else if (e.key === 'ArrowRight' && imagePopup.style.display === 'block') {
            showNextImage();
        }
    });
    
    // Cerrar haciendo clic en el fondo
    imagePopup.querySelector('.popup-overlay').addEventListener('click', closePopupHandler);
    
    // Botón de acción en la sección hero
    const heroActionBtn = document.getElementById('heroActionBtn');
    if (heroActionBtn) {
        heroActionBtn.addEventListener('click', function() {
            // Activar la pestaña del formulario
            document.querySelector('.tab[data-tab="formulario"]').click();
        });
    }
}); 