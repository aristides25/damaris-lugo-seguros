// Script para la página web de corredora de seguros

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Toggle del menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Pequeño retraso para permitir que la transición CSS funcione correctamente
            setTimeout(() => {
                mobileMenu.classList.toggle('active');
            }, 10);
        });
    }

    // Cerrar el menú móvil al hacer clic en un enlace
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Pequeño retraso para la animación de salida
            mobileMenu.classList.remove('active');
            
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 400); // Tiempo igual a la duración de la transición CSS
        });
    });

    // Cerrar el menú móvil al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            if (!mobileMenu.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 400);
            }
        }
    });

    // Añadir la clase 'card-effect' a las tarjetas de servicios y tipos de seguros
    const serviciosTarjetas = document.querySelectorAll('#servicios .grid > div');
    serviciosTarjetas.forEach(tarjeta => {
        tarjeta.classList.add('card-effect');
    });

    const segurosTarjetas = document.querySelectorAll('#tipos-seguros .grid > div');
    segurosTarjetas.forEach(tarjeta => {
        tarjeta.classList.add('card-effect');
    });

    // Añadir la clase 'card-effect' a las tarjetas de importancia
    const importanciaTarjetas = document.querySelectorAll('#importancia .grid > div');
    importanciaTarjetas.forEach(tarjeta => {
        tarjeta.classList.add('card-effect');
    });

    // Añadir la clase 'item-hover-effect' a elementos que deberían tener zoom al pasar el cursor
    const allHoverItems = document.querySelectorAll('#servicios .grid > div, #tipos-seguros .grid > div, #importancia .grid > div, #importancia li');
    allHoverItems.forEach(item => {
        item.classList.add('item-hover-effect');
    });

    // Añadir la clase 'btn-whatsapp' a los botones de WhatsApp y a los botones de llamada
    const whatsappButtons = document.querySelectorAll('a[href^="https://wa.me"]');
    whatsappButtons.forEach(button => {
        button.classList.add('btn-whatsapp');
    });
    
    // Añadir la misma clase a los botones de llamada para que tengan el mismo efecto
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    phoneButtons.forEach(button => {
        button.classList.add('btn-whatsapp');
    });

    // Añadir clase 'bg-hero-pattern' al hero section
    const heroSection = document.querySelector('header');
    if (heroSection) {
        heroSection.classList.add('bg-hero-pattern');
    }

    // Añadir la clase 'section-wave' a secciones alternadas
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('section-wave');
        }
    });

    // Navbar sticky al hacer scroll
    const navbar = document.querySelector('nav');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        if (navbar) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Añadir clase sticky cuando se hace scroll hacia abajo
            if (scrollTop > navbarHeight && scrollTop > lastScrollTop) {
                navbar.classList.add('sticky');
            } 
            // Opcional: quitar la clase sticky cuando se hace scroll hacia arriba
            else if (scrollTop < lastScrollTop - 10) {
                navbar.classList.remove('sticky');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }
    });

    // Asegurar que todas las secciones y elementos sean visibles por defecto
    function makeAllSectionsVisible() {
        const sectionsToAnimate = document.querySelectorAll('.section-hidden');
        
        sectionsToAnimate.forEach(section => {
            // Hacer visibles todas las secciones
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            
            // Hacer visibles todos los elementos internos
            const allElements = section.querySelectorAll('*');
            allElements.forEach(element => {
                if (element.classList.contains('animate-element') || 
                    element.parentElement.classList.contains('animate-element')) {
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Configurar solo el desplazamiento suave para los enlaces del menú (sin animaciones adicionales)
    function setupSmoothScroll() {
        const menuLinks = document.querySelectorAll('nav a[href^="#"]');
        
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Solo hacer scroll suave a la sección sin animaciones
                    const navbarOffset = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Asegurar que todas las secciones son visibles al cargar la página
    makeAllSectionsVisible();
    
    // Configurar solo el desplazamiento suave
    setupSmoothScroll();

    // Ajustes para dispositivos móviles
    function handleResize() {
        const isMobile = window.innerWidth < 768;
        
        // Ajustar tamaño de elementos en móvil
        if (isMobile) {
            // Cualquier ajuste específico para móviles aquí
        }
    }

    // Ejecutar inicialmente y en cada cambio de tamaño
    handleResize();
    window.addEventListener('resize', handleResize);

    // Contador de estadísticas (animación simple)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 16ms por frame aprox.
            
            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Validación simple de formulario de contacto si existe
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Lógica de validación
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                // Aquí iría la lógica para enviar el formulario
                // Por ahora solo mostramos un mensaje
                alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
                contactForm.reset();
            }
        });
    }
}); 