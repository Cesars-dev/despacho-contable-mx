import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    ArrowRight, MessageCircle, Shield, TrendingUp, FileCheck,
    BookOpen, Menu, X, Phone, Mail, Clock, CheckCircle2
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   NAVBAR
═══════════════════════════════════════ */
function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', fn)
        return () => window.removeEventListener('scroll', fn)
    }, [])

    const links = [
        { label: 'Servicios', href: '#servicios' },
        { label: 'Nosotros', href: '#nosotros' },
        { label: 'Proceso', href: '#proceso' },
        { label: 'FAQ', href: '#faq' },
    ]

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
            <a href="#inicio" className="navbar-logo" aria-label="Inicio">
                Despacho<span className="navbar-logo-dot"></span>
            </a>
            <ul className="navbar-links" id="main-nav">
                {links.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
            <a href="#contacto" className="btn btn-teal navbar-cta" id="nav-cta">
                Diagnóstico Gratuito
            </a>
            <button
                className="navbar-mobile-toggle"
                onClick={() => setOpen(!open)}
                aria-label="Menú móvil"
                aria-expanded={open}
            >
                {open ? <X size={22} /> : <Menu size={22} />}
            </button>
            {open && (
                <div className="mobile-drawer">
                    {links.map(l => (
                        <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
                    ))}
                    <a href="#contacto" className="btn btn-teal" style={{ alignSelf: 'flex-start', marginTop: '1.5rem' }} onClick={() => setOpen(false)}>
                        Diagnóstico Gratuito <ArrowRight size={15} />
                    </a>
                </div>
            )}
        </nav>
    )
}

