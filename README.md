# Stop Car Centro Automotivo — site final

Site institucional responsivo para a Stop Car Centro Automotivo, desenvolvido com HTML5, CSS3 e JavaScript puro.

## Estrutura do projeto

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

## Como abrir localmente

### Forma simples

Abra o arquivo `index.html` diretamente no navegador.

### Com servidor local

No terminal, dentro da pasta do projeto:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

Também é possível usar a extensão **Live Server** no VS Code.

## Como trocar o WhatsApp

Abra `script.js` e altere somente esta constante:

```javascript
const WHATSAPP_NUMBER = "5511950230408";
```

Use o formato `55 + DDD + número`, sem espaços, traços ou parênteses.

Os links de WhatsApp são criados dinamicamente. Não é necessário procurar vários endereços `wa.me` no HTML.

## Como alterar endereço e horários

Procure pelos textos abaixo em:

- `index.html`;
- `politica-de-privacidade.html`, quando aplicável;
- JSON-LD dentro do `<head>` de `index.html`.

Dados atuais:

- Endereço: Avenida São Paulo, 565 — Jardim Eliza — Francisco Morato/SP;
- Segunda a sexta: 8h30 às 18h;
- Sábado: 8h às 15h.

Ao mudar o endereço, altere também:

1. texto visível;
2. link de rota;
3. URL do iframe do Google Maps;
4. `streetAddress`, `addressLocality` e `addressRegion` no JSON-LD.

## Como substituir as imagens

A pasta `assets` não estava presente no ZIP recebido. Por isso, esta entrega contém fallbacks visuais temporários e profissionais.

Substitua pelos arquivos reais mantendo os nomes:

- `oficina-elevador.jpg` e `.webp`;
- `oficina-motor.jpg` e `.webp`;
- `servico-arrefecimento.jpg` e `.webp`;
- `servico-injecao.jpg` e `.webp`;
- `servico-componente.jpg` e `.webp`;
- `og-stop-car.jpg`.

Após colocar as fotos reais, revise os textos alternativos e as legendas no `index.html` para descrever exatamente cada imagem.

## Domínio oficial e SEO

O projeto não inclui URL canônica fictícia.

Depois de definir o domínio oficial:

1. adicione `<link rel="canonical" href="https://DOMINIO-OFICIAL/">`;
2. adicione `<meta property="og:url" content="https://DOMINIO-OFICIAL/">`;
3. use URLs absolutas nas imagens do JSON-LD e Open Graph;
4. crie um `sitemap.xml`;
5. adicione a linha `Sitemap:` em `robots.txt`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos mantendo `index.html` na raiz.
3. Abra **Settings > Pages**.
4. Em **Source**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde a publicação.

## Publicar no Netlify

1. Acesse o painel do Netlify.
2. Use **Add new site > Deploy manually**.
3. Arraste a pasta completa do projeto ou o ZIP.
4. Configure o domínio após a publicação.

## Publicar na Vercel

1. Importe o repositório pelo painel da Vercel.
2. Selecione **Other** como framework.
3. Não defina comando de build.
4. Mantenha a raiz do projeto como diretório de saída.

## Dependências externas

O projeto não usa frameworks nem bibliotecas JavaScript.

Serviços externos utilizados:

- WhatsApp, apenas quando o usuário abre uma conversa;
- Google Maps, no mapa incorporado e nos links externos;
- perfil público da empresa no Google, pelo link de avaliações.

## Pontos que ainda dependem da empresa

- fotografias reais da pasta `assets`;
- domínio oficial;
- eventual e-mail e redes sociais oficiais;
- revisão jurídica se houver armazenamento de dados, cookies, analytics ou pagamentos;
- validação dos serviços externos após a publicação no domínio definitivo.
