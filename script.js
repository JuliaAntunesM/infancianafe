// Funcionalidade para FAQ (acordeão)
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Abre o item clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de scroll para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa elementos para animação
    const animatedElements = document.querySelectorAll('.benefit-card, .product-card, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contador de produtos vendidos (simulado)
    function updateSoldCount() {
        const soldCount = Math.floor(Math.random() * 50) + 150;
        const soldElement = document.querySelector('.sold-count');
        if (soldElement) {
            soldElement.textContent = soldCount;
        }
    }

    // Atualiza contador a cada 30 segundos
    setInterval(updateSoldCount, 30000);
    updateSoldCount();

    // Timer de oferta especial
    function updateTimer() {
        const now = new Date();
        const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            const timerElement = document.querySelector('.offer-timer');
            if (timerElement) {
                timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }
    }

    // Atualiza timer a cada segundo
    setInterval(updateTimer, 1000);
    updateTimer();

    // Adiciona efeito de hover nos botões
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Adiciona funcionalidade de WhatsApp
    const whatsappButtons = document.querySelectorAll('a[href="#whatsapp"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os livros de colorir Jesus Good. Pode me ajudar?');
            const phone = '5511999999999'; // Substitua pelo número real
            
            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        });
    });

    // Adiciona funcionalidade de checkout (simulado)
    const checkoutButtons = document.querySelectorAll('a[href="#checkout"]');
    
    checkoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simula redirecionamento para checkout
            const productName = this.closest('.product-card')?.querySelector('h3')?.textContent || 'Jesus Good';
            
            // Aqui você pode integrar com seu sistema de pagamento
            alert(`Redirecionando para checkout do produto: ${productName}`);
            
            // Exemplo de integração com checkout
            // window.location.href = 'https://seu-checkout.com/produto';
        });
    });

    // Adiciona funcionalidade de scroll suave para o topo
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopButton);
    
    // Mostra/esconde botão de scroll to top
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.display = 'flex';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });
    
    // Funcionalidade do botão scroll to top
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Adiciona efeito de loading nos botões de compra
    const buyButtons = document.querySelectorAll('.btn-primary');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Comprar')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
                this.disabled = true;
                
                // Simula processamento
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });

    // Adiciona funcionalidade de compartilhamento
    if (navigator.share) {
        const shareButton = document.createElement('button');
        shareButton.innerHTML = '<i class="fas fa-share-alt"></i>';
        shareButton.className = 'share-button';
        shareButton.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #25d366;
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(shareButton);
        
        shareButton.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: 'Jesus Good - Livros de Colorir para Crianças',
                    text: 'Descubra livros de colorir que inspiram fé e criatividade nas crianças!',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Erro ao compartilhar:', err);
            }
        });
    }

    // Adiciona funcionalidade de contador de visualizações (simulado)
    let viewCount = localStorage.getItem('viewCount') || 0;
    viewCount = parseInt(viewCount) + 1;
    localStorage.setItem('viewCount', viewCount);
    
    // Exibe contador de visualizações se houver elemento para isso
    const viewCountElement = document.querySelector('.view-count');
    if (viewCountElement) {
        viewCountElement.textContent = viewCount;
    }

    // Função de notificação de estoque baixo removida

    // Adiciona CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInDown {
            from {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutUp {
            from {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
        }
        
        .scroll-to-top:hover,
        .share-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        .share-button:hover {
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }
    `;
    
    document.head.appendChild(style);
});
