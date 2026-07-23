# Relatório técnico — Stop Car Centro Automotivo

## Parte 1 — Diagnóstico do projeto original

O ZIP recebido possuía somente três arquivos:

- `index.html`;
- `style.css`;
- `script.js`.

A pasta `assets`, embora referenciada no código e informada como existente na versão oficial, não estava dentro do ZIP analisado. Isso causaria falhas em logo, favicon, imagens principais, galeria, preload, Open Graph e dados estruturados.

A página `politica-de-privacidade.html` era referenciada no rodapé, mas também não estava no ZIP.

Principais pontos identificados:

1. referências locais quebradas por ausência da pasta `assets`;
2. página de privacidade ausente;
3. ausência de `404.html`, documentação e arquivo `robots.txt` no ZIP;
4. possibilidade de rolagem horizontal causada pelo menu móvel deslocado fora da tela;
5. lightbox sem navegação entre imagens;
6. validação de ano pouco restritiva;
7. navegação e foco móvel com margem para maior robustez;
8. número do WhatsApp já centralizado no JavaScript, mas com URLs fixas duplicadas no HTML original;
9. conteúdo e estrutura bons, porém com oportunidades de melhorar hierarquia, conversão, legibilidade e manutenção;
10. dependência de Google Fonts, removida para reduzir chamadas externas e melhorar privacidade e desempenho.

## Parte 2 — Melhorias realizadas

### HTML

- Estrutura semântica revisada com `header`, `nav`, `main`, `section`, `article`, `figure`, `details`, `form` e `footer`.
- Hierarquia de títulos reorganizada.
- Hero reescrito para comunicar diagnóstico, explicação e aprovação antes da execução.
- Oito serviços preservados e organizados.
- Processo ampliado para seis etapas.
- FAQ criado com perguntas respondidas apenas por informações confirmadas.
- Formulário completo com mensagens de erro próximas aos campos.
- Mapa com título, lazy loading e política de referência.
- Links externos com `target="_blank"` e `rel="noopener noreferrer"`.
- Página de privacidade criada.
- Página 404 criada.

### CSS

- Sistema de variáveis para cores, espaçamentos, sombras, raios e transições.
- Layout com Grid, Flexbox, `clamp()`, unidades relativas e `aspect-ratio`.
- Identidade automotiva em azul-marinho, vermelho, branco e cinza metálico.
- Estados de hover, foco, active e disabled.
- `overflow-x: clip` para eliminar rolagem horizontal causada pelo menu fora da tela.
- Breakpoints para celular, tablet e desktop.
- Suporte a `prefers-reduced-motion` e `forced-colors`.
- Botão flutuante adaptado para não ocupar espaço excessivo em telas pequenas.

### JavaScript

- Código isolado em IIFE para evitar variáveis globais.
- WhatsApp centralizado em uma única constante.
- Links de WhatsApp criados dinamicamente.
- Mensagens personalizadas para cada serviço.
- Menu móvel com ARIA, foco inicial, bloqueio de rolagem, backdrop, Escape e focus trap.
- Link ativo conforme a rolagem.
- Animações com Intersection Observer e respeito a movimento reduzido.
- Máscara de telefone com 10 ou 11 dígitos.
- Ano limitado a valores plausíveis.
- Validação acessível e foco no primeiro campo inválido.
- Formulário prepara a mensagem e informa corretamente que o envio ainda precisa ser confirmado.
- Lightbox com anterior, próxima, setas do teclado, Escape, contador e devolução do foco.
- Ano automático no rodapé.

### UX/UI e conversão

- Proposta de valor visível na primeira dobra.
- CTA principal para WhatsApp e CTA secundário para serviços.
- Informações de endereço e horário no hero.
- Sequência de conteúdo orientada à decisão: confiança, serviços, trabalhos, processo, avaliações, dúvidas, orçamento e localização.
- Microcopy esclarecendo que o WhatsApp apenas abre uma mensagem preparada.
- Chamadas para ação distribuídas sem excesso.

### Responsividade

Testado em:

- 320 px;
- 360 px;
- 375 px;
- 390 px;
- 414 px;
- 480 px;
- 768 px;
- 1024 px;
- 1280 px;
- 1440 px;
- 1920 px.

Em todas as larguras testadas, o `scrollWidth` ficou igual à largura da viewport.

### Acessibilidade

