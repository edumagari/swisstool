(function($) {
    'use strict';

    // Cache DOM elements
    const $window = $(window);
    const $document = $(document);
    const $navbar = $('#mainNav');
    const $scrollToTop = $('#scrollToTop');
    const $loadingBar = $('#loadingBar');
    
    // Initialize on document ready
    $document.ready(function() {
        initNavbarScroll();
        initScrollToTop();
        initSmoothScroll();
        initLoadingAnimation();
        initProductAnimations();
        initParallaxEffects();
        initCarouselEnhancements();
        initLazyLoading();
    });

    // Navbar scroll effect
    function initNavbarScroll() {
        $window.on('scroll', function() {
            if ($window.scrollTop() > 100) {
                $navbar.addClass('scrolled');
            } else {
                $navbar.removeClass('scrolled');
            }
        });
    }

    // Scroll to top button
    function initScrollToTop() {
        $window.on('scroll', function() {
            if ($window.scrollTop() > 300) {
                $scrollToTop.addClass('visible');
            } else {
                $scrollToTop.removeClass('visible');
            }
        });

        $scrollToTop.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800, 'easeInOutQuart');
        });
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800, 'easeInOutQuart');
            }
        });
    }

    // Loading animation
    function initLoadingAnimation() {
        // Show loading bar when page starts loading
        $loadingBar.addClass('active');
        
        // Hide loading bar when page is fully loaded
        $window.on('load', function() {
            setTimeout(function() {
                $loadingBar.removeClass('active');
            }, 500);
        });

        // Show loading bar for AJAX requests
        $(document).ajaxStart(function() {
            $loadingBar.addClass('active');
        }).ajaxStop(function() {
            $loadingBar.removeClass('active');
        });
    }

    // Product card animations on scroll
    function initProductAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const $element = $(entry.target);
                    $element.addClass('animate-in');
                    
                    // Stagger animation for product cards
                    if ($element.hasClass('product-card')) {
                        const index = $element.index();
                        setTimeout(function() {
                            $element.css({
                                'opacity': '1',
                                'transform': 'translateY(0)'
                            });
                        }, index * 100);
                    }
                }
            });
        }, observerOptions);

        // Observe all product cards and feature boxes
        $('.product-card, .feature-box').each(function() {
            observer.observe(this);
            $(this).css({
                'opacity': '0',
                'transform': 'translateY(30px)',
                'transition': 'all 0.6s ease-out'
            });
        });
    }

    // Parallax effects
    function initParallaxEffects() {
        $window.on('scroll', function() {
            const scrolled = $window.scrollTop();
            
            // Parallax for hero carousel
            $('.carousel-item .fill').css({
                'transform': 'translateY(' + (scrolled * 0.5) + 'px)'
            });
            
            // Parallax for section backgrounds
            $('.parallax-section').each(function() {
                const $this = $(this);
                const offsetTop = $this.offset().top;
                const height = $this.outerHeight();
                
                if (scrolled + $window.height() > offsetTop && scrolled < offsetTop + height) {
                    const yPos = -((scrolled - offsetTop) / 2);
                    $this.css('background-position', 'center ' + yPos + 'px');
                }
            });
        });
    }

    // Enhanced carousel functionality
    function initCarouselEnhancements() {
        const $carousel = $('#myCarousel');
        
        // Pause on hover
        $carousel.hover(
            function() { $(this).carousel('pause'); },
            function() { $(this).carousel('cycle'); }
        );
        
        // Keyboard navigation
        $document.on('keydown', function(e) {
            if (e.keyCode === 37) { // Left arrow
                $carousel.carousel('prev');
            } else if (e.keyCode === 39) { // Right arrow
                $carousel.carousel('next');
            }
        });
        
        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        $carousel.on('touchstart', function(e) {
            touchStartX = e.originalEvent.touches[0].pageX;
        });
        
        $carousel.on('touchend', function(e) {
            touchEndX = e.originalEvent.changedTouches[0].pageX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                $carousel.carousel('next');
            }
            if (touchEndX > touchStartX + 50) {
                $carousel.carousel('prev');
            }
        }
    }

    // Lazy loading for images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                            
                            // Add fade-in effect
                            $(img).css('opacity', '0').animate({ opacity: 1 }, 500);
                        }
                    }
                });
            });
            
            // Observe all images with data-src attribute
            $('img[data-src]').each(function() {
                imageObserver.observe(this);
            });
        }
    }

    // Add easing functions for smooth animations
    $.extend($.easing, {
        easeInOutQuart: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    });

    // Counter animation for statistics
    function animateCounters() {
        $('.counter').each(function() {
            const $this = $(this);
            const countTo = $this.attr('data-count');
            
            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Trigger counter animation when visible
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    });

    $('.counter').each(function() {
        if (this) counterObserver.observe(this);
    });

    // Hover effects for navigation
    $('.navbar-nav .nav-link').on('mouseenter', function() {
        $(this).siblings().css('opacity', '0.7');
    }).on('mouseleave', function() {
        $(this).siblings().css('opacity', '1');
    });

    // Dynamic year in footer
    const currentYear = new Date().getFullYear();
    $('.footer-bottom p').html(function(i, html) {
        return html.replace('2024', currentYear);
    });

    // Preloader for images
    function preloadImages() {
        const images = [
            'img/slide1.jpg',
            'img/slide2.jpg',
            'img/slide3.jpg'
        ];
        
        images.forEach(function(src) {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();

    // Mobile menu enhancements
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
        $('body').toggleClass('menu-open');
    });

    // Close mobile menu when clicking outside
    $document.on('click', function(e) {
        if (!$(e.target).closest('.navbar').length && $('.navbar-collapse').hasClass('show')) {
            $('.navbar-toggler').click();
        }
    });

    // Form validation enhancement
    $('form').on('submit', function(e) {
        const $form = $(this);
        const isValid = this.checkValidity();
        
        if (!isValid) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        $form.addClass('was-validated');
    });

    // Tooltip initialization
    $('[data-toggle="tooltip"]').tooltip();

    // Popover initialization
    $('[data-toggle="popover"]').popover();

    // Add ripple effect to buttons
    $('.btn, .product-card').on('click', function(e) {
        const $this = $(this);
        const offset = $this.offset();
        const relativeX = e.pageX - offset.left;
        const relativeY = e.pageY - offset.top;
        
        const $ripple = $('<div class="ripple"></div>');
        $ripple.css({
            top: relativeY + 'px',
            left: relativeX + 'px'
        });
        
        $this.append($ripple);
        
        setTimeout(function() {
            $ripple.remove();
        }, 600);
    });

})(jQuery);