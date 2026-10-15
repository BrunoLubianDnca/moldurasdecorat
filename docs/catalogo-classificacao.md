# Etapa 1 — preparação e classificação do catálogo Decorat

## Resultado

- Perfis auditados: **114**, de `M001` a `M114`.
- Família comprovada: **114** perfis classificados como `moldura_arquitetonica_eps`.
- Aplicações comprovadas por código: **0**.
- Aplicações pendentes de validação individual: **114** perfis.
- Códigos ausentes ou duplicados: **0**.
- Referências de imagem, perfil SVG e modelo 3D ausentes: **0**.

## Fontes utilizadas

1. `src/data/catalogo.json`: fonte atual dos 114 produtos, dimensões e caminhos dos ativos.
2. `public/catalogo-decorat.pdf`: catálogo oficial disponível no projeto.
3. `C:\Users\Lubian\Dani\Downloads\Decorat_Imagens_Institucionais_e_Fotos\CATALOGO DECORAT(5).pdf`: arquivo original informado pela Decorat.

Os dois PDFs têm 8.817.827 bytes e o mesmo SHA-256:

`D92242068E71225AE97E4CA6BAC6E9B48CCB020CBB9E1ED380CFB32468CBCD4E`

## Evidência documental

O catálogo oficial apresenta os códigos e dimensões dos perfis e identifica o conjunto como molduras arquitetônicas em EPS. Também informa, de forma geral, aplicações em ambientes internos e externos e cita janelas, portas, rodapés, platibandas, beirais, colunas, pergolados, marquises, volumes, ripados e shafts.

Essas aplicações não são associadas individualmente aos códigos `M001`–`M114`. Por isso, nenhuma delas foi atribuída automaticamente a um perfil específico. A personalização conforme o projeto também é apresentada como capacidade comercial, não como família individual dos perfis.

## Estrutura adicionada aos produtos

```json
{
  "familia": "moldura_arquitetonica_eps",
  "aplicacoes": [],
  "status_classificacao": "familia_confirmada_aplicacoes_pendentes"
}
```

O campo existente `status_validacao` foi preservado, pois trata da validação já registrada no catálogo e não substitui o novo estado de classificação.

## Validação manual necessária

A planilha `docs/catalogo-classificacao-pendente.csv` contém uma linha para cada código. O campo `aplicacoes` deve permanecer vazio até existir documentação oficial que relacione o perfil à aplicação correspondente.

Vocabulário geral comprovado pelo catálogo, disponível apenas como referência para a validação da Decorat:

- Contextos: ambientes externos e ambientes internos.
- Elementos citados: janelas, portas, rodapés, platibandas, beirais, colunas, pergolados, marquises, volumes, ripados e shafts.

Nenhum desses termos foi aplicado automaticamente aos produtos.
