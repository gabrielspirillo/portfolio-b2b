"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  es: {
    // Synex
    fin_v_pnl_benefit: "Menos costos de producción",
    fin_v_pulso_benefit: "Mejores decisiones",
    fin_v_equipo_benefit: "Más control del proyecto",
    fin_v_comprobantes_benefit: "Menos riesgo",
    fin_v_entradas_benefit: "Más tiempo libre",
    synex_eyebrow: "Caso propio",
    rw_collab: "En colaboración con",
    rw_v_firma_title: "Firma digital",
    rw_v_firma_desc: "Hoja de visita, propuesta de compra, nota de encargo y contrato del agente se generan y se firman online, desde el celular.",
    rw_v_firma_benefit: "Cero papeles",
    rw_v_dias_title: "100 días para el éxito",
    rw_v_dias_desc: "Aplica la estrategia de Buffini a la base relacional: cada día el agente sabe a quién escribir, llamar y visitar para que los referidos lleguen solos.",
    rw_v_dias_benefit: "Referidos constantes",
    rw_card_roi: "El sistema que opera oficinas **REMAX** de punta a punta: CRM, contratos, comisiones y reclutamiento en un solo lugar, manejado desde la IA. **95% de los procesos automatizados.**",
    rw_title: "Toda una oficina REMAX, conectada y automatizada en un solo sistema.",
    rw_desc: "**Realty Workspace** reemplaza las planillas, los correos sueltos y las herramientas que no se hablan entre sí. CRM, contratos, comisiones, alquileres y reclutamiento en una plataforma hecha a la medida de cómo ya trabaja cada oficina: sus procesos, sus honorarios y sus roles. Nació dentro de **REMAX Exclusive (Chile)** y hoy opera en **5 oficinas REMAX de Chile y Argentina**.",
    rw_stat_1: "de los procesos automatizados",
    rw_stat_2: "oficinas REMAX operan con Realty",
    rw_quote: "Hemos logrado automatizar un 95 % de los procesos; cada indicador está asociado a una acción dentro de la plataforma.",
    rw_quote_by: "José Miguel · Broker Owner, REMAX Exclusive (Chile)",
    rw_goals_eyebrow: "Para qué está pensada",
    rw_goals_title: "Una plataforma, tres resultados para la oficina.",
    rw_g_1_tag: "Reclutamiento",
    rw_g_1_title: "Sumar mejores agentes",
    rw_g_1_desc: "Del aviso al alta en un solo embudo, con seguimiento por IA y el costo real de cada contratado.",
    rw_g_2_tag: "Agentes",
    rw_g_2_title: "Que cada agente rinda más",
    rw_g_2_desc: "Sabe qué hacer hoy, lo hace más rápido hablándole a su IA y ve su avance contra el plan del año.",
    rw_g_3_tag: "Procesos internos",
    rw_g_3_title: "Que nada dependa de perseguir a nadie",
    rw_g_3_desc: "Contratos, comisiones, cobros e informes pasan de un área a otra solos, con firma digital y aviso automático.",
    rw_v_ia_title: "El CRM, desde Claude, ChatGPT o Gemini",
    rw_v_ia_desc: "El agente pide con sus palabras un ACM, un contrato o un informe y queda hecho en Realty, conectado por **MCP**.",
    rw_v_ia_benefit: "+40 acciones con IA",
    rw_v_match_title: "Tinder Inmobiliario",
    rw_v_match_desc: "Cruza cada comprador con la cartera y la red de oficinas. El agente aprueba con un gesto y el cliente recibe su selección por WhatsApp.",
    rw_v_match_benefit: "Match en segundos",
    rw_v_leads_title: "Cada lead, al agente de guardia",
    rw_v_leads_desc: "Entra por la web o WhatsApp y en segundos está en el CRM del agente de turno, con aviso por WhatsApp y correo.",
    rw_v_leads_benefit: "Ningún lead se enfría",
    rw_v_contrato_title: "Contratos que se redactan solos",
    rw_v_contrato_desc: "Redacta el contrato con los datos de las partes, la propiedad y el precio sobre las plantillas de la oficina. Legal recibe un borrador listo para revisar y se firma online.",
    rw_v_contrato_benefit: "Redactado en 40 s",
    rw_v_informe_title: "Informes al propietario",
    rw_v_informe_desc: "Cada 15 días el propietario recibe un PDF con impresiones por portal, visitas y ofertas. El siguiente se programa solo.",
    rw_v_informe_benefit: "Cero informes a mano",
    rw_v_reclut_title: "Reclutamiento medido",
    rw_v_reclut_desc: "Embudo de candidatos con costo por lead y por contratado en cada campaña, seguimiento con IA a quien no responde y entrevistas transcritas.",
    rw_v_reclut_benefit: "Costo por contratado a la vista",
    rw_v_direccion_title: "El negocio entero, en vivo",
    rw_v_direccion_desc: "Facturación frente a meta, embudo de conversión y **15 indicadores por agente**, cada uno asociado a una acción dentro de la plataforma.",
    rw_v_direccion_benefit: "Decisiones con datos reales",
    rw_v_ranking_title: "Ranking de la oficina",
    rw_v_ranking_desc: "Podio semanal y mensual con la evolución de cada agente, visible para todo el equipo en su dashboard.",
    rw_v_ranking_benefit: "Un equipo que compite y suma",
    rw_int_eyebrow: "Un solo sistema",
    rw_int_title: "Conectado a todo lo que la oficina ya usa.",
    rw_result: "Realty nació **codo a codo con el equipo de una oficina REMAX** y hoy la usan a diario **REMAX Exclusive, Passion, Central, Potencia y Summit**, en Chile y Argentina. Se implementa en **unas dos semanas** con los procesos de cada oficina ya cargados, los agentes la valoran con un **5,0** y cada mes suma funciones nuevas a medida.",
    rw_tags: "CRM a medida, IA conectada por MCP, Automatización entre áreas, Firma digital, WhatsApp 24/7, Reclutamiento",
    sf_tag: "Producto · Brandboost AI",
    sf_v_live_title: "Activo en tu web en 1 día",
    sf_v_live_desc: "Se integra en la web de la clínica **con su logo y colores**, sin programar. El paciente nunca sale de su sitio.",
    sf_v_live_benefit: "Sin desarrollo",
    sf_funnel_eyebrow: "El embudo",
    sf_funnel_title: "El problema es lo que pasa antes de agendar.",
    sf_without: "Sin Smile Fast",
    sf_without_steps: "Visitante anónimo | Duda del resultado | Abandona la web | Lead perdido",
    sf_without_result: "Clic pagado, sin cita",
    sf_with: "Con Smile Fast",
    sf_with_steps: "Se simula en tu web | Ve su resultado | Deja sus datos | Paciente nuevo",
    sf_with_result: "+38% leads · 65% agenda",
    sf_card_roi: "Simulación de sonrisa con IA para clínicas dentales: el visitante **ve su nueva sonrisa**, deja sus datos y agenda.",
    sf_tags: "IA generativa, Captación de leads, Clínicas dentales, Marca blanca",
    sf_title: "La herramienta que llena la clínica.",
    sf_desc: "Los visitantes de la web de una clínica dental suben una selfie, **ven su nueva sonrisa al instante** y dejan sus datos listos para agendar. Activo en 1 día, con la marca de cada clínica.",
    sf_stat_1: "de visitante a lead",
    sf_stat_2: "de esos leads agenda cita",
    sf_step_1: "Deja sus datos: ya es un lead.",
    sf_step_2: "Sube una selfie, sin descargas.",
    sf_step_3: "La IA analiza su sonrisa.",
    sf_step_4: "Ve su antes y después y agenda.",
    sf_v_sim_title: "Simulación realista",
    sf_v_sim_desc: "Una vista fotorrealista de su sonrisa post-tratamiento: la duda se convierte en **ganas de agendar**.",
    sf_v_sim_benefit: "Más pacientes de alto valor",
    sf_v_analisis_title: "Análisis clínico con IA",
    sf_v_analisis_desc: "Analiza **6 parámetros clínicos**: tono VITA, inventario dental, macroestética, proporción áurea, arco y encía.",
    sf_v_analisis_benefit: "Resultados creíbles",
    sf_v_lead_title: "Lead cualificado al instante",
    sf_v_lead_desc: "Nombre, email y WhatsApp **junto a su simulación**, en el panel de la clínica para contactar en la primera hora.",
    sf_v_lead_benefit: "Más citas",
    sf_result: "Cada visita se convierte en un lead con foto y contacto, y **la clínica cierra hasta 3 veces más planes de estética**.",
    fu_tag: "Cliente · Futura Solutions",
    fu_shot_agenda: "Agenda del día con primeras visitas, estados y quién quiere adelantar.",
    fu_shot_wa: "Bandeja de WhatsApp con el resumen del caso generado por IA al lado de la conversación.",
    fu_card_roi: "Plataforma para clínicas y sanatorios **100% automatizada con IA**: agenda que se rellena sola, agentes de voz y WhatsApp.",
    fu_tags: "IA, Agentes de voz, WhatsApp, Agenda, Finanzas",
    fu_title: "La clínica que trabaja sola.",
    fu_desc: "Una aplicación completa para clínicas médicas y sanatorios: **automatiza con IA cada tarea repetitiva**, rellena los huecos de la agenda y le devuelve tiempo al equipo para atender pacientes.",
    fu_stat_1: "llamadas atendidas sin intervención humana",
    fu_stat_2: "menos carga administrativa",
    fu_v_voz_title: "Agente de llamadas",
    fu_v_voz_desc: "Atiende las 24 h, identifica al paciente y **agenda, cancela o reprograma** en la llamada. Si hace falta, pasa a una persona.",
    fu_v_voz_benefit: "Ninguna llamada perdida",
    fu_v_wa_title: "Agente de WhatsApp",
    fu_v_wa_desc: "Responde en segundos, **ofrece horarios reales y confirma la cita** sin que nadie del equipo intervenga.",
    fu_v_wa_benefit: "Más tiempo libre",
    fu_v_agenda_title: "Agenda que se rellena sola",
    fu_v_agenda_desc: "Cuando alguien cancela, el hueco se **ofrece automáticamente a la lista de espera** y se vuelve a ocupar.",
    fu_v_agenda_benefit: "Más ingresos",
    fu_v_ficha_title: "Ficha clínica inteligente",
    fu_v_ficha_desc: "La IA arma el **resumen de cada caso**: medicación, alertas, última sesión y próxima cita, a la vista en segundos.",
    fu_v_ficha_benefit: "Mejor atención",
    fu_v_tareas_title: "Tareas y mensajería interna",
    fu_v_tareas_desc: "El equipo coordina dentro de la app y **un mensaje se convierte en tarea** con un clic, con paciente y vencimiento.",
    fu_v_tareas_benefit: "Equipo coordinado",
    fu_v_panel_title: "Panel inteligente y finanzas",
    fu_v_panel_desc: "Ocupación, citas que agendó la IA, faltas e ingresos **en un solo vistazo**, con lo urgente primero.",
    fu_v_panel_benefit: "Mejores decisiones",
    fu_result: "Menos teléfono y menos tareas repetitivas, más agenda ocupada: el personal **gana tiempo para lo que importa**, atender pacientes.",
    synex_v_expediente_benefit: "Mejores decisiones",
    synex_v_rangos_benefit: "Público que vuelve",
    synex_v_juego_benefit: "Comunidad activa",
    synex_v_noche_benefit: "Menos riesgo",
    synex_v_recorrido_benefit: "Más fidelidad",
    fin_card_roi: "Gestión del equipo y de **cada ingreso y egreso** por evento. Con ella, el 2º evento volvió **rentable** el proyecto.",
    fin_tags: "Finanzas, IA, Gestión de equipo, Automatización",
    fin_title: "Cada peso, bajo control.",
    fin_desc: "La segunda app de SYNEX: gestiona al equipo y registra **con exactitud cada ingreso y egreso** de cada evento, en tiempo real.",
    fin_stat_1: "evento: proyecto rentable",
    fin_stat_2: "ingresos y egresos registrados",
    fin_v_pnl_title: "P&L por evento",
    fin_v_pnl_desc: "Ingresos, costos y resultado de cada fecha al centavo: sé **dónde se va cada peso** y recorto lo que no suma.",
    fin_v_pulso_title: "Proyección en vivo",
    fin_v_pulso_desc: "El ritmo de venta anticipa a dónde se llega: **ajusto precios, promos y producción a tiempo**, no cuando ya es tarde.",
    fin_v_equipo_title: "Equipo de RRPP",
    fin_v_equipo_desc: "Metas, comisiones y podio se calculan solos y cada RRPP ve solo lo suyo: **el equipo se gestiona sin planillas**.",
    fin_v_comprobantes_title: "Comprobantes con IA",
    fin_v_comprobantes_desc: "La IA valida cada pago contra el precio antes de aprobarlo: **cero pagos incompletos ni comprobantes repetidos**.",
    fin_v_entradas_title: "Entradas automáticas",
    fin_v_entradas_desc: "Se autoriza con un toque y la entrada sale sola al comprador: **horas de trabajo manual que ya no existen**.",
    fin_result: "Que el segundo evento haya vuelto rentable el proyecto es algo inédito en las producciones de este tipo, y salió de **saber exactamente a dónde va cada peso**.",
    synex_tag: "Proyecto propio",
    synex_card_roi: "Productora de eventos **100% automatizada**: 2 de 3 fechas SOLD OUT.",
    synex_tags: "App propia, IA, Gamificación, Automatización",
    synex_v_juego_title: "Gamificación",
    synex_v_juego_desc: "Rangos y PSY DOSIS con **dinámicas de juego estudiadas**.",
    synex_syn_title: "SYN, el asistente con IA",
    synex_syn_desc: "Observa la noche, responde dudas y **acompaña a cada sujeto** dentro de la app.",
    synex_title: "Una productora que funciona sola.",
    synex_desc: "Mi productora de eventos de música electrónica corre sobre una **app propia** que automatiza el 100% de la operación y convierte cada fecha en comunidad.",
    synex_v_expediente_title: "Sé quién viene",
    synex_v_expediente_desc: "Cada asistente tiene su expediente: **quién es, qué escucha y cuántas veces vino**.",
    synex_v_rangos_title: "Recurrencia",
    synex_v_rangos_desc: "Rangos y rachas que **premian volver** a cada fecha.",
    synex_v_noche_title: "Cuidado en la noche",
    synex_v_noche_desc: "Reducción de daños y avatar nocturno: **cuidarse también suma**.",
    synex_v_recorrido_title: "Co-creación",
    synex_v_recorrido_desc: "La comunidad es **parte de la creación y evolución** del proyecto.",
    synex_result: "Agotar 2 de 3 fechas es algo inédito en producciones de este tipo, y tiene un vínculo directo con la **optimización de cada proceso**.",
    synex_stat_1: "eventos SOLD OUT",
    synex_stat_2: "automatizada",
    synex_cta: "Visitar SYNEX",

    // How I work
    process_eyebrow: "Cómo trabajo",
    process_title: "De la primera charla a producción.",
    process_1_title: "Diagnóstico",
    process_1_desc: "Una charla para entender tu negocio, tus objetivos y **qué procesos te frenan**.",
    process_2_title: "Propuesta",
    process_2_desc: "Te paso **alcance, tiempos y presupuesto** claros antes de empezar.",
    process_3_title: "Desarrollo",
    process_3_desc: "Avances frecuentes para que **veas y pruebes** el producto mientras se construye.",
    process_4_title: "Lanzamiento y soporte",
    process_4_desc: "Publico, mido y **te acompaño después de la entrega** para que funcione en el mundo real.",

    // Brand / hero
    nav_cta: "Hablemos",
    nav_language: "Idioma",
    hero_title_1: "De la idea a la app,",
    hero_title_2: "en producción.",
    hero_sub: "Apps, plataformas web, mobile y **automatización con IA** para empresas.",
    hero_secondary: "Ver proyectos",
    card_synex_desc: "Primera productora de eventos de electrónica 100% automatizada",
    card_bb_desc: "Agencia de IA y automatización",
    card_cta_eyebrow: "Ahorrá tiempo y ganá más dinero",
    card_cta_title: "Hablemos de tu proyecto",
    proj_collab: "En colaboración con",
    collab_eyebrow: "Trabajemos juntos",
    edu_label: "Formación",
    footer_tagline: "De la idea a la app, en producción.",

    // Nav
    nav_services: "Servicios",
    nav_projects: "Proyectos",
    nav_testimonials: "Testimonios",
    nav_contact: "Contacto",
    
    // Hero
    hero_cta: "Iniciemos un proyecto",

    // About
    about_eyebrow: "Sobre mí",
    about_title: "Ingeniería enfocada en resultados de negocio.",
    about_intro: "Lo que me diferencia del desarrollador tradicional es mi **visión de negocio**. Mi experiencia liderando equipos de ventas y optimizando CRMs me enseñó algo clave: **la tecnología debe generar resultados rentables**. Hoy traduzco esa visión comercial en soluciones digitales completas para empresas:",
    
    about_l1_title: "Desarrollo Web y Móvil",
    about_l1_desc: "Páginas web y **apps nativas** para Android e iOS.",
    about_l2_title: "Automatización de Procesos",
    about_l2_desc: "Flujos con n8n que **eliminan tareas repetitivas**.",
    about_l3_title: "Diseño Gráfico",
    about_l3_desc: "Piezas gráficas y **branding** con identidad propia.",
    about_l4_title: "Ingeniería de Sonido",
    about_l4_desc: "**Mezcla y mastering** profesional, y sonido para interfaces.",
    
    about_conclusion: "Construyo herramientas diseñadas para que tu negocio funcione mejor y venda más.",

    // Services
    services_eyebrow: "Capacidades",
    services_title: "Todas estas habilidades a tu disposición.",
    
    serv_1_title: "Desarrollo Web",
    serv_1_desc: "Sitios y plataformas **rápidos y escalables** con React, Next.js, Astro y Node.js.",
    serv_1_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>Más que escribir código, construyo plataformas diseñadas para escalar tu negocio. Desarrollo ecosistemas web rápidos, seguros y optimizados para convertir visitantes en clientes.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>SOLUCIONES CLAVE</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Landing Pages de Alta Conversión</strong> Diseños enfocados en guiar al usuario hacia la acción (ventas o leads).</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Plataformas E-Commerce a Medida</strong> Tiendas online rápidas, seguras y sin las limitaciones de las plantillas tradicionales.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Aplicaciones Web (SaaS) y Portales B2B</strong> Sistemas complejos con bases de datos robustas y paneles de administración a medida.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>MI ENFOQUE</h4><p class='font-normal leading-relaxed'>A diferencia del desarrollador tradicional, mi base en estrategia de ventas me permite alinear la arquitectura tecnológica con tus objetivos financieros. Cada decisión técnica apunta a mejorar el SEO, reducir los tiempos de carga y lograr una experiencia de usuario clara.</p></section></div>",
    
    serv_2_title: "Desarrollo Móvil",
    serv_2_desc: "Apps **nativas e híbridas** para iOS y Android.",
    serv_2_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>Diseño y programo aplicaciones móviles a medida para <strong class='font-bold'>iOS (Apple) y Android</strong>. Te ayudo a llevar tu negocio directamente al bolsillo de tus clientes con apps rápidas, seguras y muy fáciles de usar.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>SOLUCIONES CLAVE</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Presencia en ambas tiendas</strong> Uso tecnologías como React Native, Swift y Kotlin para que tu app funcione bien en App Store y Google Play.</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Rendimiento y Fluidez</strong> Me enfoco en el manejo eficiente de los recursos. Me aseguro de que la experiencia sea instantánea para evitar el abandono del usuario.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Conexión con tu Negocio</strong> Integro la aplicación con tus bases de datos, pasarelas de pago o sistemas actuales (APIs y CRMs) de forma sincronizada.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>MI ENFOQUE</h4><p class='font-normal leading-relaxed'>Entiendo que una aplicación no es solo código; es una herramienta clave de ventas y fidelización. Aplico mi experiencia comercial y en diseño visual (UI/UX) para asegurar que cada pantalla y cada botón guíen intuitivamente a tu usuario hacia la acción que tu negocio necesita.</p></section></div>",
    
    serv_3_title: "Automatización & IA",
    serv_3_desc: "Agentes de IA y flujos con n8n que **trabajan solos**.",
    serv_3_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>Automatizo las tareas manuales y repetitivas de tu empresa utilizando Inteligencia Artificial y flujos de trabajo inteligentes. Conecto tus herramientas para reducir el trabajo manual en un 90%, permitiendo que tu equipo se enfoque en lo que realmente importa: vender y crecer.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>SOLUCIONES CLAVE</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Agentes Conversacionales con IA</strong> Asistentes inteligentes en WhatsApp y Redes que gestionan conversaciones reales, resuelven consultas y califican prospectos 24/7.</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Orquestación de Sistemas</strong> Sincronización en piloto automático con n8n y Python de tus CRMs, bases de datos y pasarelas de pago.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Asistentes de Back-Office</strong> Agentes autónomos que procesan documentos, clasifican información o extraen datos estratégicos de la web sin error.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>MI ENFOQUE</h4><p class='font-normal leading-relaxed'>Mi experiencia liderando equipos de ventas me enseñó que la IA no consiste solo en usar tecnología de moda, sino en generar rentabilidad. Diseño cada agente y cada flujo con un objetivo de negocio claro: acelerar tu ciclo de ventas, dar un soporte más rápido y bajar tus costos operativos.</p></section></div>",
    
    serv_4_title: "UI/UX & Diseño Gráfico",
    serv_4_desc: "Interfaces, **branding** y piezas gráficas.",
    serv_4_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>Diseño interfaces y piezas visuales que captan la atención y generan confianza instantánea. Traduzco la identidad de tu marca en experiencias estéticas de nivel premium, asegurando que cada detalle visual esté pensado para enamorar a tu cliente y facilitar la venta.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>SOLUCIONES CLAVE</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Diseño de Interfaces (UI/UX)</strong> Diseño pantallas limpias y lógicas que guían al usuario sin esfuerzo hacia la compra o el contacto, optimizando el recorrido visual.</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Identidad Visual y Branding</strong> Creación del \"alma\" de tu empresa: logotipos, paletas de colores y tipografías que te posicionan como líder en tu sector.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Piezas Gráficas de Alto Impacto</strong> Contenido publicitario, flyers, carruseles y presentaciones corporativas que superan a tu competencia en cada punto de contacto.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>MI ENFOQUE</h4><p class='font-normal leading-relaxed'>Un diseño visualmente increíble no sirve de nada si confunde al usuario o si los programadores no pueden construirlo. Como también soy desarrollador Full Stack y tengo experiencia en ventas, mis diseños no son simples dibujos; son ecosistemas visuales estratégicos, 100% listos para programarse y optimizados para la conversión comercial.</p></section></div>",

    serv_5_title: "Ingeniería de Sonido",
    serv_5_desc: "Mezcla, mastering y **audio UX**.",
    serv_5_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>Elevo la calidad de tus proyectos musicales y audiovisuales con sonido de nivel estudio. Ya sea que necesites pulir una canción para plataformas de streaming o diseñar la experiencia sonora de una aplicación, cuido cada detalle para que suene profesional.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>SOLUCIONES CLAVE</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Mezcla y Mastering de Canciones</strong> Llevo tus pistas musicales al estándar de la industria utilizando Ableton Live. Sonido potente y balanceado para Spotify o la pista de baile.</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Postproducción de Audio para Video</strong> Limpieza y optimización para publicidad, YouTube o corporativos. Voces nítidas e impacto sonoro profesional.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Audio UX para Sitios y Apps (Earcons)</strong> Diseño de micro-interacciones acústicas integradas en el código, sumando una capa táctil y premium a tu interfaz.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>MI ENFOQUE</h4><p class='font-normal leading-relaxed'>Combino mi sensibilidad como productor musical activo con la lógica de un desarrollador de software. Esto me permite entender exactamente qué necesita un track para sonar enorme en un club, o cómo programar sonido en una web mediante la Web Audio API para que cargue rápido y sin latencia.</p></section></div>",

    // Projects (Case Studies)
    projects_eyebrow: "Proyectos",
    projects_title: "Implementaciones recientes.",

    proj_1_title: "Shopify Premium: Estética Apple",
    proj_1_roi: "Tienda con estética premium que **sube la conversión** al quitar fricción en la compra.",
    proj_1_detail: "Transformación de una tienda Shopify estándar (Liquid/CSS) en una experiencia de lujo, replicando la ingeniería de diseño y psicología de usuario de Apple. Transmite autoridad inmediata, optimizada para móviles, y diseñada para cerrar ventas en muy pocos clicks.",
    proj_1_tags: "Shopify, Liquid, CRO, UI/UX",
    proj_1_date: "2024",

    proj_2_title: "E-Commerce de Lujo: 'Symetria'",
    proj_2_roi: "E-commerce interactivo que **va más allá de las plantillas** de la plataforma.",
    proj_2_detail: "Creación de un ecosistema digital de altísimo rendimiento para Retail Premium. Incluye carruseles de scroll infinito con lógica matemática (Alpine.js) e interfaces 'Shop the Look' manipulando el DOM. Incluí un Design System con grillas asimétricas.",
    proj_2_tags: "Alpine.js, JS, CSS Grid, DOM",
    proj_2_date: "2023",

    proj_3_title: "Gastroenterología San José",
    proj_3_roi: "Consultas médicas con **transcripción automática por IA**.",
    proj_3_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Healthcare</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>Transcripción e Historiales con IA</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>El reto</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Los doctores dedicaban mucho tiempo a escribir/dictar notas después de cada consulta.</li><li>Al estar escribiendo, el doctor pierde la cercanía y contacto visual.</li><li>Notas fragmentadas, poco accesibles y con riesgo de errores de transcripción.</li></ul><p class='mt-4 italic border-l-2 border-white pl-4 text-silver-100'>\"La IA no se pierde nada y transcribe toda la información de la consulta, permitiéndome enfocarme en el paciente.\"<br/>— Dr. Alejandro Lessieur, Gastroenterólogo Principal</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>La solución</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Aplicación de IA capaz de transcribir en tiempo real por reconocimiento de voz.</li><li>Comprensión contextual del lenguaje médico.</li><li>Redacción del historial 100% automatizada (diferenciando consulta y seguimiento).</li><li>Guardado automático en la historia clínica digital.</li></ul></div></div>",
    proj_3_tags: "n8n, OpenAI, Whisper, Python, Automation",
    proj_3_date: "2024",

    proj_4_title: "Comidas Bracamonte",
    proj_4_roi: "Menús semanales y pedidos **gestionados con IA**, sin intervención manual.",
    proj_4_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Food Tech & Delivery</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>Gestión de Suscripciones y Logística</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>El reto</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Gestión manual de preferencias y cambios en los menús semanales de los suscriptores.</li><li>Dificultad para predecir la demanda exacta de ingredientes, generando mermas o faltantes.</li><li>Atención al cliente saturada por consultas sobre alérgenos, entregas y modificaciones de último minuto.</li><li>Coordinación compleja entre la producción en cocina y las rutas de reparto.</li></ul><p class='mt-4 italic border-l-2 border-white pl-4 text-silver-100'>\"La IA nos ha permitido escalar el volumen de pedidos sin perder la esencia casera ni la calidad en el trato al cliente.\"<br/>— Sergio Jimenez, Dueño</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>La solución</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Implementación de un sistema de gestión de pedidos con IA que permite a los usuarios personalizar sus menús automáticamente.</li><li>Algoritmos de predicción de demanda para optimizar las compras de materia prima y reducir desperdicios.</li><li>Agente de soporte IA que resuelve dudas sobre ingredientes y logística 24/7.</li><li>Automatización de rutas de entrega basada en la ubicación de los suscriptores semanales.</li></ul></div></div>",
    proj_4_tags: "Gestión de Pedidos, IA, Optimización Logística",
    proj_4_date: "2024",

    proj_5_title: "Clínicas Nobel",
    proj_5_roi: "**40% menos tareas administrativas** y mejor atención al cliente.",
    proj_5_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Healthcare</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>Sistema completo de gestión de leads y pacientes</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><p class='mt-2 italic border-l-2 border-white pl-4 text-silver-100'>\"Tienen reportes instantáneos sobre cada caso, ayudando a la toma de decisiones más rápida y precisa.\"<br/>— Alberto Piatelli, Director</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>La solución</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Implementación de un agente autónomo de IA que unifica y responde todas las consultas 24/7.</li><li>Plataforma centralizada de gestión de leads capaz de clasificar automáticamente por tipo de tratamiento y urgencia.</li><li>Automatización completa de follow-up utilizando flujos avanzados en GoHighLevel (GHL) vía email y WhatsApp.</li><li>Conexión del ERP clínico con el CRM para registrar cada etapa del proceso, desde el interés inicial hasta la confirmación de la cita.</li><li>Trazabilidad total del paciente con historial sincronizado y alertas automáticas para evitar pérdida de leads.</li></ul></div></div>",
    proj_5_tags: "Gestión de Leads, CRM, Automatización de Follow-up, GHL",
    proj_5_date: "2024",

    // Collaboration
    collab_title: "¿Tenés un proyecto en mente? Hagámoslo realidad.",
    collab_desc: "Ya sea una plataforma web o una app desde cero, automatizar los procesos de tu empresa o llevar tu marca a otro nivel visual, <strong class='text-white font-semibold'>me encargo de principio a fin</strong>.\n\n<strong class='text-white font-medium'>Si buscás un partner tecnológico, hablemos.</strong>",
    collab_btn: "Escribime por WhatsApp",

    // Tech Stack
    stack_eyebrow: "Stack Tecnológico",
    stack_title: "Las herramientas con las que construyo.",
    stack_desc: "Un stack moderno para llevar cada proyecto **de la idea a producción**.",

    // Testimonials
    test_eyebrow: "Reseñas",
    test_title: "Lo que dicen mis clientes.",

    test_1_name: "Diego Sorensen 🇦🇷",
    test_1_role: "CEO & Fundador, Planet Zone",
    test_1_text: "Trabajé con Gabriel en varios proyectos para mi tienda online y la experiencia fue excelente. Tiene muy buena predisposición, es **rápido tanto en las respuestas como en la ejecución** del trabajo, y demuestra una gran voluntad para entender lo que se le pide e incluso mejorarlo. Es atento, profesional y con muy buena onda. Se nota que es un talento que se va perfeccionando con el tiempo y tiene mucho por delante. Lo recomiendo especialmente para proyectos de ecommerce, landing pages y desarrollo web en general. Tuve una muy buena experiencia, tanto en lo humano como en lo profesional.",

    test_2_name: "Carina M. 🇦🇷",
    test_2_role: "Abogada y Escritora",
    test_2_text: "Gabriel es un verdadero hallazgo. Supo interpretar lo que quería, pero sobre todo, **lo que necesitaba**. El diseño de las plantillas fue realmente espectacular. Trabaja con mucho detalle y escucha lo que quiere el cliente. Lo recomiendo al 100%. Sin dudas volvería a trabajar con él.",

    test_3_name: "Alex U. 🇪🇸",
    test_3_role: "Gestor Comercial",
    test_3_text: "Gran trabajador. **Atento y cumplidor.**",

    test_4_name: "Gabriela O. 🇪🇸",
    test_4_role: "TIENDA MUEBLES/DECORACIÓN",
    test_4_text: "Buscaba a un experto en desarrollo web y he dado en el clavo. Ha diseñado mi tienda y **le ha quedado espectacular**.",

    test_5_name: "Dr. Alejandro L. 🇲🇽",
    test_5_role: "Gastroenterología",
    test_5_text: "La IA no se pierde nada y transcribe toda la información de la consulta, permitiéndome **enfocarme al 100% en mis pacientes** sin agobios administrativos.",

    test_6_name: "Sergio J. 🇪🇸",
    test_6_role: "Comidas Bracamonte",
    test_6_text: "Implementar IA ha sido **un antes y un después**. La gestión de pedidos y cambios semanales vuela sin intervención humana y sin errores. Gran profesional.",

    // Contact
    contact_title_1: "Demos el primer paso.",
    contact_desc: "Contame qué necesitás y te respondo con una **propuesta concreta**. Sin compromiso.",

    // Footer
    
    // UI General
    close_button: "Cerrar",
    read_more: "Ver caso",

    // New Globals
    edu_eyebrow: "Estudios y certificaciones.",
    edu_relaciones: "Relaciones Comerciales Internacionales",
    contact_email_cta: "o escribime a gabriel.s.pirillo@gmail.com",
    footer_desc: "Apps, plataformas web, mobile y automatización con IA para empresas.",
    footer_help: "¿Cómo te puedo ayudar?",
    footer_serv: "Servicios",
    footer_proj: "Proyectos",
    footer_stack: "Stack Técnico",
    footer_know: "Conóceme",
    footer_about: "Sobre Mí",
    footer_edu: "Estudios",
    footer_test: "Testimonios",
    footer_contact: "Contacto",
    footer_rights: "Todos los derechos reservados."
  },
  en: {
    // Synex
    fin_v_pnl_benefit: "Lower production costs",
    fin_v_pulso_benefit: "Better decisions",
    fin_v_equipo_benefit: "More control",
    fin_v_comprobantes_benefit: "Less risk",
    fin_v_entradas_benefit: "More free time",
    synex_eyebrow: "Own venture",
    rw_collab: "In collaboration with",
    rw_v_firma_title: "E-signature",
    rw_v_firma_desc: "Viewing sheets, purchase offers, listing agreements and agent contracts are generated and signed online, from the phone.",
    rw_v_firma_benefit: "Zero paperwork",
    rw_v_dias_title: "100 days to success",
    rw_v_dias_desc: "Applies the Buffini method to the relationship base: every day the agent knows who to write, call and visit so referrals keep coming.",
    rw_v_dias_benefit: "Steady referrals",
    rw_card_roi: "The system that runs **REMAX** offices end to end: CRM, contracts, commissions and recruiting in one place, driven by AI. **95% of processes automated.**",
    rw_title: "An entire REMAX office, connected and automated in a single system.",
    rw_desc: "**Realty Workspace** replaces spreadsheets, loose emails and tools that don't talk to each other. CRM, contracts, commissions, rentals and recruiting in one platform built around how each office already works: its processes, its fees and its roles. It was born inside **REMAX Exclusive (Chile)** and now runs **5 REMAX offices in Chile and Argentina**.",
    rw_stat_1: "of processes automated",
    rw_stat_2: "REMAX offices run on Realty",
    rw_quote: "We've automated 95% of our processes; every metric is tied to an action inside the platform.",
    rw_quote_by: "José Miguel · Broker Owner, REMAX Exclusive (Chile)",
    rw_goals_eyebrow: "What it's built for",
    rw_goals_title: "One platform, three outcomes for the office.",
    rw_g_1_tag: "Recruiting",
    rw_g_1_title: "Bring in better agents",
    rw_g_1_desc: "From job post to onboarding in a single funnel, with AI follow-up and the real cost of every hire.",
    rw_g_2_tag: "Agents",
    rw_g_2_title: "Make every agent more productive",
    rw_g_2_desc: "They know what to do today, do it faster by talking to their AI and track progress against their yearly plan.",
    rw_g_3_tag: "Internal processes",
    rw_g_3_title: "Nothing depends on chasing anyone",
    rw_g_3_desc: "Contracts, commissions, payments and reports move between areas on their own, with e-signature and automatic alerts.",
    rw_v_ia_title: "The CRM, from Claude, ChatGPT or Gemini",
    rw_v_ia_desc: "Agents ask in their own words for a CMA, a contract or a report and it gets done in Realty, connected via **MCP**.",
    rw_v_ia_benefit: "40+ AI actions",
    rw_v_match_title: "Property matching",
    rw_v_match_desc: "Matches every buyer with the portfolio and the office network. The agent approves with a swipe and the client gets their shortlist on WhatsApp.",
    rw_v_match_benefit: "Matches in seconds",
    rw_v_leads_title: "Every lead, to the on-duty agent",
    rw_v_leads_desc: "It comes in through the website or WhatsApp and lands in seconds in the on-duty agent's CRM, with WhatsApp and email alerts.",
    rw_v_leads_benefit: "No lead goes cold",
    rw_v_contrato_title: "Contracts that draft themselves",
    rw_v_contrato_desc: "Drafts the contract with the parties, property and price on the office's own templates. Legal gets a draft ready to review, signed online.",
    rw_v_contrato_benefit: "Drafted in 40 s",
    rw_v_informe_title: "Owner reports",
    rw_v_informe_desc: "Every 15 days the owner gets a PDF with impressions per portal, visits and offers. The next one schedules itself.",
    rw_v_informe_benefit: "Zero manual reports",
    rw_v_reclut_title: "Measured recruiting",
    rw_v_reclut_desc: "Candidate funnel with cost per lead and per hire for every campaign, AI follow-up for whoever goes quiet and transcribed interviews.",
    rw_v_reclut_benefit: "Cost per hire in sight",
    rw_v_direccion_title: "The whole business, live",
    rw_v_direccion_desc: "Revenue vs goal, conversion funnel and **15 metrics per agent**, each one tied to an action inside the platform.",
    rw_v_direccion_benefit: "Decisions on real data",
    rw_v_ranking_title: "Office leaderboard",
    rw_v_ranking_desc: "Weekly and monthly podium with each agent's progress, visible to the whole team on their dashboard.",
    rw_v_ranking_benefit: "A team that competes and grows",
    rw_int_eyebrow: "One system",
    rw_int_title: "Connected to everything the office already uses.",
    rw_result: "Realty was built **side by side with the team of a REMAX office** and is now used daily by **REMAX Exclusive, Passion, Central, Potencia and Summit** across Chile and Argentina. It goes live in **about two weeks** with each office's processes already loaded, agents rate it **5.0** and it gains new custom features every month.",
    rw_tags: "Custom CRM, AI via MCP, Cross-team automation, E-signature, WhatsApp 24/7, Recruiting",
    sf_tag: "Product · Brandboost AI",
    sf_v_live_title: "Live on your site in 1 day",
    sf_v_live_desc: "It plugs into the clinic's website **with its logo and colours**, no coding. Patients never leave the site.",
    sf_v_live_benefit: "No development",
    sf_funnel_eyebrow: "The funnel",
    sf_funnel_title: "The problem is what happens before booking.",
    sf_without: "Without Smile Fast",
    sf_without_steps: "Anonymous visitor | Unsure of the result | Leaves the site | Lost lead",
    sf_without_result: "Paid click, no appointment",
    sf_with: "With Smile Fast",
    sf_with_steps: "Simulates on your site | Sees the result | Leaves details | New patient",
    sf_with_result: "+38% leads · 65% book",
    sf_card_roi: "AI smile simulation for dental clinics: visitors **see their new smile**, leave their details and book.",
    sf_tags: "Generative AI, Lead generation, Dental clinics, White label",
    sf_title: "The tool that fills the clinic.",
    sf_desc: "Visitors to a dental clinic's website upload a selfie, **see their new smile instantly** and leave their details ready to book. Live in 1 day, branded for each clinic.",
    sf_stat_1: "visitor to lead",
    sf_stat_2: "of those leads book an appointment",
    sf_step_1: "Leaves their details: now a lead.",
    sf_step_2: "Uploads a selfie, no downloads.",
    sf_step_3: "AI analyses their smile.",
    sf_step_4: "Sees their before and after, and books.",
    sf_v_sim_title: "Realistic simulation",
    sf_v_sim_desc: "A photorealistic preview of their post-treatment smile: doubt turns into **wanting to book**.",
    sf_v_sim_benefit: "More high-value patients",
    sf_v_analisis_title: "AI clinical analysis",
    sf_v_analisis_desc: "Analyses **6 clinical parameters**: VITA shade, dental inventory, macro-aesthetics, golden ratio, smile arc and gums.",
    sf_v_analisis_benefit: "Credible results",
    sf_v_lead_title: "Instant qualified lead",
    sf_v_lead_desc: "Name, email and WhatsApp **with their simulation**, in the clinic's panel to contact within the first hour.",
    sf_v_lead_benefit: "More appointments",
    sf_result: "Every visit becomes a lead with photo and contact, and **clinics close up to 3x more cosmetic plans**.",
    fu_tag: "Client · Futura Solutions",
    fu_shot_agenda: "Daily schedule with first visits, statuses and who wants an earlier slot.",
    fu_shot_wa: "WhatsApp inbox with the AI-generated case summary next to the conversation.",
    fu_card_roi: "A platform for clinics and hospitals, **100% automated with AI**: a self-filling schedule plus voice and WhatsApp agents.",
    fu_tags: "AI, Voice agents, WhatsApp, Scheduling, Finance",
    fu_title: "The clinic that runs itself.",
    fu_desc: "A complete application for medical clinics and hospitals: it **automates every repetitive task with AI**, fills schedule gaps and gives the team time back to care for patients.",
    fu_stat_1: "calls handled with no human intervention",
    fu_stat_2: "less administrative workload",
    fu_v_voz_title: "Call agent",
    fu_v_voz_desc: "Answers 24/7, identifies the patient and **books, cancels or reschedules** during the call. Hands over to a person when needed.",
    fu_v_voz_benefit: "No missed calls",
    fu_v_wa_title: "WhatsApp agent",
    fu_v_wa_desc: "Replies in seconds, **offers real slots and confirms the appointment** with no one on the team stepping in.",
    fu_v_wa_benefit: "More free time",
    fu_v_agenda_title: "Self-filling schedule",
    fu_v_agenda_desc: "When someone cancels, the slot is **offered to the waitlist automatically** and gets booked again.",
    fu_v_agenda_benefit: "More revenue",
    fu_v_ficha_title: "Smart clinical record",
    fu_v_ficha_desc: "AI builds **each case summary**: medication, alerts, last session and next appointment, visible in seconds.",
    fu_v_ficha_benefit: "Better care",
    fu_v_tareas_title: "Tasks and internal messaging",
    fu_v_tareas_desc: "The team coordinates inside the app and **a message becomes a task** in one click, with patient and due date.",
    fu_v_tareas_benefit: "A coordinated team",
    fu_v_panel_title: "Smart dashboard and finance",
    fu_v_panel_desc: "Occupancy, AI-booked appointments, no-shows and revenue **at a glance**, urgent items first.",
    fu_v_panel_benefit: "Better decisions",
    fu_result: "Less phone time and fewer repetitive tasks, a fuller schedule: staff **get time back for what matters**, caring for patients.",
    synex_v_expediente_benefit: "Better decisions",
    synex_v_rangos_benefit: "Returning audience",
    synex_v_juego_benefit: "Active community",
    synex_v_noche_benefit: "Less risk",
    synex_v_recorrido_benefit: "Stronger loyalty",
    fin_card_roi: "Team management and **every income and expense** per event. With it, the 2nd event made the project **profitable**.",
    fin_tags: "Finance, AI, Team management, Automation",
    fin_title: "Every peso, under control.",
    fin_desc: "SYNEX's second app: it manages the team and records **every income and expense** of each event, accurately and in real time.",
    fin_stat_1: "event: profitable project",
    fin_stat_2: "income and expenses recorded",
    fin_v_pnl_title: "P&L per event",
    fin_v_pnl_desc: "Income, costs and result for every date, down to the cent: I know **where every peso goes** and cut what doesn't add up.",
    fin_v_pulso_title: "Live projection",
    fin_v_pulso_desc: "The sales pace shows where we'll land: **I adjust prices, promos and production in time**, not when it's too late.",
    fin_v_equipo_title: "Promoter team",
    fin_v_equipo_desc: "Goals, commissions and leaderboard are calculated automatically and each promoter sees only their own: **the team runs without spreadsheets**.",
    fin_v_comprobantes_title: "AI receipts",
    fin_v_comprobantes_desc: "AI checks every payment against the price before approval: **no short payments or duplicated receipts**.",
    fin_v_entradas_title: "Automatic tickets",
    fin_v_entradas_desc: "One tap approves the sale and the ticket goes out by itself: **hours of manual work that no longer exist**.",
    fin_result: "Making the project profitable by the second event is unheard of for productions like this, and it came from **knowing exactly where every peso goes**.",
    synex_tag: "Own project",
    synex_card_roi: "A **100% automated** events company: 2 of 3 dates SOLD OUT.",
    synex_tags: "Own app, AI, Gamification, Automation",
    synex_v_juego_title: "Gamification",
    synex_v_juego_desc: "Ranks and PSY DOSIS built on **proven game mechanics**.",
    synex_syn_title: "SYN, the AI assistant",
    synex_syn_desc: "Watches over the night, answers questions and **stays with every subject** inside the app.",
    synex_title: "An events company that runs itself.",
    synex_desc: "My electronic music events company runs on its **own app**, which automates 100% of the operation and turns every date into community.",
    synex_v_expediente_title: "I know who comes",
    synex_v_expediente_desc: "Every attendee has a profile: **who they are, what they listen to and how often they come**.",
    synex_v_rangos_title: "Retention",
    synex_v_rangos_desc: "Ranks and streaks that **reward coming back** to every date.",
    synex_v_noche_title: "Care at night",
    synex_v_noche_desc: "Harm reduction and a night avatar: **taking care of yourself pays off**.",
    synex_v_recorrido_title: "Co-creation",
    synex_v_recorrido_desc: "The community is **part of building and evolving** the project.",
    synex_result: "Selling out 2 of 3 dates is unheard of for productions like this, and it ties directly to **optimizing every process**.",
    synex_stat_1: "events SOLD OUT",
    synex_stat_2: "automated",
    synex_cta: "Visit SYNEX",

    // How I work
    process_eyebrow: "How I work",
    process_title: "From the first call to production.",
    process_1_title: "Discovery",
    process_1_desc: "A call to understand your business, your goals and **which processes are holding you back**.",
    process_2_title: "Proposal",
    process_2_desc: "You get a clear **scope, timeline and budget** before we start.",
    process_3_title: "Build",
    process_3_desc: "Frequent updates so you can **see and test** the product while it's being built.",
    process_4_title: "Launch and support",
    process_4_desc: "I ship, measure and **stay with you after delivery** so it works in the real world.",

    // Brand / hero
    nav_cta: "Let's talk",
    nav_language: "Language",
    hero_title_1: "From idea to app,",
    hero_title_2: "in production.",
    hero_sub: "Apps, web platforms, mobile and **AI automation** for businesses.",
    hero_secondary: "See projects",
    card_synex_desc: "The first 100% automated electronic music events company",
    card_bb_desc: "AI & automation agency",
    card_cta_eyebrow: "Save time, make more money",
    card_cta_title: "Let's talk about your project",
    proj_collab: "In collaboration with",
    collab_eyebrow: "Work together",
    edu_label: "Education",
    footer_tagline: "From idea to app, in production.",

    // Nav
    nav_services: "Services",
    nav_projects: "Projects",
    nav_testimonials: "Testimonials",
    nav_contact: "Contact",
    
    // Hero
    hero_cta: "Start a project",

    // About
    about_eyebrow: "About me",
    about_title: "Engineering focused on business results.",
    about_intro: "What sets me apart from the traditional developer is my **business vision**. My experience leading sales teams and optimizing CRMs taught me a key principle: **technology must generate profitable results**. Today, I translate that commercial vision into complete digital solutions for companies:",
    
    about_l1_title: "Web and Mobile Development",
    about_l1_desc: "Websites and **native apps** for Android and iOS.",
    about_l2_title: "Process Automation",
    about_l2_desc: "n8n workflows that **eliminate repetitive tasks**.",
    about_l3_title: "Graphic Design",
    about_l3_desc: "Graphic pieces and **branding** with a clear identity.",
    about_l4_title: "Sound Engineering",
    about_l4_desc: "Professional **mixing and mastering**, plus sound for interfaces.",
    
    about_conclusion: "I build tools designed to make your business perform better and sell more.",

    // Services
    services_eyebrow: "Capabilities",
    services_title: "Every skill, at your disposal.",

    serv_1_title: "Web Development",
    serv_1_desc: "**Fast, scalable** sites and platforms with React, Next.js, Astro and Node.js.",
    serv_1_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>Beyond writing code, I build platforms designed to scale your business. I develop fast, secure, and optimized web ecosystems to convert visitors into clients.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>KEY SOLUTIONS</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>High-Conversion Landing Pages</strong> Designs focused on guiding users toward action (sales or leads).</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Custom E-Commerce Platforms</strong> Fast, secure online stores without the limitations of traditional templates.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Web Applications (SaaS) & B2B Portals</strong> Complex systems with robust databases and custom administration panels.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>MY APPROACH</h4><p class='font-normal leading-relaxed'>Unlike the traditional developer, my background in sales strategy allows me to align tech architecture with your financial goals. Every technical decision aims to improve SEO, cut load times and deliver a clear user experience.</p></section></div>",
    
    serv_2_title: "Mobile Development",
    serv_2_desc: "**Native and hybrid** apps for iOS and Android.",
    serv_2_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>I design and program custom mobile applications for <strong class='font-bold'>iOS (Apple) and Android</strong>. I help you take your business directly to your customers' pockets with fast, secure, and easy-to-use apps.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>KEY SOLUTIONS</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Presence in both stores</strong> I use technologies like React Native, Swift, and Kotlin so your app works well on the App Store and Google Play.</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Performance and Fluidity</strong> I focus on efficient resource management. I ensure the experience is instantaneous to prevent user churn.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Business Connection</strong> I integrate the application with your databases, payment gateways, or current systems (APIs and CRMs) synchronously.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>MY APPROACH</h4><p class='font-normal leading-relaxed'>I understand that an application is not just code; it is a key tool for sales and loyalty. I apply my commercial and visual design (UI/UX) experience to ensure that every screen and every button intuitively guides your user toward the action your business needs.</p></section></div>",
    
    serv_3_title: "Automation & AI",
    serv_3_desc: "AI agents and n8n workflows that **run on their own**.",
    serv_3_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>I automate manual and repetitive tasks for your company using Artificial Intelligence and intelligent workflows. I connect your tools to reduce manual work by 90%, allowing your team to focus on what really matters: selling and growing.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>KEY SOLUTIONS</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Conversational AI Agents</strong> Intelligent assistants on WhatsApp and Social Media that manage real conversations, resolve inquiries, and qualify leads 24/7.</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Systems Orchestration</strong> Autopilot synchronization with n8n and Python of your CRMs, databases, and payment gateways.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Back-Office Assistants</strong> Autonomous agents that process documents, classify information, or extract strategic data from the web error-free.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>MY APPROACH</h4><p class='font-normal leading-relaxed'>My experience leading sales teams taught me that AI is not just about using trendy technology, but about generating profitability. I design every agent and every flow with a clear business goal: accelerate your sales cycle, guarantee impeccable support, and drastically reduce your operating costs.</p></section></div>",
    
    serv_4_title: "UI/UX & Graphic Design",
    serv_4_desc: "Interfaces, **branding** and graphic pieces.",
    serv_4_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>I design interfaces and visual pieces that capture attention and build instant trust. I translate your brand identity into premium aesthetic experiences, ensuring every visual detail is designed to engage your customers and facilitate sales.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>KEY SOLUTIONS</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Interface Design (UI/UX)</strong> I design clean and logical screens that effortlessly guide the user toward purchase or contact, optimizing the visual journey.</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Visual Identity & Branding</strong> Creating the \"soul\" of your company: logos, color palettes, and typography that position you as a leader in your sector.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>High-Impact Graphic Collateral</strong> Advertising content, flyers, carousels, and corporate presentations that outperform your competition at every touchpoint.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>MY APPROACH</h4><p class='font-normal leading-relaxed'>Visual design alone is useless if it confuses the user or if developers can't build it. As a Full Stack developer with sales experience, my designs are not just drawings; they are strategic visual ecosystems, 100% ready for code and optimized for commercial conversion.</p></section></div>",

    serv_5_title: "Sound Engineering",
    serv_5_desc: "Mixing, mastering and **audio UX**.",
    serv_5_detail: "<div class='space-y-10 text-carbon-700'><p class='text-lg md:text-xl font-medium text-black leading-tight'>I elevate the quality of your musical and audiovisual projects with studio-level sound. Whether you need to polish a song for streaming platforms or design the sound experience of an app, I take care of every detail so it sounds professional.</p><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-6 border-b border-carbon-200 pb-2 inline-block'>KEY SOLUTIONS</h4><div class='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Song Mixing & Mastering</strong> I bring your musical tracks to industry standards using Ableton Live. Powerful, balanced sound for Spotify or the dance floor.</p></div><div class='flex gap-3'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Audio Post-production for Video</strong> Cleaning and optimization for ads, YouTube, or corporate videos. Sharp voices and professional sonic impact.</p></div><div class='flex gap-3 md:col-span-2'><span class='text-carbon-400 mt-1.5'>—</span><p><strong class='text-carbon-950 font-semibold block mb-1'>Audio UX for Sites & Apps (Earcons)</strong> Designing acoustic micro-interactions integrated into the code, adding a tactile and premium layer to your interface.</p></div></div></section><section><h4 class='text-[10px] tracking-[0.2em] uppercase text-carbon-400 font-bold mb-4 border-b border-carbon-200 pb-2 inline-block'>MY APPROACH</h4><p class='font-normal leading-relaxed'>I combine my sensitivity as an active music producer with the logic of a software developer. This allows me to understand exactly what a track needs to sound massive in a club, or how to program sound in a web environment using the Web Audio API for fast loading and zero latency.</p></section></div>",

    // Projects
    projects_eyebrow: "Projects",
    projects_title: "Recent work.",

    proj_1_title: "Premium Shopify: Apple Aesthetics",
    proj_1_roi: "A premium-looking store that **lifts conversion** by removing checkout friction.",
    proj_1_detail: "Translating a standard Shopify store into a luxury experience, replicating Apple's design engineering and user psychology. The result instantly broadcasts brand authority, optimized for mobile to close sales in a few taps.",
    proj_1_tags: "Shopify, Liquid, CRO, UI/UX",
    proj_1_date: "2024",

    proj_2_title: "Luxury E-Commerce: 'Symetria'",
    proj_2_roi: "An interactive e-commerce that **goes beyond the platform templates**.",
    proj_2_detail: "Creation of an ultra-high performance digital ecosystem for Premium Retail. Includes infinite scroll carousels loaded with mathematical logic (Alpine.js) and 'Shop the Look' interfaces via DOM manipulation.",
    proj_2_tags: "Alpine.js, JS, CSS Grid, DOM",
    proj_2_date: "2023",

    proj_3_title: "San José Gastroenterology",
    proj_3_roi: "Medical consultations with **automatic AI transcription**.",
    proj_3_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Healthcare</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>AI Medical Transcription & Records</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>The Challenge</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Doctors spent immense time writing/dictating notes after each consult.</li><li>Typing caused a loss of intimacy and eye contact with the patient.</li><li>Fragmented notes with transcription error risks affecting diagnostics.</li></ul><p class='mt-4 italic border-l-2 border-white pl-4 text-silver-100'>\"AI misses nothing and transcribes all consult information, letting me focus on the patient.\"<br/>— Dr. Alejandro Lessieur, Chief Gastroenterologist</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>The Solution</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>AI app capable of real-time voice recognition transcription.</li><li>Medical language contextual understanding.</li><li>100% automated medical record drafting differentiating first consult vs followup.</li><li>Automatic saving securely into the digital medical record system.</li></ul></div></div>",
    proj_3_tags: "n8n, OpenAI, Whisper, Python, Automation",
    proj_3_date: "2024",

    proj_4_title: "Bracamonte Meals",
    proj_4_roi: "Weekly menus and orders **managed by AI**, no manual work.",
    proj_4_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Food Tech & Delivery</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>Subscription Management & Logistics</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>The Challenge</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Manual management of preferences and last-minute menu changes from subscribers.</li><li>Difficulty predicting precise ingredient demand, causing waste or shortages.</li><li>Customer support saturated with inquiries about allergens, deliveries, and adjustments.</li><li>Complex coordination between kitchen production and delivery routes.</li></ul><p class='mt-4 italic border-l-2 border-white pl-4 text-silver-100'>\"AI has allowed us to scale order volume without losing the homemade essence or client service quality.\"<br/>— Sergio Jimenez, Owner</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>The Solution</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>AI-powered order management system letting users automatically customize their menus.</li><li>Demand prediction algorithms optimizing raw material purchases and reducing waste.</li><li>AI support agent resolving ingredient and logistics inquiries 24/7.</li><li>Delivery route automation mapping based on weekly subscriber locations.</li></ul></div></div>",
    proj_4_tags: "Order Management, AI, Logistics Optimization",
    proj_4_date: "2024",

    proj_5_title: "Nobel Clinics",
    proj_5_roi: "**40% fewer admin tasks** and better customer service.",
    proj_5_detail: "<div class='space-y-6 text-sm'><div class='flex flex-wrap gap-4'><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Industry</strong><span class='text-silver-200'>Healthcare</span></div><div class='bg-carbon-800 p-3 rounded-lg border border-carbon-700/50 flex-1 min-w-[200px]'><strong class='text-white block mb-1'>Use Case</strong><span class='text-silver-200'>Complete lead and patient management system</span></div></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><p class='mt-2 italic border-l-2 border-white pl-4 text-silver-100'>\"They have instant reports on every case, assisting in faster and more precise decision making.\"<br/>— Alberto Piatelli, Director</p></div><div class='bg-carbon-800 p-4 rounded-lg border border-carbon-700/50'><strong class='text-white text-lg block mb-2'>The Solution</strong><ul class='list-disc pl-5 space-y-2 text-silver-200'><li>Implementation of an autonomous AI agent that unifies and responds to all inquiries 24/7.</li><li>Centralized lead management platform capable of automatically classifying by treatment type and urgency.</li><li>Complete follow-up automation using advanced workflows in GoHighLevel (GHL) via email and WhatsApp.</li><li>Clinical ERP connection with CRM to log every stage of the process, from initial interest to appointment confirmation.</li><li>Total patient traceability with synchronized history and automatic alerts to prevent lost leads.</li></ul></div></div>",
    proj_5_tags: "Lead Management, CRM, Follow-up Automation, GHL",
    proj_5_date: "2024",

    // Collaboration
    collab_title: "Have a project in mind? Let's make it reality.",
    collab_desc: "Whether it's a web platform or an app from scratch, automating your company's processes or taking your brand to the next visual level, <strong class='text-white font-semibold'>I handle it end to end</strong>.\n\n<strong class='text-white font-medium'>Looking for a tech partner? Let's talk.</strong>",
    collab_btn: "Message me on WhatsApp",

    // Tech Stack
    stack_eyebrow: "Tech Stack",
    stack_title: "The tools I build with.",
    stack_desc: "A modern stack to take every project **from idea to production**.",

    // Testimonials
    test_eyebrow: "Reviews",
    test_title: "What clients say.",

    test_1_name: "Diego Sorensen 🇦🇷",
    test_1_role: "CEO & Founder, Planet Zone",
    test_1_text: "I worked with Gabriel on several projects for my online store and the experience was excellent. He has a great attitude, is **fast in both responses and execution**, and shows a strong will to understand what is requested and even improve it. He is attentive, professional, and has a great vibe. It's clear that he is a talent that improves over time and has a lot ahead of him. I especially recommend him for e-commerce projects, landing pages, and web development in general. I had a very good experience, both humanly and professionally.",

    test_2_name: "Carina M. 🇦🇷",
    test_2_role: "Ecommerce Director",
    test_2_text: "Gabriel is a true find. He knew how to interpret what I wanted, but above all, **what I needed**. The template design was spectacular. He works with great detail. I recommend him 100%.",

    test_3_name: "Alex U. 🇪🇸",
    test_3_role: "Commercial Manager",
    test_3_text: "Great worker. **Attentive and reliable.**",

    test_4_name: "Gabriela O. 🇪🇸",
    test_4_role: "Furniture & Decor Store",
    test_4_text: "I was looking for a web development expert and I hit the mark. He designed my store and **it turned out spectacular**.",

    test_5_name: "Dr. Alejandro L. 🇲🇽",
    test_5_role: "Gastroenterologist",
    test_5_text: "The AI misses nothing and transcribes all the consultation info, allowing me to **focus 100% on my patients** without administrative burnout.",

    test_6_name: "Sergio J. 🇪🇸",
    test_6_role: "Bracamonte Meals",
    test_6_text: "Implementing AI has been **a turning point**. Weekly orders and changes now run without human intervention. Great professional.",

    // Contact
    contact_title_1: "Let's take the first step.",
    contact_desc: "Tell me what you need and I'll get back to you with a **concrete proposal**. No commitment.",

    // Footer

    // UI General
    close_button: "Close",
    read_more: "View case",

    // New Globals
    edu_eyebrow: "Education and certifications.",
    edu_relaciones: "International Business Relations",
    contact_email_cta: "or email me at gabriel.s.pirillo@gmail.com",
    footer_desc: "Apps, web platforms, mobile and AI automation for businesses.",
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

/** Inline ES/EN pair for short UI labels inside illustrations. */
export function useTx() {
  const { language } = useContext(LanguageContext);
  return (es: string, en: string) => (language === "en" ? en : es);
}
