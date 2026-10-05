"use client";

import { useState } from "react";
import { ArrowRight, Phone, MapPin, Mail, Clock } from "lucide-react";

const PETROL = "#153746";
const ORANGE = "#F56510";

export default function CTAFinal() {
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "", mensagem: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  const infos = [
    { Icon: Phone,  label: "WhatsApp",  value: "(67) 9 9999-9999" },
    { Icon: Mail,   label: "E-mail",    value: "decorat.molduras@gmail.com" },
    { Icon: MapPin, label: "Endereço",  value: "Rua Pintassilgo, 232, Campo Grande, MS. CEP 79013-790" },
    { Icon: Clock,  label: "Horário",   value: "Segunda a sexta, das 8h às 18h. Sábado, das 8h às 12h" },
  ];

  return (
    <section
      id="contato"
      style={{ backgroundColor: "#f8f6f3", padding: "5rem 0" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: ORANGE,
              marginBottom: "0.5rem",
            }}
          >
            Fale conosco
          </p>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              color: PETROL,
              lineHeight: 1.2,
            }}
          >
            Envie seu projeto
          </h2>
          <p
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "0.9rem",
              color: "#6b6660",
              marginTop: "0.65rem",
            }}
          >
            Orçamento gratuito · resposta em até 24h úteis
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="contato-grid"
        >
          {/* Left: Info */}
          <div>
            <h3
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1rem",
                fontWeight: 700,
                color: PETROL,
                marginBottom: "1.5rem",
              }}
            >
              Informações de contato
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
              {infos.map(({ Icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: ORANGE,
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={17} color="#ffffff" />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#9a968f",
                        marginBottom: "0.1rem",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: "Open Sans, sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        color: PETROL,
                        lineHeight: 1.5,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/decorat.molduras/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "transparent",
                color: PETROL,
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 700,
                textDecoration: "none",
                padding: "0.75rem 1.25rem",
                border: `2px solid ${PETROL}`,
                borderRadius: "4px",
                marginBottom: "0.75rem",
                width: "fit-content",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = PETROL;
                el.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "transparent";
                el.style.color = PETROL;
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @decorat.molduras
            </a>
          </div>

          {/* Right: Form */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "2.5rem",
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            }}
          >
            {!enviado ? (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: PETROL,
                    marginBottom: "0.2rem",
                  }}
                >
                  Solicitar orçamento
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    { name: "nome",     label: "Nome completo",         placeholder: "Seu nome",             type: "text" },
                    { name: "telefone", label: "Telefone / WhatsApp",   placeholder: "(67) 9 9999-9999",     type: "tel" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "#6b6660",
                          marginBottom: "0.35rem",
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.name as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        style={{
                          width: "100%",
                          border: "1.5px solid #e2dfd9",
                          borderRadius: "4px",
                          padding: "0.65rem 0.9rem",
                          fontFamily: "Open Sans, sans-serif",
                          fontSize: "0.85rem",
                          color: PETROL,
                          outline: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                        onBlur={(e)  => (e.target.style.borderColor = "#e2dfd9")}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6b6660",
                      marginBottom: "0.35rem",
                    }}
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{
                      width: "100%",
                      border: "1.5px solid #e2dfd9",
                      borderRadius: "4px",
                      padding: "0.65rem 0.9rem",
                      fontFamily: "Open Sans, sans-serif",
                      fontSize: "0.85rem",
                      color: PETROL,
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                    onBlur={(e)  => (e.target.style.borderColor = "#e2dfd9")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6b6660",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Descreva seu projeto
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Modelos, dimensões, quantidade, tipo de aplicação (interna/externa)..."
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    style={{
                      width: "100%",
                      border: "1.5px solid #e2dfd9",
                      borderRadius: "4px",
                      padding: "0.65rem 0.9rem",
                      fontFamily: "Open Sans, sans-serif",
                      fontSize: "0.85rem",
                      color: PETROL,
                      outline: "none",
                      resize: "vertical",
                      minHeight: "100px",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                    onBlur={(e)  => (e.target.style.borderColor = "#e2dfd9")}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    backgroundColor: ORANGE,
                    color: "#ffffff",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.9rem",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = "#d85408")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = ORANGE)
                  }
                >
                  Enviar projeto <ArrowRight size={15} />
                </button>
              </form>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "320px",
                  textAlign: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: ORANGE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: PETROL,
                  }}
                >
                  Projeto enviado!
                </h3>
                <p
                  style={{
                    fontFamily: "Open Sans, sans-serif",
                    fontSize: "0.88rem",
                    color: "#6b6660",
                    lineHeight: 1.7,
                  }}
                >
                  Nossa equipe da Decorat retorna em até 24h úteis com o orçamento para seu projeto.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contato-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
