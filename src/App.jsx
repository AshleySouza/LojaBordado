import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, EMAIL_CONFIG } from './config';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    localidade: '',
    servico: '',
    tipoPessoa: '',
    mensagem: ''
  });

  // Estados para controlar cada carrossel
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [fabricIndex, setFabricIndex] = useState(0);
  const galleryIndexRef = useRef(0);
  const fabricIndexRef = useRef(0);
  const galleryIntervalRef = useRef(null);
  const fabricIntervalRef = useRef(null);

  const getCarouselMetrics = (carouselId) => {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return null;
    const card = carousel.querySelector('.carousel-card');
    const total = carousel.querySelectorAll('.carousel-card').length;
    if (!card || total === 0) return null;
    const cardWidth = card.offsetWidth + 16;
    return { carousel, cardWidth, total };
  };

  // Funcao para mover manualmente (setas)
  const scrollCarousel = (carouselId, direction, indexRef, setIndex) => {
    const metrics = getCarouselMetrics(carouselId);
    if (!metrics) return;
    const { carousel, cardWidth, total } = metrics;

    let next = indexRef.current + direction;

    // Loop infinito
    if (next < 0) next = total - 1;
    if (next >= total) next = 0;

    carousel.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
    indexRef.current = next;
    setIndex(next);
  };

  const autoAdvanceCarousel = (carouselId, indexRef, setIndex) => {
    const metrics = getCarouselMetrics(carouselId);
    if (!metrics) return;
    const { carousel, cardWidth, total } = metrics;

    let next = indexRef.current + 1;

    if (next >= total) {
      next = 0;
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carousel.scrollTo({ left: next * cardWidth, behavior: 'smooth' });
    }

    indexRef.current = next;
    setIndex(next);
  };

  const startCarousel = (carouselId, indexRef, setIndex, intervalRef, delay) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      autoAdvanceCarousel(carouselId, indexRef, setIndex);
    }, delay);
  };

  const stopCarousel = (intervalRef) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Auto-play (loop infinito) para galeria
  useEffect(() => {
    startCarousel('gallery-carousel', galleryIndexRef, setGalleryIndex, galleryIntervalRef, 3500);
    return () => stopCarousel(galleryIntervalRef);
  }, []);

  // Auto-play (loop infinito) para tecidos
  useEffect(() => {
    startCarousel('fabric-carousel', fabricIndexRef, setFabricIndex, fabricIntervalRef, 3800);
    return () => stopCarousel(fabricIntervalRef);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        from_name: formData.nome,
        from_email: formData.email,
        telefone: formData.telefone,
        localidade: formData.localidade,
        servico: formData.servico,
        mensagem: formData.mensagem,
        pessoa: formData.tipoPessoa,
        to_email: EMAIL_CONFIG.TO_EMAIL,
        company_name: EMAIL_CONFIG.FROM_NAME,
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus('success');

      // Pequeno delay antes de limpar o formulario para dar feedback visual
      setTimeout(() => {
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          localidade: '',
          servico: '',
          mensagem: ''
        });
        // Resetar o status apos limpar
        setSubmitStatus(null);
      }, 3000); // 3 segundos para o usuario ver a mensagem de sucesso

    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Bordados & Silk
          </div>
          <div className="text-xl text-gray-600">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-flex">
            <h1 className="logo">Bordados & Silk</h1>
            <nav className="nav">
              <a href="#home" className="nav-link">Home</a>
              <a href="#sobre" className="nav-link">Sobre Nós</a>
              <a href="#tecidos" className="nav-link">Tecidos</a>
              <a href="#galeria" className="nav-link">Galeria</a>
              <a href="#contato" className="nav-link">Orçamento</a>
            </nav>
            <div className="social-icons">
              <a href="https://wa.me/5511970648133" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
              <a href="https://instagram.com/ashleyvictoria.1304" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-content">
          <h2 className="hero-title">
            Bordados 
            <span className="hero-subtitle">& Silk</span>
          </h2>
          <p className="hero-description">
            Especialistas em uniformes personalizados e bordados de alta qualidade para empresas e eventos.
          </p>
          <div className="hero-buttons">
            <a href="#galeria" className="btn-primary">Ver Galeria</a>
            <a href="#contato" className="btn-secondary">Fazer Orçamento</a>
          </div>
        </div>
      </section>

      <section id="sobre" className="about">
        <div className="about-content">
          <h2 className="about-title">Sobre Nós</h2>
          <div className="about-grid">
            <div className="about-text">
              <h4 className="about-subtitle">Excelência em Uniformes e Bordados</h4>
              <p className="about-description">
                Somos especialistas em uniformes personalizados e bordados de alta qualidade. 
                Atendemos empresas de diversos segmentos, eventos corporativos e clientes individuais 
                com profissionalismo e dedicação.
              </p>
              <p className="about-description">
                Utilizamos equipamentos de última geração e técnicas inovadoras para garantir que 
                cada uniforme seja único e de excelente qualidade. Nossa equipe está preparada para 
                transformar suas ideias em realidade.
              </p>
              <div className="about-features">
                <div className="feature"><div className="feature-dot" aria-hidden="true"></div><span>Design Personalizado</span></div>
                <div className="feature"><div className="feature-dot" aria-hidden="true"></div><span>Entrega Rápida</span></div>
                <div className="feature"><div className="feature-dot" aria-hidden="true"></div><span>Qualidade Premium</span></div>
                <div className="feature"><div className="feature-dot" aria-hidden="true"></div><span>Atendimento Empresarial</span></div>
              </div>
            </div>
            <div className="about-image">
              <img src="/fachada%20de%20uma%20loja%20.png" alt="Nossa Loja" className="loja-image" />
            </div>
          </div>
        </div>
      </section>

      <section id="processo" className="process">
        <div className="process-content">
          <h2 className="process-title">Como Funciona</h2>
          <p className="process-subtitle">Um fluxo simples para você receber seu pedido com segurança e qualidade.</p>
          <div className="process-steps">
            <div className="process-card">
              <span className="process-step">1</span>
              <h3 className="process-name">Briefing e Orçamento</h3>
              <p className="process-text">Você envia sua ideia, quantidade e prazo. Nós retornamos com a proposta ideal.</p>
            </div>
            <div className="process-card">
              <span className="process-step">2</span>
              <h3 className="process-name">Produção</h3>
              <p className="process-text">Criamos a arte e produzimos com equipamentos de alta precisão.</p>
            </div>
            <div className="process-card">
              <span className="process-step">3</span>
              <h3 className="process-name">Entrega</h3>
              <p className="process-text">Finalizamos e entregamos no prazo combinado, com acompanhamento.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="clientes" className="clients">
        <div className="clients-content">
          <h2 className="clients-title">Empresas que Confiam</h2>
          <p className="clients-subtitle">Marcas e equipes que já vestiram nosso trabalho.</p>
          <div className="clients-grid">
            <div className="client-chip">Restaurantes</div>
            <div className="client-chip">Eventos</div>
            <div className="client-chip">Indústrias</div>
            <div className="client-chip">Academias</div>
            <div className="client-chip">Clínicas</div>
            <div className="client-chip">Escolas</div>
          </div>
        </div>
      </section>

      <section id="tecidos" className="fabric">
        <div className="fabric-content">
          <div className="fabric-header">
            <h2 className="fabric-title">Tecidos e Materiais</h2>
            <p className="fabric-subtitle">
              Escolha o tecido ideal para o seu projeto. Temos opções para conforto, resistência e acabamento premium.
            </p>
          </div>
          <div className="carousel-wrapper">
            <button
              className="carousel-btn left"
              onClick={() => scrollCarousel('fabric-carousel', -1, fabricIndexRef, setFabricIndex)}
              aria-label="Anterior"
            >
              ‹
            </button>
            <div
              className="carousel-container fabric-carousel"
              id="fabric-carousel"
              onMouseEnter={() => stopCarousel(fabricIntervalRef)}
              onMouseLeave={() => startCarousel('fabric-carousel', fabricIndexRef, setFabricIndex, fabricIntervalRef, 3800)}
              onTouchStart={() => stopCarousel(fabricIntervalRef)}
              onTouchEnd={() => startCarousel('fabric-carousel', fabricIndexRef, setFabricIndex, fabricIntervalRef, 3800)}
            >
              <div className="fabric-card carousel-card">
                <div className="fabric-swatch fabric-swatch--tricoline"></div>
                <h3 className="card-title">Tricoline</h3>
                <p className="card-description">Toque macio, ótimo para camisas sociais e eventos.</p>
              </div>
              <div className="fabric-card carousel-card">
                <div className="fabric-swatch fabric-swatch--brim"></div>
                <h3 className="card-title">Brim</h3>
                <p className="card-description">Resistente e ideal para uniformes industriais.</p>
              </div>
              <div className="fabric-card carousel-card">
                <div className="fabric-swatch fabric-swatch--piquet"></div>
                <h3 className="card-title">Piquet</h3>
                <p className="card-description">Clássico para polos, com excelente respirabilidade.</p>
              </div>
              <div className="fabric-card carousel-card">
                <div className="fabric-swatch fabric-swatch--moletom"></div>
                <h3 className="card-title">Moletom</h3>
                <p className="card-description">Conforto térmico e ótimo para peças promocionais.</p>
              </div>
              <div className="fabric-card carousel-card">
                <div className="fabric-swatch fabric-swatch--oxford"></div>
                <h3 className="card-title">Oxford</h3>
                <p className="card-description">Acabamento elegante para camisas e jalecos.</p>
              </div>
              <div className="fabric-card carousel-card">
                <div className="fabric-swatch fabric-swatch--dry"></div>
                <h3 className="card-title">Dry Fit</h3>
                <p className="card-description">Leve e funcional para esportes e eventos externos.</p>
              </div>
            </div>
            <button
              className="carousel-btn right"
              onClick={() => scrollCarousel('fabric-carousel', 1, fabricIndexRef, setFabricIndex)}
              aria-label="Próximo"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* --- GALERIA COM CARROSSEL --- */}
      <section id="galeria" className="gallery">
        <div className="gallery-content">
          <h2 className="gallery-title">Nossos Trabalhos</h2>
          <div className="carousel-wrapper">
            <button
              className="carousel-btn left"
              onClick={() => scrollCarousel('gallery-carousel', -1, galleryIndexRef, setGalleryIndex)}
              aria-label="Anterior"
            >
              ‹
            </button>
            <div
              className="carousel-container"
              id="gallery-carousel"
              onMouseEnter={() => stopCarousel(galleryIntervalRef)}
              onMouseLeave={() => startCarousel('gallery-carousel', galleryIndexRef, setGalleryIndex, galleryIntervalRef, 3500)}
              onTouchStart={() => stopCarousel(galleryIntervalRef)}
              onTouchEnd={() => startCarousel('gallery-carousel', galleryIndexRef, setGalleryIndex, galleryIntervalRef, 3500)}
            >
              
              {/* Card 1 */}
              <div className="gallery-card carousel-card">
                <img src="/camisetaPolo.jpg" alt="Camisetas e Polos" className="card-image" loading="lazy" />
                <h3 className="card-title">Camisetas e Polos</h3>
                <p className="card-description">Uniformes personalizados com bordados e estampas.</p>
              </div>

              {/* Card 2 */}
              <div className="gallery-card carousel-card">
                <img src="/bone%20bordado.webp" alt="Bonés e Acessórios" className="card-image" loading="lazy" />
                <h3 className="card-title">Bonés e Acessórios</h3>
                <p className="card-description">Logotipos e marcas bordadas com precisão.</p>
              </div>

              {/* Card 3 */}
              <div className="gallery-card carousel-card">
                <img src="/aventalBordado.jpg" alt="Aventais" className="card-image" loading="lazy" />
                <h3 className="card-title">Aventais</h3>
                <p className="card-description">Todo tipo de avental para sua equipe.</p>
              </div>

              {/* Card 4 */}
              <div className="gallery-card carousel-card">
                <img src="/image.png" alt="Jaquetas Personalizadas" className="card-image" loading="lazy" />
                <h3 className="card-title">Jaquetas Personalizadas</h3>
                <p className="card-description">Estilo e conforto com bordados exclusivos.</p>
              </div>

              {/* Card 5 */}
              <div className="gallery-card carousel-card">
                <img src="/camisetaSocial.webp" alt="Camisas Sociais" className="card-image" loading="lazy" />
                <h3 className="card-title">Camisas Sociais</h3>
                <p className="card-description">Elegância para eventos e empresas.</p>
              </div>

              {/* Card 6 */}
              <div className="gallery-card carousel-card">
                <img src="/moletom.jpg" alt="Moletons Bordados" className="card-image" loading="lazy" />
                <h3 className="card-title">Moletons Bordados</h3>
                <p className="card-description">Conforto e identidade visual para sua equipe.</p>
              </div>

              {/* Card 7 */}
              <div className="gallery-card carousel-card">
                <img src="/camisetaTime.jpg" alt="Camisas de Time" className="card-image" loading="lazy" />
                <h3 className="card-title">Camisas de Time</h3>
                <p className="card-description">Uniformes esportivos personalizados.</p>
              </div>

              {/* Card 8 */}
              <div className="gallery-card carousel-card">
                <img src="/jaleco.jpeg" alt="Jalecos Profissionais" className="card-image" loading="lazy" />
                <h3 className="card-title">Jalecos Profissionais</h3>
                <p className="card-description">Proteção e estilo para profissionais da saúde.</p>
              </div>

              {/* Card 9 */}
              <div className="gallery-card carousel-card">
                <img src="/camisetaEvento.jpg" alt="Camisas de Evento" className="card-image" loading="lazy" />
                <h3 className="card-title">Camisas de Evento</h3>
                <p className="card-description">Uniformes para feiras, congressos e promoções.</p>
              </div>

              {/* Card 10 */}
              <div className="gallery-card carousel-card">
                <img src="/colete.jpg" alt="Coletes Personalizados" className="card-image" loading="lazy" />
                <h3 className="card-title">Coletes Personalizados</h3>
                <p className="card-description">Praticidade e identidade visual para sua equipe.</p>
              </div>

              {/* Card 11 */}
              <div className="gallery-card carousel-card">
                <img src="/cal%C3%A7aBlim.webp" alt="Calças Brim" className="card-image" loading="lazy" />
                <h3 className="card-title">Calças Brim</h3>
                <p className="card-description">Proteção e conforto para sua equipe.</p>
              </div>

              {/* Card 12 */}
              <div className="gallery-card carousel-card">
                <img src="/cal%C3%A7aCargo.jpg" alt="Calça Cargo" className="card-image" loading="lazy" />
                <h3 className="card-title">Calça Cargo</h3>
                <p className="card-description">Praticidade, estilo e conforto para sua equipe.</p>
              </div>

            </div>
            <button
              className="carousel-btn right"
              onClick={() => scrollCarousel('gallery-carousel', 1, galleryIndexRef, setGalleryIndex)}
              aria-label="Próximo"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section id="contato" className="contact">
        <div className="contact-content">
          <h2 className="contact-title">Solicite seu Orçamento</h2>
          <p className="contact-subtitle">
            Preencha o formulário abaixo e entraremos em contato em até 72 horas úteis.
          </p>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-grid">
              <div className="form-group">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="telefone"
                  placeholder="Telefone/WhatsApp"
                  value={formData.telefone || ''}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="localidade"
                  placeholder="Localidade"
                  value={formData.localidade || ''}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              {/* Select de Serviço */}
              <div className="form-group">
                <select
                  name="servico"
                  value={formData.servico || ''}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="" disabled>Selecione o serviço</option>
                  <option value="bordado">Bordado</option>
                  <option value="silk">Silk</option>
                  <option value="uniformes">Uniformes</option>
                </select>
              </div>

              <select
                name="tipoPessoa"
                value={formData.tipoPessoa || ''}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="" disabled>Selecione o tipo de pessoa</option>
                <option value="fisica">Pessoa Física</option>
                <option value="juridica">Pessoa Jurídica</option>
              </select>

            </div>  

            {/* Campo de mensagem */}
            <div className="form-group">
              <textarea
                name="mensagem"
                placeholder="Descreva seu projeto (quantidade, prazo, especificações técnicas, etc.)"
                value={formData.mensagem}
                onChange={handleChange}
                required
                className="form-textarea"
                rows="5"
              ></textarea>
            </div>

            {/* Botao de envio */}
            <button type="submit" className="form-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar Orçamento'}
            </button>

            {/* Mensagens de status */}
            {submitStatus === 'success' && (
              <div className="submit-message success">
                Orçamento enviado com sucesso! Entraremos em contato em breve.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="submit-message error">
                Erro ao enviar orçamento. Tente novamente ou entre em contato diretamente pelo WhatsApp.
              </div>
            )}
          </form>
        </div>
      </section>

      <section id="contato-info" className="contact-info">
        <div className="contact-info-content">
          <h2 className="contact-info-title">Nossas Informações</h2>
          <div className="contact-info-grid">
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">Local</div>
                <div className="contact-text">
                  <h3>Endereço</h3>
                  <p>Rua da Jandira 001<br />Jardim das Maria- Barueri/SP<br />CEP: 01100-000</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">Fone</div>
                <div className="contact-text">
                  <h3>Telefone</h3>
                  <p>(11)01014-3030</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">Email</div>
                <div className="contact-text">
                  <h3>E-mail</h3>
                  <p>contato@bordadosesilks.com.br<br /></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">Hora</div>
                <div className="contact-text">
                  <h3>Horário de Funcionamento</h3>
                  <p>Segunda a Quinta: 8h às 19:30h<br />Sexta: 8h às 20h</p>
                </div>
              </div>
            </div>
            <div className="map-container">
              <h3>Localização</h3>
              <div className="map-placeholder">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d914.7141977133563!2d-46.871126730427676!3d-23.501667198677563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf03cec236f81d%3A0x128892c5bd46c26e!2sR.%20Profa.%20Ivani%20Maria%20Paes%2C%2096-156%20-%20Jardim%20dos%20Camargos%2C%20Barueri%20-%20SP%2C%2006410-070!5e0!3m2!1spt-BR!2sbr!4v1768787602461!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="300"
                  style={{border: '0'}}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Loja">
                </iframe>
              </div>
              <a
                className="map-link"
                href="https://www.google.com/maps/search/?api=1&query=Rua%20da%20Jandira%20001%20Barueri%20SP"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="depoimentos" className="testimonials">
        <div className="testimonials-content">
          <h2 className="testimonials-title">O que nossos clientes dizem</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">“Entrega rápida, acabamento perfeito e atendimento excelente. Voltaremos a fazer com certeza.”</p>
              <span className="testimonial-author">Mariana S. · Eventos</span>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">“Os uniformes ficaram impecáveis e com ótima durabilidade. Recomendo.”</p>
              <span className="testimonial-author">Carlos M. · Restaurante</span>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">“Muito capricho no bordado e prazo cumprido. Atendimento profissional.”</p>
              <span className="testimonial-author">Renata V. · Clínica</span>
            </div>
          </div>
        </div>
      </section>

      <a className="whatsapp-float" href="https://wa.me/5511970648133" target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 Bordados e silk. Todos os direitos reservados.</p>
          <p>CNPJ: 00.111.000\0001-11</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
