# M017 — diagnóstico e solução do protótipo

## Escopo

Este protótipo trata exclusivamente o M017. Os demais modelos, cards, modal e
tipografia do catálogo permanecem fora do processamento desta missão.

## Diagnóstico do pipeline anterior

O pipeline anterior fazia quatro coisas que explicam o resultado de “placa
cinza”:

1. identificava o contorno em um JPG rasterizado com limiar fixo;
2. preservava pequenos zigue-zagues de um pixel do raster;
3. extrudava o polígono, mas não registrava de modo explícito qual lado era o
   lado decorativo;
4. no viewer, recalculava as normais de toda a malha e colocava a câmera no
   lado `+Z`, enquanto o M017 reconstruído tem a face escalonada em `-Z`.

O GLB antigo tinha envelope `547 × 171 × 61` em unidades relativas, portanto a
extrusão longitudinal existia. O problema principal era de interpretação da
seção e apresentação: o viewer suavizava quinas arquitetônicas e enquadrava a
superfície traseira. A aparência cinza era agravada pelo material branco puro,
fundo cinza escuro e contraste de luz inadequado.

## Pesquisa e decisão técnica

| Alternativa | Decisão para M017 | Motivo |
| --- | --- | --- |
| Blender/Cycles | Não usado no protótipo | Excelente para render offline, mas não disponível no workspace e desnecessário para uma seção prismática reproduzível. |
| Geometry Nodes | Não usado | Bom para famílias paramétricas, mas adicionaria uma camada de manutenção sem melhorar a leitura deste perfil já definido. |
| FreeCAD/CadQuery/OpenCascade | Não usado | Adequado a CAD e tolerâncias mecânicas; a necessidade aqui é uma peça arquitetônica visual em GLB. |
| OpenCV + SVG + Shapely/Trimesh | Usado | Mantém o perfil técnico auditável, remove apenas ruído do raster e produz uma malha editável/reproduzível em script. |
| Three.js + GLTFLoader + OrbitControls | Usado | Carrega o mesmo GLB no navegador, permite PBR, sombras, câmera inicial comercial, rotação, zoom limitado e reset. |
| React Three Fiber/Drei | Não adicionado | O projeto já usa Three.js diretamente; manter a dependência atual reduz o bundle e preserva a integração do modal. |
| `<model-viewer>` | Não usado | Oferece uma boa base, mas o viewer existente já é Three.js e precisa de controle fino de enquadramento e material. |

A arquitetura escolhida é: **perfil SVG auditável → script mestre Python → GLB
otimizado → Three.js client component dentro do modal Next.js**. Isso separa a
fonte geométrica da apresentação e garante que render e viewer partam do mesmo
arquivo.

Referências oficiais consultadas:

- Next App Router e componentes cliente: https://nextjs.org/docs/app e https://nextjs.org/docs/app/api-reference/directives/use-client
- Three.js `WebGLRenderer`: https://threejs.org/docs/pages/WebGLRenderer.html
- Three.js `MeshStandardMaterial`: https://threejs.org/docs/pages/MeshStandardMaterial.html
- Three.js `GLTFLoader`: https://threejs.org/docs/pages/GLTFLoader.html
- Three.js `OrbitControls`: https://threejs.org/docs/pages/OrbitControls.html

## Modelo mestre

- Script: `scripts/build_m017_master.py`
- Perfil fonte: `public/catalogo/perfis/M017.svg`
- Dados auditáveis: `public/catalogo/modelos/M017_master_profile.json`
- GLB novo: `public/catalogo/modelos/M017.glb`
- Backup do GLB anterior: `public/catalogo/modelos/M017_legacy_20261008.glb`

O perfil mestre conserva envelope `61 × 171`, usa tolerância de simplificação
`1.25` somente para eliminar zigue-zagues de rasterização e extruda `547`
unidades longitudinais relativas. Não há subdivisão, bevel ou suavização que
altere degraus retos.

## Render e viewer

- Render hero transparente: `public/catalogo/produtos/M017_hero.png`
- Preview do catálogo: `public/catalogo/produtos/M017.webp`
- Comparação visual: `public/m017-comparison.html`
- Viewer: `src/components/Moldura3DViewer.tsx`

O viewer mantém as normais exportadas no GLB, usa material off-white fosco,
iluminação neutra de estúdio, câmera inicial pelo perfil final da peça, zoom
limitado, rotação com damping e botão de reset. A captura do servidor de
produção foi feita abrindo o catálogo, filtrando M017, abrindo o modal e
selecionando “3D Interativo”.

## Limites da evidência

O workspace contém a ficha de referência `public/catalogo/originais/M017.jpg`,
mas não contém o PDF técnico original usado para gerar essa ficha. Portanto a
comparação geométrica documentada é contra a ficha e o SVG presentes no
workspace; não declaro tolerância contra um PDF que não está disponível.

O build passou e o GLB carregou em navegador real. Isso comprova a integração e
a integridade básica do asset, mas a aprovação estética final continua sendo
uma decisão visual humana.
