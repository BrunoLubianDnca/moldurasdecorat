export const applicationContexts = {
  fachadas: { label: "Fachadas", interest: "Molduras externas" },
  "janelas-e-portas": { label: "Janelas e portas", interest: "Guarnições para janelas" },
  "ambientes-internos": { label: "Ambientes internos", interest: "Filetes e boiseries" },
  "sob-medida": { label: "Sob medida", interest: "Projeto sob medida" },
} as const;

export const projectStageContexts = {
  "projeto-pronto": "Já tenho meu projeto",
  "ideia-inicial": "Tenho apenas uma ideia",
  "projeto-medidas": "Tenho projeto/medidas",
  "referencias-fotos": "Tenho referências/fotos",
  "preciso-orientacao": "Preciso de orientação",
} as const;

export type ApplicationContext = keyof typeof applicationContexts;
export type ProjectStageContext = keyof typeof projectStageContexts;

export type PreAttendanceContext = {
  application?: ApplicationContext;
  projectStage?: ProjectStageContext;
  profileCode?: string;
};

export function normalizeProfileCode(value?: string | null) {
  const match = value?.trim().toUpperCase().match(/^M(\d{3})$/);
  if (!match) return undefined;

  const profileNumber = Number(match[1]);
  return profileNumber >= 1 && profileNumber <= 114
    ? `M${String(profileNumber).padStart(3, "0")}`
    : undefined;
}

function createContextParams(context: PreAttendanceContext) {
  const params = new URLSearchParams();
  if (context.application && applicationContexts[context.application]) {
    params.set("aplicacao", context.application);
  }
  if (context.projectStage && projectStageContexts[context.projectStage]) {
    params.set("etapa", context.projectStage);
  }

  const profileCode = normalizeProfileCode(context.profileCode);
  if (profileCode) params.set("perfil", profileCode);

  return params;
}

export function createPreAttendanceHref(context: PreAttendanceContext = {}) {
  const params = createContextParams(context);
  params.set("atendimento", "1");

  return `/?${params.toString()}`;
}

export function createCatalogContextHref(context: PreAttendanceContext = {}) {
  const params = createContextParams(context);
  const query = params.toString();
  return query ? `/catalogo?${query}` : "/catalogo";
}

export function readPreAttendanceContext(params: URLSearchParams): PreAttendanceContext {
  const applicationValue = params.get("aplicacao") as ApplicationContext | null;
  const projectStageValue = params.get("etapa") as ProjectStageContext | null;

  return {
    application: applicationValue && applicationContexts[applicationValue] ? applicationValue : undefined,
    projectStage: projectStageValue && projectStageContexts[projectStageValue] ? projectStageValue : undefined,
    profileCode: normalizeProfileCode(params.get("perfil")),
  };
}

export function hasPreAttendanceContext(context: PreAttendanceContext) {
  return Boolean(context.application || context.projectStage || context.profileCode);
}

export function buildPreAttendanceMessage({
  visitorName,
  selectedInterest,
  referencesContext,
  context,
}: {
  visitorName: string;
  selectedInterest: string;
  referencesContext: string;
  context: PreAttendanceContext;
}) {
  if (!hasPreAttendanceContext(context)) {
    return `Olá, sou ${visitorName}. Estou buscando ${selectedInterest.toLowerCase()} para o meu projeto. ${referencesContext}. Gostaria de falar com um especialista da Decorat.`;
  }

  const messageParts = [`Olá, sou ${visitorName}.`];

  if (context.application) {
    messageParts.push(`Aplicação escolhida: ${applicationContexts[context.application].label}.`);
  } else if (selectedInterest) {
    messageParts.push(`Estou buscando ${selectedInterest.toLowerCase()} para o meu projeto.`);
  }

  if (context.profileCode) messageParts.push(`Perfil de referência: ${context.profileCode}.`);
  if (context.projectStage) messageParts.push(`Etapa do projeto: ${projectStageContexts[context.projectStage]}.`);
  if (referencesContext) messageParts.push(`Referências do projeto: ${referencesContext}.`);

  messageParts.push("Gostaria de falar com um especialista da Decorat.");
  return messageParts.join(" ");
}
