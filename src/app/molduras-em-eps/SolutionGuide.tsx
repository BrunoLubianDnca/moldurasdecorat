"use client";

import Link from "next/link";
import { useState } from "react";
import {
  applicationContexts,
  createCatalogContextHref,
  createPreAttendanceHref,
  projectStageContexts,
  type ApplicationContext,
  type ProjectStageContext,
} from "@/lib/preAtendimento";
import styles from "./page.module.css";

const applications: ApplicationContext[] = [
  "fachadas",
  "janelas-e-portas",
  "ambientes-internos",
  "sob-medida",
];

const projectStages: ProjectStageContext[] = [
  "projeto-medidas",
  "referencias-fotos",
  "preciso-orientacao",
];

export default function SolutionGuide() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [application, setApplication] = useState<ApplicationContext>();
  const [projectStage, setProjectStage] = useState<ProjectStageContext>();

  const reset = () => {
    setStep(1);
    setApplication(undefined);
    setProjectStage(undefined);
  };

  const context = { application, projectStage };

  if (!open) {
    return (
      <aside className={styles.guidePrompt} aria-label="Orientador de soluções Decorat">
        <div>
          <span>PRECISA DE ORIENTAÇÃO?</span>
          <p>Encontre o caminho mais adequado para o seu projeto em três escolhas.</p>
        </div>
        <button type="button" onClick={() => setOpen(true)} aria-expanded="false">
          Começar agora <b aria-hidden="true">→</b>
        </button>
      </aside>
    );
  }

  return (
    <section className={styles.guide} aria-labelledby="solution-guide-title">
      <header className={styles.guideHeader}>
        <div>
          <span>ORIENTADOR DE SOLUÇÕES</span>
          <h3 id="solution-guide-title">Uma direção clara para continuar.</h3>
        </div>
        <div className={styles.guideMeta}>
          <span aria-live="polite">Passo {step} de 3</span>
          <button type="button" onClick={() => { reset(); setOpen(false); }} aria-label="Fechar orientador">Fechar</button>
        </div>
      </header>

      <div className={styles.guideProgress} aria-hidden="true"><i style={{ width: `${step * 33.333}%` }} /></div>

      {step === 1 && (
        <fieldset className={styles.guideStep}>
          <legend>Onde pretende aplicar?</legend>
          <div className={styles.guideOptions}>
            {applications.map((value) => (
              <button key={value} type="button" onClick={() => { setApplication(value); setStep(2); }}>
                {applicationContexts[value].label}<b aria-hidden="true">→</b>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className={styles.guideStep}>
          <legend>Em que etapa está?</legend>
          <div className={styles.guideOptions}>
            {projectStages.map((value) => (
              <button key={value} type="button" onClick={() => { setProjectStage(value); setStep(3); }}>
                {projectStageContexts[value]}<b aria-hidden="true">→</b>
              </button>
            ))}
          </div>
          <button className={styles.guideBack} type="button" onClick={() => setStep(1)}>← Voltar</button>
        </fieldset>
      )}

      {step === 3 && application && projectStage && (
        <div className={styles.guideStep}>
          <h4>Como deseja continuar?</h4>
          <p className={styles.guideSummary}>{applicationContexts[application].label} · {projectStageContexts[projectStage]}</p>
          <div className={styles.guideDestinations}>
            <Link href={createCatalogContextHref(context)}>
              <span>Consultar catálogo</span>
              <small>Veja os 114 perfis, sem filtros automáticos.</small>
              <b aria-hidden="true">→</b>
            </Link>
            <Link href={createPreAttendanceHref(context)}>
              <span>Conversar com a Decorat</span>
              <small>Continue no pré-atendimento com este contexto.</small>
              <b aria-hidden="true">→</b>
            </Link>
          </div>
          <p className={styles.guideCommercialNote}>Quando necessário, o projeto completo possui orçamento e aprovação próprios antes do orçamento das molduras.</p>
          <button className={styles.guideBack} type="button" onClick={() => setStep(2)}>← Voltar</button>
        </div>
      )}
    </section>
  );
}
