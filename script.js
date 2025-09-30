document.addEventListener('DOMContentLoaded', () => {

    // ================= Toast =================
    function showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
    }

    // ================= Formulário de Contato =================
    const form = document.getElementById('form-contato');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = form.nome.value.trim();
            const email = form.email.value.trim();
            const telefone = form.telefone.value.trim();
            const mensagem = form.mensagem.value.trim();

            if (!nome || !email || !telefone || !mensagem) {
                alert("Preencha todos os campos!");
                return;
            }

            showToast("Le Visage agradece!");

            const numeroWhatsApp = "5561995064949";
            const texto = `Olá! Meu nome é ${nome}.%0AEmail: ${email}%0ATelefone: ${telefone}%0AMensagem: ${mensagem}`;
            window.open(`https://wa.me/${numeroWhatsApp}?text=${texto}`, '_blank');

            form.reset();
        });
    }

    // ================= Carousel Principal =================
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselDots = document.querySelectorAll('.dot');
    if (carouselItems.length && carouselDots.length) {
        let index = 0;
        const intervalTime = 3000;

        function showSlide(i) {
            carouselItems.forEach((item, idx) => {
                item.classList.toggle('active', idx === i);
                carouselDots[idx].classList.toggle('active', idx === i);
            });
        }

        function nextSlide() {
            index = (index + 1) % carouselItems.length;
            showSlide(index);
        }

        let slideInterval = setInterval(nextSlide, intervalTime);

        carouselDots.forEach(dot => {
            dot.addEventListener('click', () => {
                index = parseInt(dot.dataset.index);
                showSlide(index);
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, intervalTime);
            });
        });

        showSlide(index);
    }

    // ================= Vídeo de Fundo =================
    const video = document.getElementById('video-bg');
    if (video) {
        video.playbackRate = 0.5;
        video.play().catch(() => console.log("Autoplay bloqueado, usuário precisa interagir."));
    }

    // ================= Carousel Procedimentos =================
    const carouselProc = document.querySelector('.carousel-procedimentos');
    if (carouselProc) {
        const track = carouselProc.querySelector('.carousel-track-proc');
        const items = Array.from(carouselProc.querySelectorAll('.carousel-item-proc'));
        const prevBtn = carouselProc.querySelector('.prev-proc');
        const nextBtn = carouselProc.querySelector('.next-proc');
        if (track && items.length && prevBtn && nextBtn) {

            let indexProc = 0, gap = 0, itemWidth = 0, itemsPerView = 1;

            const measure = () => {
                const cs = getComputedStyle(track);
                gap = parseFloat(cs.columnGap || cs.gap || '0px') || 0;
                itemWidth = items[0].getBoundingClientRect().width;
                const trackWidth = carouselProc.getBoundingClientRect().width;
                itemsPerView = Math.max(1, Math.round((trackWidth + gap) / (itemWidth + gap)));
                indexProc = Math.min(Math.max(indexProc, 0), Math.max(0, items.length - itemsPerView));
                updateButtons();
                move();
            };

            const move = () => track.style.transform = `translateX(-${indexProc * (itemWidth + gap)}px)`;
            const updateButtons = () => {
                prevBtn.disabled = indexProc === 0;
                nextBtn.disabled = indexProc >= items.length - itemsPerView;
                prevBtn.setAttribute('aria-disabled', prevBtn.disabled);
                nextBtn.setAttribute('aria-disabled', nextBtn.disabled);
            };

            nextBtn.addEventListener('click', (e) => { e.preventDefault(); indexProc++; measure(); });
            prevBtn.addEventListener('click', (e) => { e.preventDefault(); indexProc--; measure(); });
            window.addEventListener('resize', measure);

            // Aguarda imagens carregarem
            let loaded = 0;
            const imgs = track.querySelectorAll('img');
            if (imgs.length) {
                imgs.forEach(img => {
                    if (img.complete) loaded++;
                    else {
                        img.addEventListener('load', () => { loaded++; if (loaded === imgs.length) measure(); });
                        img.addEventListener('error', () => { loaded++; if (loaded === imgs.length) measure(); });
                    }
                });
                if (loaded === imgs.length) measure();
            } else measure();
        }
    }


    window.addEventListener("DOMContentLoaded", () => {
        document.querySelector(".logo").classList.add("show");
        document.querySelector(".topo-2 img").classList.add("show");
        document.querySelector(".hero h1").classList.add("show");
        document.querySelector(".hero img").classList.add("show");
        document.querySelector(".hero p").classList.add("show");
    });

    const observerMenu = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll("nav ul li a").forEach(link => link.classList.add("show"));
                observerMenu.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // começa logo que a parte do menu aparece

    observerMenu.observe(document.querySelector("nav"));





    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                // Grupo H1
                if (entry.target.tagName === "H1") {
                    document.querySelectorAll("h1").forEach(el => el.classList.add("show"));
                }

                // Grupo equipe + ambiente
                if (entry.target.closest(".equipe") || entry.target.closest(".ambiente")) {
                    document.querySelectorAll(".equipe img, .ambiente img").forEach(el => el.classList.add("show"));
                }

                // Grupo P
                if (entry.target.tagName === "P") {
                    document.querySelectorAll("p").forEach(el => el.classList.add("show"));
                }

                // Carrossel
                if (entry.target.classList.contains("carousel")) {
                    entry.target.classList.add("show");
                }

                // desativa observação desse elemento depois que disparar
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // só dispara quando 30% do elemento estiver visível

    // Observar os elementos
    document.querySelectorAll("h1, .equipe img, .ambiente img, p, .carousel")
        .forEach(el => observer.observe(el));

    const observerProcedimentos = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // quando a seção procedimentos entrar na tela,
                // adiciona efeito ao h1 e ao carousel de uma vez só
                document.querySelector("#procedimentos h1").classList.add("show");
                document.querySelector(".carousel-procedimentos").classList.add("show");

                // desativa para não repetir
                observerProcedimentos.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // dispara quando 30% da seção estiver visível

        // observar a seção
    observerProcedimentos.observe(document.querySelector("#procedimentos"));


    const observerDepoimentos = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector("#depoimentos h2").classList.add("show");
                document.querySelector("#depoimentos .video-container").classList.add("show");
                document.querySelector("#depoimentos .depoimentos-imagem").classList.add("show");

                // Para não repetir o efeito
                observerDepoimentos.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // dispara quando 30% da seção aparecer

    observerDepoimentos.observe(document.querySelector("#depoimentos"));

    const observerContato = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // imagem + overlay entram juntos
                document.querySelector(".contato-imagem").classList.add("show");
                document.querySelector(".contato-imagem .mensagem-overlay").classList.add("show");

                // formulário entra da direita
                document.querySelector("#form-contato").classList.add("show");

                // desativa observação
                observerContato.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // dispara quando 30% da seção estiver visível

    observerContato.observe(document.querySelector("#contato"));

    const observerFooter = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll(".footer .footer-col").forEach(col => col.classList.add("show"));
                observerFooter.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Observar o footer inteiro
    observerFooter.observe(document.querySelector(".footer"));

});



