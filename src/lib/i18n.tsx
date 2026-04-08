"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  es: {
    // Nav
    nav_about: "Sobre mí",
    nav_services: "Servicios",
    nav_projects: "Proyectos",
    nav_education: "Reconocimientos",
    nav_testimonials: "Testimonios",
    nav_contact: "Contacto",
    
    // Hero
    hero_badge: "Disponible para nuevos desafíos",
    hero_title: "Ingeniero Polímata.",
    hero_description: "Me especializo en crear soluciones digitales completas y piezas gráficas para hacer escalar tu negocio. Construyo páginas web y aplicaciones móviles a medida, te ayudo a ahorrar tiempo automatizando los procesos de tu empresa.",
    hero_cta: "Iniciemos un proyecto",
    hero_agile: "Me aseguro de que tu tecnología no solo funcione a la perfección, sino que también destaque y trabaje para ti.",

    // About
    about_eyebrow: "Perfil Personal",
    about_title: "Ingeniería orientada a resultados comerciales.",
    about_intro: "Lo que me diferencia del desarrollador tradicional es mi visión de negocio. Mi experiencia liderando equipos de ventas y optimizando CRMs me enseñó algo clave: la tecnología debe generar resultados rentables. Hoy traduzco esa visión comercial en soluciones digitales completas para empresas:",
    
    about_l1_title: "Desarrollo Web y Móvil",
    about_l1_desc: "Creación de páginas web y aplicaciones nativas para Android e iOS.",
    about_l2_title: "Automatización de Procesos",
    about_l2_desc: "Soluciones digitales para empresas usando n8n, eliminando tareas repetitivas.",
    about_l3_title: "Diseño Gráfico",
    about_l3_desc: "Creación de piezas gráficas y branding visual de alto impacto.",
    about_l4_title: "Ingeniería de Sonido",
    about_l4_desc: "Mezcla y mastering profesional para enriquecer la experiencia del usuario.",
    
    about_conclusion: "Construyo herramientas diseñadas para que\ntu negocio funcione mejor y venda más.",

    // Services
    services_eyebrow: "Capacidades",
    services_title: "Todas estas habilidades a tu disposición.",
    
    serv_1_title: "Desarrollo Web",
    serv_1_desc: "Soluciones de alto rendimiento (React, Next.js, Astro, Tailwind, Node.js).",
    serv_1_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>Más que escribir código, construyo plataformas diseñadas para escalar tu negocio. Desarrollo ecosistemas web rápidos, seguros y optimizados para convertir visitantes en clientes.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>SOLUCIONES CLAVE</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Landing Pages de Alta Conversión</strong> Diseños enfocados en guiar al usuario hacia la acción (ventas o leads).</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Plataformas E-Commerce a Medida</strong> Tiendas online rápidas, seguras y sin las limitaciones de las plantillas tradicionales.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Aplicaciones Web (SaaS) y Portales B2B</strong> Sistemas complejos con bases de datos robustas y paneles de administración a medida.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>EL ENFOQUE POLÍMATA</h4><p class='font-normal leading-relaxed'>A diferencia del desarrollador tradicional, mi base en estrategia de ventas me permite alinear la arquitectura tecnológica con tus objetivos financieros. Cada línea de código está pensada para maximizar el SEO, reducir los tiempos de carga al milisegundo y garantizar una experiencia de usuario impecable.</p></section></div>",
    
    serv_2_title: "Desarrollo Móvil",
    serv_2_desc: "Híbrido y Nativo para iOS / Android.",
    serv_2_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>Diseño y programo aplicaciones móviles a medida para <strong class='font-bold'>iOS (Apple) y Android</strong>. Te ayudo a llevar tu negocio directamente al bolsillo de tus clientes con apps rápidas, seguras y muy fáciles de usar.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>SOLUCIONES CLAVE</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Presencia en ambas tiendas</strong> Uso tecnologías como React Native, Swift y Kotlin para lograr que tu app funcione de forma impecable en App Store y Google Play.</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Rendimiento y Fluidez</strong> Me enfoco en el manejo eficiente de los recursos. Me aseguro de que la experiencia sea instantánea para evitar el abandono del usuario.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Conexión con tu Negocio</strong> Integro la aplicación con tus bases de datos, pasarelas de pago o sistemas actuales (APIs y CRMs) de forma sincronizada.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>EL ENFOQUE POLÍMATA</h4><p class='font-normal leading-relaxed'>Entiendo que una aplicación no es solo código; es una herramienta clave de ventas y fidelización. Aplico mi experiencia comercial y en diseño visual (UI/UX) para asegurar que cada pantalla y cada botón guíen intuitivamente a tu usuario hacia la acción que tu negocio necesita.</p></section></div>",
    
    serv_3_title: "Automatización & IA",
    serv_3_desc: "n8n, Orquestación de APIs y flujos de trabajo.",
    serv_3_detail: "Automatización de procesos empresariales (BPA). Conecto múltiples APIs y agentes de Inteligencia Artificial mediante n8n y Python para reducir tareas manuales en un 90% y potenciar la productividad operativa.",
    
    serv_4_title: "UI/UX & Diseño Gráfico",
    serv_4_desc: "Interfaces, branding y Piezas Gráficas.",
    serv_4_detail: "Diseño de identidad visual e interfaces de usuario clínicas y altamente funcionales utilizando Figma y Adobe Creative Suite. Garantizo accesibilidad, consistencia en Design Systems y flujos de conversión lógicos.",

    serv_5_title: "Ingeniería de Sonido",
    serv_5_desc: "Mixing, Mastering y Audio UX.",
    serv_5_detail: "Mezcla y Mastering acústico utilizando Ableton Live y Pro Tools. Especialización en retroalimentación auditiva (Earcons) interactiva y bandas sonoras espaciales para proyectos inmersivos.",

    // Projects (Case Studies)
    projects_eyebrow: "Proof of Work",
    projects_title: "Implementaciones Recientes.",

    proj_1_title: "Shopify Premium: Estética Apple",
    proj_1_roi: "Aumento drástico en la tasa de conversión mediante reducción de fricción.",
    proj_1_detail: "Transformación de una tienda Shopify estándar (Liquid/CSS) en una experiencia de lujo, replicando la ingeniería de diseño y psicología de usuario de Apple. Transmite autoridad inmediata, optimizada para móviles, y diseñada para cerrar ventas en muy pocos clicks.",
    proj_1_tags: "Shopify, Liquid, CRO, UI/UX",
    proj_1_date: "2024",

    proj_2_title: "E-Commerce de Lujo: 'Symetria'",
    proj_2_roi: "Ecosistema interactivo superando los límites nativos.",
    proj_2_detail: "Creación de un ecosistema digital de altísimo rendimiento para Retail Premium. Incluye carruseles de scroll infinito con lógica matemática (Alpine.js) e interfaces 'Shop the Look' manipulando el DOM. Incluí un Design System con grillas asimétricas.",
    proj_2_tags: "Alpine.js, JS, CSS Grid, DOM",
    proj_2_date: "2023",

    proj_3_title: "Gastroenterología San José",
    proj_3_roi: "Optimización de consultas médicas con transcripción potenciada con IA",
    proj_3_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Healthcare</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>Transcripción e Historiales con IA</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>El reto</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Los doctores dedicaban mucho tiempo a escribir/dictar notas después de cada consulta.</li><li>Al estar escribiendo, el doctor pierde la cercanía y contacto visual.</li><li>Notas fragmentadas, poco accesibles y con riesgo de errores de transcripción.</li></ul><p class='mt-4 italic border-l-2 border-white pl-4 text-silver-100'>\"La IA no se pierde nada y transcribe toda la información de la consulta, permitiéndome enfocarme en el paciente.\"<br/>— Dr. Alejandro Lessieur, Gastroenterólogo Principal</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>La solución</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Aplicación de IA capaz de transcribir en tiempo real por reconocimiento de voz.</li><li>Comprensión contextual del lenguaje médico.</li><li>Redacción del historial 100% automatizada (diferenciando consulta y seguimiento).</li><li>Guardado automático en la historia clínica digital.</li></ul></div></div>",
    proj_3_tags: "n8n, OpenAI, Whisper, Python, Automation",
    proj_3_date: "2024",

    proj_4_title: "Comidas Bracamonte",
    proj_4_roi: "Gestión automatizada de menús semanales con Inteligencia Artificial",
    proj_4_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Food Tech & Delivery</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>Gestión de Suscripciones y Logística</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>El reto</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Gestión manual de preferencias y cambios en los menús semanales de los suscriptores.</li><li>Dificultad para predecir la demanda exacta de ingredientes, generando mermas o faltantes.</li><li>Atención al cliente saturada por consultas sobre alérgenos, entregas y modificaciones de último minuto.</li><li>Coordinación compleja entre la producción en cocina y las rutas de reparto.</li></ul><p class='mt-4 italic border-l-2 border-white pl-4 text-silver-100'>\"La IA nos ha permitido escalar el volumen de pedidos sin perder la esencia casera ni la calidad en el trato al cliente.\"<br/>— Sergio Jimenez, Dueño</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>La solución</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Implementación de un sistema de gestión de pedidos con IA que permite a los usuarios personalizar sus menús automáticamente.</li><li>Algoritmos de predicción de demanda para optimizar las compras de materia prima y reducir desperdicios.</li><li>Agente de soporte IA que resuelve dudas sobre ingredientes y logística 24/7.</li><li>Automatización de rutas de entrega basada en la ubicación de los suscriptores semanales.</li></ul></div></div>",
    proj_4_tags: "Gestión de Pedidos, IA, Optimización Logística",
    proj_4_date: "2024",

    proj_5_title: "Clínicas Nobel",
    proj_5_roi: "Reducción de un 40% en tareas administrativas y mejora integral en atención al cliente",
    proj_5_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Healthcare</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>Sistema completo de gestión de leads y pacientes</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><p class='mt-2 italic border-l-2 border-white pl-4 text-silver-100'>\"Tienen reportes instantáneos sobre cada caso, ayudando a la toma de decisiones más rápida y precisa.\"<br/>— Alberto Piatelli, Director</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>La solución</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Implementación de un agente autónomo de IA que unifica y responde todas las consultas 24/7.</li><li>Plataforma centralizada de gestión de leads capaz de clasificar automáticamente por tipo de tratamiento y urgencia.</li><li>Automatización completa de follow-up utilizando flujos avanzados en GoHighLevel (GHL) vía email y WhatsApp.</li><li>Conexión del ERP clínico con el CRM para registrar cada etapa del proceso, desde el interés inicial hasta la confirmación de la cita.</li><li>Trazabilidad total del paciente con historial sincronizado y alertas automáticas para evitar pérdida de leads.</li></ul></div></div>",
    proj_5_tags: "Gestión de Leads, CRM, Automatización de Follow-up, GHL",
    proj_5_date: "2024",

    // Collaboration
    collab_title: "¿Tienes un proyecto en mente? Hagámoslo realidad.",
    collab_desc: "Ya sea que necesites desarrollar una plataforma web o móvil desde cero, automatizar los procesos de tu empresa, o llevar tu marca al siguiente nivel visual, estoy aquí para ejecutarlo.\n\n<strong class='text-white font-medium'>Si buscas un partner tecnológico estratégico, hablemos.</strong>",
    collab_btn: "Hablemos por WhatsApp",

    // Tech Stack
    stack_eyebrow: "Stack Tecnológico",
    stack_title: "Todas las herramientas a tu disposición.",
    stack_desc: "Domino un ecosistema completo de tecnologías modernas para entregar soluciones end-to-end:",

    // Testimonials
    test_eyebrow: "Reseñas",
    test_title: "Opinión de mis clientes.",

    test_1_name: "Carina M. 🇦🇷",
    test_1_role: "Abogada y Escritora",
    test_1_text: "Gabriel es un verdadero hallazgo. Supo interpretar lo que quería, pero sobre todo, lo que necesitaba. El diseño de las plantillas fue realmente espectacular. Trabaja con mucho detalle y escucha lo que quiere el cliente. Lo recomiendo al 100%. Sin dudas volvería a trabajar con él.",

    test_2_name: "Alex U. 🇪🇸",
    test_2_role: "Gestor Comercial",
    test_2_text: "Gran trabajador. Atento y cumplidor.",

    test_3_name: "Gabriela O. 🇪🇸",
    test_3_role: "TIENDA MUEBLES/DECORACIÓN",
    test_3_text: "Buscaba a un experto en desarrollo web y he dado en el clavo. Ha diseñado mi tienda y le ha quedado espectacular.",

    test_4_name: "Dr. Alejandro L. 🇲🇽",
    test_4_role: "Gastroenterología",
    test_4_text: "La IA no se pierde nada y transcribe toda la información de la consulta, permitiéndome enfocarme al 100% en mis pacientes sin agobios administrativos.",

    test_5_name: "Sergio J. 🇪🇸",
    test_5_role: "Comidas Bracamonte",
    test_5_text: "Implementar IA ha sido un antes y un después. La gestión de pedidos y cambios semanales vuela sin intervención humana y sin errores. Gran profesional.",

    // Contact
    contact_title_1: "Demos el primer paso.",
    contact_desc: "Toda gran solución tecnológica empieza con una simple charla. Escríbeme y analicemos cómo puedo sumar valor a tu idea, totalmente sin compromiso.",
    contact_placeholder: "Tu email (ej: hola@startup.com)",
    contact_button_idle: "Ejecutar",
    contact_button_submitting: "Procesando...",
    contact_button_success: "Recibido",

    // Footer
    footer_text: "Gabriel Pirillo. Arquitectura web y optimización de ventas.",
    
    // UI General
    close_button: "Cerrar",
    read_more: "Ver más detalles",

    // New Globals
    edu_eyebrow: "Estudios y Reconocimientos.",
    edu_relaciones: "Relaciones Comerciales Internacionales",
    contact_email_cta: "o escríbeme a gabriel.s.pirillo@gmail.com",
    footer_desc: "Construyo ecosistemas digitales y piezas interactivas diseñadas para maximizar utilidades. La tecnología no solo funciona, actúa para ti.",
    footer_help: "¿Cómo te puedo ayudar?",
    footer_serv: "Servicios",
    footer_proj: "Proyectos",
    footer_stack: "Stack Técnico",
    footer_know: "Conóceme",
    footer_about: "Sobre Mí",
    footer_edu: "Estudios",
    footer_test: "Testimonios",
    footer_contact: "Contáctame",
    footer_rights: "Todos los derechos reservados."
  },
  en: {
    // Nav
    nav_about: "About",
    nav_services: "Services",
    nav_projects: "Projects",
    nav_education: "Credentials",
    nav_testimonials: "Testimonials",
    nav_contact: "Contact",
    
    // Hero
    hero_badge: "Available for new projects",
    hero_title: "Polymath Engineer.",
    hero_description: "I specialize in creating comprehensive digital and graphic solutions to scale your business. I build custom websites and mobile applications, helping you save time by automating your company's processes.",
    hero_cta: "Initialize Protocol",
    hero_agile: "I ensure your technology not only functions flawlessly but also stands out and works for you.",

    // About
    about_eyebrow: "Personal Profile",
    about_title: "Engineering oriented towards commercial output.",
    about_intro: "What sets me apart from the traditional developer is my business vision. My experience leading sales teams and optimizing CRMs taught me a key principle: technology must generate profitable results. Today, I translate that commercial vision into comprehensive digital solutions for companies:",
    
    about_l1_title: "Web and Mobile Development",
    about_l1_desc: "Creation of websites and native applications for Android and iOS.",
    about_l2_title: "Process Automation",
    about_l2_desc: "Digital solutions for companies using n8n, eliminating repetitive tasks.",
    about_l3_title: "Graphic Design",
    about_l3_desc: "High-impact visual branding and graphic production.",
    about_l4_title: "Sound Engineering",
    about_l4_desc: "Professional mixing and mastering to enrich the user experience.",
    
    about_conclusion: "I build tools designed to make\nyour business perform better and sell more.",

    // Services
    services_eyebrow: "Capabilities",
    services_title: "Architecting the Modern Stack.",

    serv_1_title: "Web & B2B Solutions",
    serv_1_desc: "High performance systems (React, Next.js, Astro, Node.js).",
    serv_1_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>Beyond writing code, I build platforms designed to scale your business. I develop fast, secure, and optimized web ecosystems to convert visitors into clients.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>KEY SOLUTIONS</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>High-Conversion Landing Pages</strong> Designs focused on guiding users toward action (sales or leads).</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Custom E-Commerce Platforms</strong> Fast, secure online stores without the limitations of traditional templates.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Web Applications (SaaS) & B2B Portals</strong> Complex systems with robust databases and custom administration panels.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>THE POLYMATH APPROACH</h4><p class='font-normal leading-relaxed'>Unlike the traditional developer, my background in sales strategy allows me to align tech architecture with your financial goals. Every line of code is designed to maximize SEO, reduce load times to the millisecond, and guarantee a flawless user experience.</p></section></div>",
    
    serv_2_title: "Mobile Native / Hybrid",
    serv_2_desc: "iOS & Android (Swift, Kotlin, React Native).",
    serv_2_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>I design and program custom mobile applications for <strong class='font-bold'>iOS (Apple) and Android</strong>. I help you take your business directly to your customers' pockets with fast, secure, and easy-to-use apps.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>KEY SOLUTIONS</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Presence in both stores</strong> I use technologies like React Native, Swift, and Kotlin to ensure your app works flawlessly on the App Store and Google Play.</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Performance and Fluidity</strong> I focus on efficient resource management. I ensure the experience is instantaneous to prevent user churn.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Business Connection</strong> I integrate the application with your databases, payment gateways, or current systems (APIs and CRMs) synchronously.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>THE POLYMATH APPROACH</h4><p class='font-normal leading-relaxed'>I understand that an application is not just code; it is a key tool for sales and loyalty. I apply my commercial and visual design (UI/UX) experience to ensure that every screen and every button intuitively guides your user toward the action your business needs.</p></section></div>",
    
    serv_3_title: "Automation & AI Flows",
    serv_3_desc: "Orchestration, APIs and AI agents using n8n.",
    serv_3_detail: "Business Process Automation (BPA). I connect varying APIs and Artificial Intelligence agents through n8n and Python to reduce manual operational tasks by 90%.",
    
    serv_4_title: "UI/UX & Graphic Design",
    serv_4_desc: "Branding, components, and user interfaces.",
    serv_4_detail: "Visual identity and clinical, highly functional interfaces utilizing Figma and Adobe Creative Suite. Guaranteeing accessibility, systematic consistency, and logical layout conversion flows.",

    serv_5_title: "Sound Engineering",
    serv_5_desc: "Mixing, Mastering and Audio UX.",
    serv_5_detail: "Acoustic mixing and Mastering using Ableton Live and Pro Tools. Specialization in interactive auditory feedback (Earcons) and spatial soundtracks for immersive ecosystem setups.",

    // Projects
    projects_eyebrow: "Proof of Work",
    projects_title: "Recent Deployments.",

    proj_1_title: "Premium Shopify: Apple Aesthetics",
    proj_1_roi: "Drastic conversion rate surge via friction reduction.",
    proj_1_detail: "Translating a standard Shopify store into a luxury experience, replicating Apple's design engineering and user psychology. The result instantly broadcasts brand authority, optimized for mobile to close sales in a few taps.",
    proj_1_tags: "Shopify, Liquid, CRO, UI/UX",
    proj_1_date: "2024",

    proj_2_title: "Luxury E-Commerce: 'Symetria'",
    proj_2_roi: "Interactive ecosystem breaking native limitations.",
    proj_2_detail: "Creation of an ultra-high performance digital ecosystem for Premium Retail. Includes infinite scroll carousels loaded with mathematical logic (Alpine.js) and 'Shop the Look' interfaces via DOM manipulation.",
    proj_2_tags: "Alpine.js, JS, CSS Grid, DOM",
    proj_2_date: "2023",

    proj_3_title: "San José Gastroenterology",
    proj_3_roi: "Medical consultation optimization with AI-powered transcription",
    proj_3_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Healthcare</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>AI Medical Transcription & Records</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>The Challenge</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Doctors spent immense time writing/dictating notes after each consult.</li><li>Typing caused a loss of intimacy and eye contact with the patient.</li><li>Fragmented notes with transcription error risks affecting diagnostics.</li></ul><p class='mt-4 italic border-l-2 border-white pl-4 text-silver-100'>\"AI misses nothing and transcribes all consult information, letting me focus on the patient.\"<br/>— Dr. Alejandro Lessieur, Chief Gastroenterologist</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>The Solution</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>AI app capable of real-time voice recognition transcription.</li><li>Medical language contextual understanding.</li><li>100% automated medical record drafting differentiating first consult vs followup.</li><li>Automatic saving securely into the digital medical record system.</li></ul></div></div>",
    proj_3_tags: "n8n, OpenAI, Whisper, Python, Automation",
    proj_3_date: "2024",

    proj_4_title: "Bracamonte Meals",
    proj_4_roi: "Automated weekly menu management powered by Artificial Intelligence",
    proj_4_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Food Tech & Delivery</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>Subscription Management & Logistics</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>The Challenge</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Manual management of preferences and last-minute menu changes from subscribers.</li><li>Difficulty predicting precise ingredient demand, causing waste or shortages.</li><li>Customer support saturated with inquiries about allergens, deliveries, and adjustments.</li><li>Complex coordination between kitchen production and delivery routes.</li></ul><p class='mt-4 italic border-l-2 border-white pl-4 text-silver-100'>\"AI has allowed us to scale order volume without losing the homemade essence or client service quality.\"<br/>— Sergio Jimenez, Owner</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>The Solution</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>AI-powered order management system letting users automatically customize their menus.</li><li>Demand prediction algorithms optimizing raw material purchases and reducing waste.</li><li>AI support agent resolving ingredient and logistics inquiries 24/7.</li><li>Delivery route automation mapping based on weekly subscriber locations.</li></ul></div></div>",
    proj_4_tags: "Order Management, AI, Logistics Optimization",
    proj_4_date: "2024",

    proj_5_title: "Nobel Clinics",
    proj_5_roi: "40% reduction in administrative tasks with a comprehensive client experience overhaul",
    proj_5_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Healthcare</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>Complete lead and patient management system</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><p class='mt-2 italic border-l-2 border-white pl-4 text-silver-100'>\"They have instant reports on every case, assisting in faster and more precise decision making.\"<br/>— Alberto Piatelli, Director</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>The Solution</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Implementation of an autonomous AI agent that unifies and responds to all inquiries 24/7.</li><li>Centralized lead management platform capable of automatically classifying by treatment type and urgency.</li><li>Complete follow-up automation using advanced workflows in GoHighLevel (GHL) via email and WhatsApp.</li><li>Clinical ERP connection with CRM to log every stage of the process, from initial interest to appointment confirmation.</li><li>Total patient traceability with synchronized history and automatic alerts to prevent lost leads.</li></ul></div></div>",
    proj_5_tags: "Lead Management, CRM, Follow-up Automation, GHL",
    proj_5_date: "2024",

    // Collaboration
    collab_title: "Have a project in mind? Let's make it reality.",
    collab_desc: "Whether you need to develop a web or mobile platform from scratch, automate your company's processes with n8n to save time, or take your brand to the next visual and sonic level, I'm here to execute it.\n\nIf you are looking for a strategic tech partner, let's talk.",
    collab_btn: "Connect via WhatsApp",

    // Tech Stack
    stack_eyebrow: "Tech Stack",
    stack_title: "Every tool at your disposal.",
    stack_desc: "I command a complete ecosystem of modern technologies to deliver end-to-end solutions:",

    // Testimonials
    test_eyebrow: "5-Star Reviews",
    test_title: "Client Feedback.",

    test_1_name: "Carina M. 🇦🇷",
    test_1_role: "Ecommerce Director",
    test_1_text: "Gabriel is a true find. He knew how to interpret what I wanted, but above all, what I needed. The template design was spectacular. He works with great detail. I recommend him 100%.",

    test_2_name: "Alex U. 🇪🇸",
    test_2_role: "Commercial Manager",
    test_2_text: "Great worker. Attentive and compliant.",

    test_3_name: "Gabriela O. 🇪🇸",
    test_3_role: "Furniture & Decor Store",
    test_3_text: "I was looking for a web development expert and I hit the mark. He has designed my store and it turned out absolutely spectacular.",

    test_4_name: "Dr. Alejandro L. 🇲🇽",
    test_4_role: "Gastroenterologist",
    test_4_text: "The AI misses nothing and transcribes all the consultation info, allowing me to focus 100% on my patients without administrative burnout.",

    test_5_name: "Sergio J. 🇪🇸",
    test_5_role: "Bracamonte Meals",
    test_5_text: "Implementing AI has been a turning point. Managing weekly orders and changes now flies seamlessly without human intervention. Great professional.",

    // Contact
    contact_title_1: "Let's take the first step.",
    contact_desc: "Every great technical solution starts with a simple chat. Drop me a line and let's explore how I can add value to your idea, with absolutely no commitment.",
    contact_placeholder: "Your email (e.g. hello@startup.com)",
    contact_button_idle: "Execute",
    contact_button_submitting: "Syncing...",
    contact_button_success: "Received",

    // Footer
    footer_text: "Gabriel Pirillo. Web architecture and sales optimization.",

    // UI General
    close_button: "Close",
    read_more: "Read full details",

    // New Globals
    edu_eyebrow: "Education and Recognitions.",
    edu_relaciones: "International Business Relations",
    contact_email_cta: "or email me at gabriel.s.pirillo@gmail.com",
    footer_desc: "I build digital ecosystems and interactive pieces designed to maximize profits. Technology not only works, it acts for you.",
    footer_help: "How can I help you?",
    footer_serv: "Services",
    footer_proj: "Projects",
    footer_stack: "Tech Stack",
    footer_know: "Get to know me",
    footer_about: "About Me",
    footer_edu: "Education",
    footer_test: "Testimonials",
    footer_contact: "Contact me",
    footer_rights: "All rights reserved."
  }
};

const LanguageContext = createContext<{
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}>({
  language: "es",
  toggleLanguage: () => {},
  t: () => "",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
