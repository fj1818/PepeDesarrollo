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
    
    // Cargar ubicaciones y configurar Select2 para el campo de ubicación
    fetch('ubicaciones.json')
        .then(response => response.json())
        .then(data => {
            const ubicacionSelect = document.getElementById('ubicacion');
            
            // Agregar las opciones al select
            data.forEach(ubicacion => {
                const option = document.createElement('option');
                option.value = ubicacion;
                option.textContent = ubicacion;
                ubicacionSelect.appendChild(option);
            });
            
            // Inicializar Select2 para el campo de ubicación
            $(ubicacionSelect).select2({
                theme: 'bootstrap-5',
                width: '100%',
                placeholder: 'Busca y selecciona tu ubicación',
                allowClear: true,
                language: {
                    noResults: function() {
                        return "No se encontraron resultados";
                    },
                    searching: function() {
                        return "Buscando...";
                    }
                }
            });
            
            // Restablecer Select2 cuando se reinicia el formulario
            $('#contact-form').on('reset', function() {
                setTimeout(function() {
                    $(ubicacionSelect).val('').trigger('change');
                }, 10);
            });
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
            
            // Mostrar el toast de éxito
            var successToast = new bootstrap.Toast(document.getElementById('successToast'), {
                autohide: false
            });
            successToast.show();
            
            // Resetear completamente el formulario y eliminar las validaciones
            form.reset();
            form.classList.remove('was-validated');
            
            // Limpiar todas las validaciones
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.classList.remove('is-invalid');
                input.classList.remove('is-valid');
                input.setCustomValidity('');
            });
        } else {
            // Mostrar validaciones cuando hay errores
            this.classList.add('was-validated');
        }
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