/* ═══════════════════════════════════════
   HERO — Split Screen
═══════════════════════════════════════ */
function Hero() {
    const ref = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.15 })
            tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
                .from('.hero-h1', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.3')
                .from('.hero-h1-sub', { opacity: 0, y: 25, duration: 0.7, ease: 'power3.out' }, '-=0.4')
                .from('.hero-desc', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
                .from('.hero-ctas', { opacity: 0, y: 18, duration: 0.5, ease: 'power3.out' }, '-=0.35')
                .from('.hero-trust', { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' }, '-=0.25')
                .from('.hero-right', { opacity: 0, x: 40, duration: 0.8, ease: 'power3.out' }, '-=0.8')
                .from('.hero-stat-card', { opacity: 0, y: 20, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.15 }, '-=0.4')
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section className="hero" id="inicio" ref={ref} aria-label="Sección principal">
            {/* LEFT */}
            <div className="hero-left">
                <div className="hero-eyebrow">
                    <span className="hero-eyebrow-line" aria-hidden="true"></span>
                    Despacho Contable &amp; Fiscal · México
                </div>

                <h1 className="hero-h1">Tu situación fiscal<br />tiene solución.</h1>
                <p className="hero-h1-sub">
                    Llevamos años resolviendo lo<br />que el tiempo complicó.
                </p>

                <p className="hero-desc">
                    Despacho contable especializado en regularización, RESICO, contabilidad corporativa
                    y auditoría fiscal. 100% remoto. Sin papeleo innecesario. Sin juicios.
                </p>

                <div className="hero-ctas">
                    <a href="#contacto" className="btn btn-navy" id="hero-cta-1" style={{ background: 'var(--navy)', color: 'var(--white)', boxShadow: '0 4px 20px rgba(15,34,65,0.25)' }}>
                        Quiero regularizarme <ArrowRight size={15} />
                    </a>
                    <a href="#servicios" className="btn btn-outline" id="hero-cta-2">
                        Ver servicios
                    </a>
                </div>

                <div className="hero-trust">
                    {[
                        'Sin compromiso · Respuesta en 24 hrs',
                        'Servicio 100% remoto en todo México',
                        'Más de 500 contribuyentes regularizados',
                    ].map((t, i) => (
                        <div key={i} className="hero-trust-item">
                            <span className="hero-trust-check" aria-hidden="true">✓</span>
                            {t}
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT */}
            <div className="hero-right">
                <img
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=900&q=85&auto=format&fit=crop"
                    alt="Profesionales de contabilidad en reunión de trabajo"
                    loading="eager"
                />
                <div className="hero-right-overlay" aria-hidden="true"></div>

                <div className="hero-stat-card hero-stat-card-1">
                    <div className="hero-stat-num">+500</div>
                    <div className="hero-stat-label">Contribuyentes regularizados</div>
                </div>
                <div className="hero-stat-card hero-stat-card-2">
                    <div className="hero-stat-num">24h</div>
                    <div className="hero-stat-label">Tiempo de respuesta máx.</div>
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════
   PROBLEM SECTION
═══════════════════════════════════════ */
function ProblemSection() {
    const ref = useRef(null)

    const pains = [
        { label: '01', text: 'Llevas meses —o años— sin presentar declaraciones y ya no sabes ni por dónde empezar.' },
        { label: '02', text: 'El SAT bloqueó tus Certificados de Sello Digital (CSD) y ya no puedes facturar.' },
        { label: '03', text: 'Llegaron requerimientos a tu Buzón Tributario y los has ignorado porque no entiendes qué dicen.' },
        { label: '04', text: 'Pagas más impuestos de lo que deberías y nadie te ha explicado cómo cambiarlo legalmente.' },
        { label: '05', text: 'Tienes una empresa que crece, pero tu contabilidad sigue siendo un Excel desactualizado.' },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.problem-left', { opacity: 0, x: -40, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.problem-layout', start: 'top 80%' } })
            gsap.from('.pain-card', { opacity: 0, x: 30, duration: 0.6, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.problem-list', start: 'top 82%' } })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section className="section problem-section" id="problema" ref={ref} aria-label="Problemas fiscales comunes">
            <div className="container">
                <div className="problem-layout">
                    <div className="problem-left">
                        <div className="tag section-tag">¿Te suena familiar?</div>
                        <h2 className="section-title" style={{ marginTop: '1rem' }}>
                            Estos son los problemas que<br />resolvemos <em>todos los días.</em>
                        </h2>
                        <p className="section-sub">
                            No estás solo. Y todos tienen solución.
                        </p>
                        <a href="#contacto" className="btn btn-teal" style={{ marginTop: '2rem' }} id="problem-cta">
                            Hablar con un experto <ArrowRight size={15} />
                        </a>
                    </div>
                    <ul className="problem-list" role="list">
                        {pains.map((p, i) => (
                            <li key={i} className="pain-card">
                                <span className="pain-number">{p.label}</span>
                                <p className="pain-text">{p.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════
   SERVICES — Bento Grid
═══════════════════════════════════════ */
function ServicesSection() {
    const ref = useRef(null)

    const services = [
        {
            num: '01',
            icon: <FileCheck size={20} />,
            title: 'La sala de emergencias fiscal que tu negocio necesitaba.',
            category: 'Regularización & Puesta al Día',
            desc: 'Descargamos tu historial completo de CFDI directamente del portal del SAT, reconstruimos tu contabilidad desde cero y presentamos todas tus declaraciones pendientes — sin que tengas que buscar ni un solo comprobante.',
            list: ['Descarga masiva y automatizada de CFDIs históricos', 'Reconstrucción contable por ejercicio fiscal', 'Declaraciones mensuales y anuales atrasadas', 'Gestión de requerimientos del Buzón Tributario', 'Plan de regularización con cronograma claro'],
            cta: 'Quiero regularizarme',
            micro: 'Hemos resuelto casos con hasta 7 años de atraso.',
            span: 'bento-card',
            accent: false,
        },
        {
            num: '02',
            icon: <TrendingUp size={20} />,
            title: 'Paga lo justo. Ni un peso más.',
            category: 'RESICO',
            desc: 'El RESICO existe para que pagues tasas preferenciales de forma completamente legal. Nosotros lo gestionamos de principio a fin.',
            list: ['Evaluación de elegibilidad y transición', 'Declaraciones mensuales (DIOT, ISR, IVA)', 'Optimización fiscal dentro del marco legal', 'Panel de seguimiento en tiempo real'],
            cta: 'Optimizar mis impuestos',
            micro: 'Personas físicas. Ingresos hasta $3.5M anuales.',
            span: 'bento-card',
            accent: false,
        },
        {
            num: '03',
            icon: <BookOpen size={20} />,
            title: 'Tu contabilidad es tu herramienta de decisión más poderosa.',
            category: 'Contabilidad Personas Morales',
            desc: 'No solo llevamos libros. Somos el socio estratégico que tu empresa necesita para escalar sin riesgos fiscales. Reportes accionables, indicadores clave, planeación estratégica.',
            list: ['Contabilidad mensual y cierre financiero', 'Estados financieros con análisis ejecutivo', 'Planeación fiscal anual', 'Asesoría en estructuración corporativa'],
            cta: 'Contabilidad estratégica',
            micro: 'Para empresas que ya crecieron.',
            span: 'bento-card-wide',
            accent: true,
        },
        {
            num: '04',
            icon: <Shield size={20} />,
            title: 'El SAT ya tiene algoritmos. Tú necesitas un escudo.',
            category: 'Auditoría y Dictamen Fiscal',
            desc: 'Nuestros servicios de auditoría preventiva están diseñados para blindar tu empresa antes de que llegue la revisión — no después.',
            list: ['Auditoría preventiva con enfoque en riesgos', 'Dictamen fiscal voluntario', 'Atención de revisiones electrónicas'],
            cta: 'Proteger mi empresa',
            micro: 'Prevenir siempre cuesta menos que defender.',
            span: 'bento-card-narrow',
            accent: false,
        },
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.services-header', { opacity: 0, y: 35, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.services-header', start: 'top 85%' } })
            gsap.from('.service-card', { opacity: 0, y: 45, duration: 0.65, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: '.bento-grid', start: 'top 82%' } })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section className="section services-section" id="servicios" ref={ref} aria-label="Nuestros servicios">
            <div className="container">
                <div className="services-header">
                    <div>
                        <div className="tag section-tag">Los 4 Pilares</div>
                        <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
                            Lo que hacemos —<br />y por qué lo hacemos <em>diferente</em>
                        </h2>
                    </div>
                    <a href="#contacto" className="btn btn-outline" id="services-header-cta">
                        Diagnóstico gratuito <ArrowRight size={15} />
                    </a>
                </div>

                <div className="bento-grid">
                    {services.map((s, i) => (
                        <article
                            key={i}
                            className={`service-card ${s.span} ${s.accent ? 'service-card-accent' : ''}`}
                            aria-label={s.category}
                        >
                            <div className="service-icon-wrap" aria-hidden="true">{s.icon}</div>
                            <div className="service-num">{s.num} — {s.category}</div>
                            <h3 className="service-title">{s.title}</h3>
                            <p className="service-desc">{s.desc}</p>
                            <ul className="service-list">
                                {s.list.map((item, j) => <li key={j}>{item}</li>)}
                            </ul>
                            <a
                                href="#contacto"
                                className={`btn ${s.accent ? 'btn-teal' : 'btn-primary'}`}
                                id={`service-cta-${i + 1}`}
                                style={{ alignSelf: 'flex-start' }}
                            >
                                {s.cta} <ArrowRight size={14} />
                            </a>
                            <p className="service-micro">{s.micro}</p>
                            <span className="bento-deco-num" aria-hidden="true">0{i + 1}</span>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════
   FEATURES — Interactive Cards
═══════════════════════════════════════ */
function ShufflerCard() {
    const items = [
        { title: 'CASO #1847 — REGULARIZACIÓN', body: '4 años de atraso eliminados. CSD reactivado en 6 semanas. Declaraciones enviadas al SAT.' },
        { title: 'CASO #2031 — RESICO', body: 'Reducción del 38% en carga fiscal anual. Transición limpia y documentada.' },
        { title: 'CASO #2198 — AUDITORÍA', body: 'Inconsistencia detectada. Crédito fiscal de $400,000 evitado antes de visita del SAT.' },
    ]
    const [order, setOrder] = useState([0, 1, 2])
    useEffect(() => {
        const id = setInterval(() => setOrder(prev => { const n = [...prev]; n.push(n.shift()); return n }), 3000)
        return () => clearInterval(id)
    }, [])
    return (
        <>
            <p className="feature-label">Casos Resueltos</p>
            <p className="feature-sub">Resultados reales, en tiempo real</p>
            <div className="shuffler-stack" style={{ flex: 1, position: 'relative', minHeight: 120 }}>
                {order.map((idx, pos) => (
                    <div key={idx} className={`shuffler-item pos-${pos}`}>
                        <div className="shuffler-title">{items[idx].title}</div>
                        <div className="shuffler-body">{items[idx].body}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

function TypewriterCard() {
    const msgs = [
        'Conectando con portal SAT...',
        'Descargando CFDIs 2019-2024...',
        'Analizando 1,847 facturas...',
        'Detectando inconsistencias fiscales...',
        'Preparando declaraciones pendientes...',
        'Enviado al SAT. Estado: ACEPTADO ✓',
    ]
    const [displayed, setDisplayed] = useState('')
    const [mIdx, setMIdx] = useState(0)
    const [cIdx, setCIdx] = useState(0)
    const [del, setDel] = useState(false)

    useEffect(() => {
        const msg = msgs[mIdx]
        let t
        if (!del && cIdx < msg.length) t = setTimeout(() => setCIdx(c => c + 1), 38)
        else if (!del && cIdx === msg.length) t = setTimeout(() => setDel(true), 1800)
        else if (del && cIdx > 0) t = setTimeout(() => setCIdx(c => c - 1), 16)
        else if (del && cIdx === 0) { setDel(false); setMIdx(m => (m + 1) % msgs.length) }
        setDisplayed(msg.slice(0, cIdx))
        return () => clearTimeout(t)
    }, [cIdx, del, mIdx])

    return (
        <>
            <p className="feature-label">Proceso Automatizado</p>
            <p className="feature-sub">Así digitalizamos tu situación fiscal</p>
            <div className="typewriter-terminal" style={{ flex: 1 }}>
                <div className="terminal-bar">
                    <div className="terminal-dots">
                        <span></span><span></span><span></span>
                    </div>
                    <span className="terminal-title-bar">sat-connect.sh</span>
                </div>
                <div className="terminal-text">
                    <span className="terminal-prompt">$ </span>
                    {displayed}
                    <span className="terminal-cursor"></span>
                </div>
            </div>
        </>
    )
}

function SchedulerCard() {
    const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
    const [activeDay, setActiveDay] = useState(2)
    const weeks = [
        [0, 0, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0],
    ]
    useEffect(() => {
        const wd = [1, 2, 3, 4, 5]
        let d = 0
        const id = setInterval(() => { d = (d + 1) % wd.length; setActiveDay(wd[d]) }, 1800)
        return () => clearInterval(id)
    }, [])
    return (
        <>
            <p className="feature-label">Declaraciones Puntuales</p>
            <p className="feature-sub">Nunca pierdas una fecha límite del SAT</p>
            <div className="cal-wrap">
                <p className="cal-month">Marzo 2025 — Obligaciones</p>
                <div className="cal-grid">
                    {days.map((d, i) => <div key={i} className="cal-cell header">{d}</div>)}
                    {weeks.flat().map((marked, i) => {
                        const col = i % 7
                        return (
                            <div key={i} className={`cal-cell ${col === activeDay ? 'active' : marked ? 'marked' : ''}`}>
                                {col === activeDay ? '✓' : marked ? '•' : ''}
                            </div>
                        )
                    })}
                </div>
                <div className="upcoming-label">
                    <span className="upcoming-dot"></span>
                    Próxima: 17 Mar · Declaración mensual ISR
                </div>
            </div>
        </>
    )
}

function FeaturesSection() {
    const ref = useRef(null)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.feature-card', { opacity: 0, y: 40, duration: 0.65, ease: 'power3.out', stagger: 0.14, scrollTrigger: { trigger: '.features-grid', start: 'top 82%' } })
        }, ref)
        return () => ctx.revert()
    }, [])
    return (
        <section className="section features-section" id="tecnologia" ref={ref} aria-label="Cómo trabajamos">
            <div className="container">
                <div className="features-header">
                    <div className="tag section-tag">Tecnología</div>
                    <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
                        Usamos tecnología donde<br />otros usan <em>tiempo</em>
                    </h2>
                    <p className="section-sub" style={{ marginInline: 'auto' }}>
                        Automatización + experiencia = resultados que a tu antiguo contador le tomaría meses.
                    </p>
                </div>
                <div className="features-grid">
                    <div className="feature-card"><ShufflerCard /></div>
                    <div className="feature-card"><TypewriterCard /></div>
                    <div className="feature-card"><SchedulerCard /></div>
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════
   WHY US — Dark Section
═══════════════════════════════════════ */
function WhySection() {
    const ref = useRef(null)
    const rows = [
        ['Respuestas a destiempo o nunca', 'Respuesta garantizada en menos de 24 hrs'],
        ['Procesos manuales y papeleo físico', 'Tecnología, descarga masiva de CFDI automatizada'],
        ['"Mándame tus facturas" cada mes', 'Nosotros las descargamos directamente del SAT'],
        ['Números sin contexto ni análisis', 'Estados financieros que puedes leer y entender'],
        ['Te enteraste del problema cuando era tarde', 'Monitoreo continuo y alertas preventivas'],
    ]
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.why-header', { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.why-section', start: 'top 80%' } })
            gsap.from('.comparator-wrap', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.comparator-wrap', start: 'top 82%' } })
        }, ref)
        return () => ctx.revert()
    }, [])
    return (
        <section className="section why-section" id="nosotros" ref={ref} aria-label="Por qué elegirnos">
            <div className="container">
                <div className="why-header">
                    <div>
                        <div className="tag" style={{ borderColor: 'rgba(26,153,138,0.4)', color: 'var(--teal-mid)' }}>La Diferencia</div>
                        <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
                            No somos el contador de siempre.<br />
                            Y eso es exactamente <em>el punto.</em>
                        </h2>
                    </div>
                    <p className="section-sub">
                        Usamos tecnología donde otros usan tiempo. Eso nos permite ser más rápidos, más precisos
                        y más accesibles de lo que imaginas.
                    </p>
                </div>
                <div className="comparator-wrap" role="table" aria-label="Comparación">
                    <div className="comp-col them">
                        <div className="comp-col-header"><X size={13} /> Otros despachos</div>
                        {rows.map((r, i) => <div key={i} className="comp-cell" role="cell">{r[0]}</div>)}
                    </div>
                    <div className="comp-col us">
                        <div className="comp-col-header"><CheckCircle2 size={13} /> Con nosotros</div>
                        {rows.map((r, i) => <div key={i} className="comp-cell" role="cell">{r[1]}</div>)}
                    </div>
                </div>
                <p className="why-tagline">
                    El SAT ya usa inteligencia artificial para detectar inconsistencias.
                    Nosotros también, pero <em>a tu favor.</em>
                </p>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════
   PHILOSOPHY
═══════════════════════════════════════ */
function PhilosophySection() {
    const ref = useRef(null)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.philosophy-before', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.philosophy-content', start: 'top 78%' } })
            gsap.from('.philosophy-headline', { opacity: 0, y: 45, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.philosophy-headline', start: 'top 85%' } })
        }, ref)
        return () => ctx.revert()
    }, [])
    return (
        <section className="section philosophy-section" id="filosofia" ref={ref} aria-label="Nuestra filosofía">
            <div className="philosophy-bg" aria-hidden="true"></div>
            <div className="container">
                <div className="philosophy-content">
                    <p className="philosophy-before">
                        La mayoría de los despachos contables se enfocan en entregar declaraciones a tiempo,
                        cobrar una mensualidad fija y mantenerte al día con el SAT. Nada más.
                    </p>
                    <h2 className="philosophy-headline">
                        Nosotros nos enfocamos en convertir<br />
                        tu contabilidad en tu<br />
                        <em>ventaja competitiva.</em>
                    </h2>
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════
   PROCESS
═══════════════════════════════════════ */
function ProcessSection() {
    const ref = useRef(null)

    const steps = [
        {
            num: '01',
            title: 'Diagnóstico gratuito',
            desc: 'Platicamos 30 minutos. Nos cuentas tu situación sin filtros. Te decimos exactamente qué necesitas, cuánto cuesta y cuánto tiempo toma. Sin rodeos.',
        },
        {
            num: '02',
            title: 'Nos ponemos a trabajar',
            desc: 'Tú nos das acceso al portal del SAT. Nosotros hacemos el resto: descargamos, analizamos, organizamos y ejecutamos. Tu participación es mínima.',
        },
        {
            num: '03',
            title: 'Tú retomas el control',
            desc: 'Te entregamos tu situación resuelta, tu contabilidad al corriente y un plan claro. Seguimos contigo mes a mes si lo deseas.',
        },
    ]

    /* ── SVGs for each step ── */
    const Svg1 = () => (
        <svg className="step-svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
            <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
            <g style={{ transformOrigin: '55px 55px', animation: 'spin 14s linear infinite' }}>
                {[...Array(8)].map((_, i) => (
                    <circle key={i}
                        cx={55 + 38 * Math.cos(i * Math.PI / 4)}
                        cy={55 + 38 * Math.sin(i * Math.PI / 4)}
                        r="5" fill="var(--teal)" opacity={0.35 + i * 0.07}
                    />
                ))}
            </g>
            <circle cx="55" cy="55" r="18" stroke="var(--teal)" strokeWidth="1.5" fill="none" opacity="0.5" />
            <circle cx="55" cy="55" r="32" stroke="var(--teal)" strokeWidth="0.75" fill="none" opacity="0.25" />
        </svg>
    )

    const Svg2 = () => {
        const [x, setX] = useState(0)
        useEffect(() => { const id = setInterval(() => setX(v => (v + 2) % 110), 20); return () => clearInterval(id) }, [])
        return (
            <svg className="step-svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
                {[...Array(5)].map((_, r) =>
                    [...Array(7)].map((_, c) => (
                        <rect key={`${r}-${c}`} x={10 + c * 14} y={20 + r * 15} width="8" height="8" rx="2"
                            fill="var(--teal)" opacity={Math.abs(10 + c * 14 - x) < 16 ? 0.8 : 0.12} />
                    ))
                )}
                <line x1={x} y1="10" x2={x} y2="100" stroke="var(--teal)" strokeWidth="1" opacity="0.45" />
            </svg>
        )
    }

    const Svg3 = () => {
        const [offset, setOffset] = useState(0)
        useEffect(() => { const id = setInterval(() => setOffset(o => (o + 1.2) % 180), 16); return () => clearInterval(id) }, [])
        return (
            <svg className="step-svg" width="110" height="110" viewBox="0 0 110 110" fill="none">
                <path d="M5,55 C18,28 28,82 42,55 C56,28 66,82 80,55 C94,28 104,82 110,55"
                    stroke="var(--teal)" strokeWidth="1.5" fill="none" opacity="0.2" />
                <path d="M5,55 C18,28 28,82 42,55 C56,28 66,82 80,55 C94,28 104,82 110,55"
                    stroke="var(--teal)" strokeWidth="2" fill="none"
                    strokeDasharray="180" strokeDashoffset={offset} opacity="0.85" />
                <circle cx="55" cy="55" r="5" fill="var(--teal)" opacity="0.6">
                    <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
        )
    }

    const svgs = [<Svg1 />, <Svg2 />, <Svg3 />]

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.process-left', { opacity: 0, x: -40, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.process-layout', start: 'top 80%' } })
            gsap.from('.process-step', { opacity: 0, x: 30, duration: 0.6, ease: 'power3.out', stagger: 0.15, scrollTrigger: { trigger: '.process-steps', start: 'top 82%' } })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section className="section process-section" id="proceso" ref={ref} aria-label="Nuestro proceso">
            <div className="container">
                <div className="process-layout">
                    <div className="process-left">
                        <div className="tag section-tag">Así de simple es empezar</div>
                        <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
                            Tres pasos para resolver<br />tu <em>situación fiscal</em>
                        </h2>
                        <p className="section-sub">
                            Sin burocracia. Sin papeleo físico. Solo resultados.
                        </p>
                        <a href="#contacto" className="btn btn-teal" style={{ marginTop: '2rem' }} id="process-cta">
                            Empezar ahora <ArrowRight size={15} />
                        </a>
                    </div>
                    <div className="process-steps">
                        {steps.map((s, i) => (
                            <article key={i} className="process-step" aria-label={`Paso ${s.num}`}>
                                <span className="step-num">{s.num}</span>
                                <div>
                                    <h3 className="step-title">{s.title}</h3>
                                    <p className="step-desc">{s.desc}</p>
                                </div>
                                {svgs[i]}
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════ */
function TestimonialsSection() {
    const ref = useRef(null)
    const testimonials = [
        { quote: 'Llevaba 3 años sin declarar. Pensé que era demasiado tarde. En 6 semanas estaba regularizado y ya puedo volver a facturar. Ojalá hubiera llamado antes.', name: 'Ricardo M.', role: 'Empresario · CDMX' },
        { quote: 'Me cobran la mitad de lo que pagaba antes con mi antiguo contador, y ahora sí entiendo mis estados financieros. Eso no tiene precio.', name: 'Alejandra V.', role: 'Consultora Independiente · Monterrey' },
        { quote: 'Nos detectaron una inconsistencia antes de que llegara el SAT. Nos ahorramos un crédito fiscal de más de $400,000 pesos.', name: 'Constructora del Norte', role: 'Empresa · Chihuahua' },
    ]
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.testi-card', { opacity: 0, y: 40, duration: 0.65, ease: 'power3.out', stagger: 0.14, scrollTrigger: { trigger: '.testimonials-grid', start: 'top 82%' } })
        }, ref)
        return () => ctx.revert()
    }, [])
    return (
        <section className="section testimonials-section" id="testimonios" ref={ref} aria-label="Testimonios">
            <div className="container">
                <div className="testimonials-header">
                    <div className="tag section-tag">Prueba Social</div>
                    <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
                        Lo que dicen quienes<br />ya lo <em>resolvieron</em>
                    </h2>
                </div>
                <div className="testimonials-grid">
                    {testimonials.map((t, i) => (
                        <article key={i} className="testi-card" aria-label={`Testimonio de ${t.name}`}>
                            <div className="testi-stars" aria-label="5 estrellas">★★★★★</div>
                            <blockquote className="testi-quote">"{t.quote}"</blockquote>
                            <div className="testi-divider"></div>
                            <footer>
                                <p className="testi-name">{t.name}</p>
                                <p className="testi-role">{t.role}</p>
                            </footer>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════
   FAQ
═══════════════════════════════════════ */
function FAQSection() {
    const ref = useRef(null)
    const [open, setOpen] = useState(null)
    const faqs = [
        { q: '¿Pueden regularizarme aunque lleve más de 3 años sin declarar?', a: 'Sí. Hemos resuelto casos con hasta 7 años de atraso. La clave está en la descarga masiva de CFDI y en saber exactamente qué presentar y en qué orden para minimizar recargos y multas.' },
        { q: '¿Tienen que venir a mi negocio o todo es remoto?', a: 'Todo es 100% remoto. Solo necesitamos acceso a tu portal del SAT y comunicación por videollamada o mensajería. Tenemos clientes en todo México.' },
        { q: '¿Cuánto cuesta regularizarme?', a: 'Depende de los años de atraso y el volumen de operaciones. Por eso ofrecemos un diagnóstico gratuito primero: para darte un precio real, no un estimado genérico.' },
        { q: '¿Puedo cambiarme al RESICO si tengo deudas con el SAT?', a: 'En la mayoría de los casos, primero hay que regularizar y luego migrar al régimen. Te guiamos en ese proceso paso a paso.' },
        { q: '¿Qué pasa si ya me llegó una notificación del SAT?', a: 'No la ignores más. Entre más tiempo pase, más costosa se vuelve la situación. Contáctanos hoy y revisamos qué tipo de notificación es y qué acción tomar.' },
    ]
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.faq-left', { opacity: 0, x: -40, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.faq-layout', start: 'top 80%' } })
            gsap.from('.faq-item', { opacity: 0, x: 30, duration: 0.55, ease: 'power3.out', stagger: 0.09, scrollTrigger: { trigger: '.faq-list', start: 'top 82%' } })
        }, ref)
        return () => ctx.revert()
    }, [])
    return (
        <section className="section faq-section" id="faq" ref={ref} aria-label="Preguntas frecuentes">
            <div className="container">
                <div className="faq-layout">
                    <div className="faq-left">
                        <div className="tag section-tag">FAQ</div>
                        <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
                            Lo que todos<br />preguntan antes<br />de <em>llamarnos</em>
                        </h2>
                        <p className="section-sub" style={{ marginTop: '1rem', fontSize: '0.92rem' }}>
                            ¿Tienes una pregunta diferente? Te respondemos en menos de 24 horas.
                        </p>
                        <a href="#contacto" className="btn btn-outline" style={{ marginTop: '2rem' }} id="faq-cta">
                            Hacer una pregunta <ArrowRight size={15} />
                        </a>
                    </div>
                    <dl className="faq-list">
                        {faqs.map((f, i) => (
                            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
                                <dt>
                                    <button
                                        className="faq-q"
                                        onClick={() => setOpen(open === i ? null : i)}
                                        aria-expanded={open === i}
                                        id={`faq-q-${i}`}
                                    >
                                        {f.q}
                                        <span className="faq-icon" aria-hidden="true">+</span>
                                    </button>
                                </dt>
                                <dd className="faq-a" aria-labelledby={`faq-q-${i}`}>
                                    <div className="faq-a-inner">{f.a}</div>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════ */
function CTASection() {
    const ref = useRef(null)
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cta-content > *', { opacity: 0, y: 35, duration: 0.7, ease: 'power3.out', stagger: 0.13, scrollTrigger: { trigger: '.cta-content', start: 'top 80%' } })
        }, ref)
        return () => ctx.revert()
    }, [])
    return (
        <section className="section cta-section" id="contacto" ref={ref} aria-label="Contacto">
            <div className="container">
                <div className="cta-content">
                    <div className="tag" style={{ borderColor: 'rgba(26,153,138,0.4)', color: 'var(--teal-mid)', marginInline: 'auto', marginBottom: '1.5rem' }}>El momento es ahora</div>
                    <h2 className="cta-headline">
                        El mejor momento fue hace un año.<br />
                        El segundo mejor es <em>hoy.</em>
                    </h2>
                    <p className="cta-sub">
                        Cada mes que pasa sin regularizarte, los recargos crecen. Tu CSD sigue suspendido.
                        Y el SAT sigue acumulando datos. Agenda tu diagnóstico gratuito — sin compromiso, sin juicios.
                    </p>
                    <div className="cta-buttons">
                        <a href="tel:+521800000000" className="btn btn-teal" id="final-cta-phone">
                            <Phone size={16} /> Agendar diagnóstico gratuito
                        </a>
                        <a href="https://wa.me/521800000000" className="btn btn-outline-light" id="final-cta-wa" target="_blank" rel="noopener noreferrer">
                            <MessageCircle size={16} /> WhatsApp directo
                        </a>
                    </div>
                    <div className="cta-meta">
                        <span>✦ CONFIDENCIALIDAD TOTAL</span>
                        <span>✦ SIN PRESIÓN DE VENTAS</span>
                        <span>✦ RESPUESTA EN MENOS DE 24H</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="footer" role="contentinfo">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <div className="footer-logo">Despacho<span className="footer-logo-dot"></span></div>
                        <p className="footer-tagline">
                            Contaduría pública y asesoría fiscal en México. 100% remoto. Colegiado y certificado.
                        </p>
                        <div className="footer-status">
                            <span className="footer-status-dot"></span>
                            SISTEMA OPERATIVO
                        </div>
                    </div>
                    <div>
                        <p className="footer-col-label">Servicios</p>
                        <ul className="footer-links">
                            {['Regularización Fiscal', 'RESICO', 'Personas Morales', 'Auditoría y Dictamen'].map(s => (
                                <li key={s}><a href="#servicios">{s}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="footer-col-label">Empresa</p>
                        <ul className="footer-links">
                            {[['Sobre Nosotros', '#nosotros'], ['Cómo Trabajamos', '#proceso'], ['Casos de Éxito', '#testimonios'], ['FAQ', '#faq']].map(([l, h]) => (
                                <li key={l}><a href={h}>{l}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="footer-col-label">Contacto</p>
                        <ul className="footer-links">
                            <li><a href="https://wa.me/521800000000" target="_blank" rel="noopener noreferrer"><MessageCircle size={13} /> WhatsApp directo</a></li>
                            <li><a href="mailto:hola@despachocontable.mx"><Mail size={13} /> hola@despachocontable.mx</a></li>
                            <li><a href="#contacto"><Phone size={13} /> Agendar llamada</a></li>
                            <li style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={13} /> Lun–Vie 9am–6pm CST</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="footer-legal">
                        Despacho Contable. Servicios de contaduría pública y asesoría fiscal en México. Colegiado y certificado.
                        La información contenida en este sitio es de carácter informativo y no constituye asesoría fiscal individualizada.
                    </p>
                    <p className="footer-copy">© {year} Despacho Contable MX</p>
                </div>
            </div>
        </footer>
    )
}

/* ═══════════════════════════════════════
   ROOT
═══════════════════════════════════════ */
export default function App() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <ProblemSection />
                <ServicesSection />
                <FeaturesSection />
                <WhySection />
                <PhilosophySection />
                <ProcessSection />
                <TestimonialsSection />
                <FAQSection />
                <CTASection />
            </main>
            <Footer />
        </>
    )
}