- Skip link.
- Foco visível.
- Labels explícitos.
- Erros com `aria-live` e `aria-invalid`.
- Menu com `aria-expanded`, `aria-controls` e rótulo dinâmico.
- Focus trap no menu móvel.
- Lightbox com `dialog`, navegação por teclado e retorno de foco.
- Áreas de toque adequadas.
- FAQ semântico com `details` e `summary`.
- Textos alternativos e dimensões explícitas nas imagens.

### SEO local

- `title` e meta description revisados.
- Open Graph completo, sem URL fictícia.
- JSON-LD `AutoRepair` com telefone, endereço e horários confirmados.
- `robots.txt` criado.
- Comentários claros para domínio canônico e sitemap futuros.
- Cidade, endereço e serviços presentes no conteúdo sem repetição artificial.

### Performance

- Remoção de Google Fonts.
- WebP e JPEG para as imagens.
- Preload somente da imagem principal.
- Lazy loading nas imagens abaixo da primeira dobra e no mapa.
- Dimensões explícitas para evitar layout shift.
- JavaScript com `defer`.
- Sem bibliotecas externas.

### Segurança e privacidade

- Links externos com proteção contra acesso ao `window.opener`.
- Sem cookies, analytics ou scripts de rastreamento.
- Formulário sem armazenamento em banco de dados.
- Política de privacidade clara.
- Aviso para não enviar dados sensíveis.

## Parte 3 — Estrutura final

```text
stop-car-centro-automotivo/
├── index.html
├── style.css
├── script.js
├── politica-de-privacidade.html
├── 404.html
├── robots.txt
├── README.md
├── RELATORIO-TECNICO.md
├── CODIGO-COMPLETO.md
└── assets/
    ├── README.md
    ├── favicon.svg
    ├── logo-stop-car.svg
    ├── og-stop-car.jpg
    ├── oficina-elevador.jpg
    ├── oficina-elevador.webp
    ├── oficina-motor.jpg
    ├── oficina-motor.webp
    ├── servico-arrefecimento.jpg
    ├── servico-arrefecimento.webp
    ├── servico-injecao.jpg
    ├── servico-injecao.webp
    ├── servico-componente.jpg
    └── servico-componente.webp
```

## Parte 4 — Código completo

O arquivo `CODIGO-COMPLETO.md` reúne o conteúdo integral de todos os arquivos de texto e SVG criados ou modificados. Os mesmos arquivos também estão disponíveis separadamente na pasta do projeto.

## Parte 5 — Projeto final

A pasta completa foi compactada em `stop-car-centro-automotivo-final.zip`.

## Parte 6 — Checklist de testes

- [x] Estrutura do ZIP original analisada.
- [x] Referências locais verificadas.
- [x] HTML parseado sem IDs duplicados.
- [x] JSON-LD validado como JSON.
- [x] CSS parseado sem erros.
- [x] JavaScript validado com `node --check`.
- [x] Links locais existentes.
- [x] Links externos com atributos seguros.
- [x] Imagens com texto alternativo e dimensões.
- [x] Nenhum `wa.me` com número duplicado no HTML.
- [x] Menu móvel aberto e fechado.
- [x] Bloqueio de rolagem ao abrir o menu.
- [x] Foco movido para o menu.
- [x] Menu fechado pela tecla Escape.
- [x] Lightbox aberto.
- [x] Navegação do lightbox pelas setas.
- [x] Lightbox fechado por Escape.
- [x] Foco devolvido ao item original.
- [x] Formulário vazio validado.
- [x] Telefone validado e formatado.
- [x] Ano validado.
- [x] Formulário preenchido testado.
- [x] URL de WhatsApp do formulário validada.
- [x] Mensagem personalizada de serviço validada.
- [x] Teste responsivo em 11 larguras.
- [x] Ausência de rolagem horizontal nas larguras testadas.
- [x] Ausência de erros no console durante os testes automatizados.
- [x] Revisão visual em desktop e celular.

## Dependências pendentes

- [ ] Substituir os fallbacks pelas fotografias reais que não vieram no ZIP.
- [ ] Inserir o domínio oficial e a URL canônica.
- [ ] Criar sitemap após definir o domínio.
- [ ] Publicar em hospedagem.
- [ ] Validar Google Maps, avaliações e WhatsApp no domínio publicado e com internet real.
- [ ] Revisar a política com profissional jurídico se o projeto passar a armazenar dados ou usar rastreamento.