// ===== Clinica carousel (fixo: 4 por página) =====
(function initClinicaCarouselExact4() {
  const container = document.querySelector('.clinica-carousel');
  if (!container) return;
  const track = container.querySelector('.clinica-track');
  const items = Array.from(container.querySelectorAll('.clinica-item'));
  if (!track || items.length === 0) return;

  const itemsPerPage = 4;            // fixo: 4 imagens por página
  const total = items.length;
  const pages = Math.ceil(total / itemsPerPage);
  let pageIndex = 0;
  const intervalMs = 5000;           // 5 segundos
  let interval = null;

  // move usando a largura exata do container para garantir que não apareça parte de nenhum item
  const moveToPage = (i) => {
    const page = Math.max(0, Math.min(i, pages - 1));
    const shift = page * container.clientWidth;
    track.style.transform = `translateX(-${shift}px)`;
    pageIndex = page;
  };

  const nextPage = () => moveToPage((pageIndex + 1) % pages);

  const start = () => {
    stop();
    interval = setInterval(nextPage, intervalMs);
  };

  const stop = () => {
    if (interval) { clearInterval(interval); interval = null; }
  };

  // recalcula posição (chamado em resize)
  const recalc = () => {
    // garantir que cada item tenha 25% do container (isso já está no CSS),
    // mas precisamos garantir que o track não mostre meias-imagens ao recalcular.
    // Simples resposta: reposiciona para a página atual com a nova largura do container.
    moveToPage(pageIndex);
  };

  // pausa ao hover
  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);

  // redimensionamento com debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(recalc, 120);
  });

  // espera imagens carregarem e então inicia
  const imgs = container.querySelectorAll('img');
  let loaded = 0;
  if (imgs.length === 0) {
    recalc();
    start();
  } else {
    imgs.forEach(img => {
      if (img.complete) {
        loaded++;
        if (loaded === imgs.length) { recalc(); start(); }
      } else {
        img.addEventListener('load', () => { loaded++; if (loaded === imgs.length) { recalc(); start(); }});
        img.addEventListener('error', () => { loaded++; if (loaded === imgs.length) { recalc(); start(); }});
      }
    });
  }

  // caso o usuário queira avançar manualmente no futuro, expomos funções (opcional)
  container._clinica = { next: nextPage, prev: () => moveToPage((pageIndex - 1 + pages) % pages), goTo: moveToPage };
})();



const depoimentosImgs = document.querySelectorAll('.depoimento-item img');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxImage = document.getElementById('lightbox-image');
const closeImg = document.querySelector('.lightbox-img .close');
const prevImg = document.querySelector('.lightbox-img .prev');
const nextImg = document.querySelector('.lightbox-img .next');

let currentImgIndex = 0;

// Abre lightbox ao clicar na imagem
depoimentosImgs.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImgIndex = index;
        openLightbox(img.src);
    });
});

function openLightbox(src) {
    lightboxImg.style.display = 'flex';
    lightboxImage.src = src;
}

// Fechar lightbox
closeImg.addEventListener('click', () => {
    lightboxImg.style.display = 'none';
});

// Navegação
prevImg.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex - 1 + depoimentosImgs.length) % depoimentosImgs.length;
    lightboxImage.src = depoimentosImgs[currentImgIndex].src;
});

nextImg.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex + 1) % depoimentosImgs.length;
    lightboxImage.src = depoimentosImgs[currentImgIndex].src;
});
