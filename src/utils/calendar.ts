export const scheduleGoogleCalendarMeeting = (serviceName?: string) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 1); // Tomorrow
  startDate.setHours(14, 0, 0, 0); // 2 PM
  
  const endDate = new Date(startDate);
  endDate.setHours(15, 0, 0, 0); // 3 PM
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const title = serviceName 
    ? `${serviceName} - Diagnóstico Estratégico - Anderson Garcia`
    : 'Diagnóstico Estratégico - Anderson Garcia';
    
  const description = serviceName
    ? `Sessão de diagnóstico estratégico focada em ${serviceName}. Análise da estrutura empresarial e identificação de oportunidades de melhoria. Duração: 1 hora. Inclui: análise inicial da empresa, identificação de pontos críticos e recomendações estratégicas específicas para ${serviceName}.`
    : 'Sessão de diagnóstico estratégico para análise da estrutura empresarial e identificação de oportunidades de melhoria. Duração: 1 hora. Inclui: análise inicial da empresa, identificação de pontos críticos e recomendações estratégicas.';
  
  const eventDetails = {
    title,
    description,
    location: 'Online (Google Meet)',
    startTime: formatDate(startDate),
    endTime: formatDate(endDate)
  };
  
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startTime}/${eventDetails.endTime}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}&add=angarciabr@gmail.com`;
  
  window.open(googleCalendarUrl, '_blank');
};

export const contactInfo = {
  email: 'angarciabr@gmail.com',
  linkedin: 'https://www.linkedin.com/in/angarciabr/',
  name: 'Anderson Garcia'
};