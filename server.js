require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const routes = require('./routes/index');
const localtunnel = require('localtunnel');
const chalk = require('chalk').default;

const app = express();
const port = process.env.PORT || 1000;


const theme = {
  header: chalk.hex('#00CED1').bold,
  success: chalk.hex('#7CFC00').bold,
  url: chalk.hex('#20B2AA').underline,
  local: chalk.hex('#FF69B4'),
  error: chalk.hex('#FF4500').bold,
  warning: chalk.hex('#FFD700'),
  divider: chalk.hex('#9370DB')
};


const sanitizeSubdomain = (name) => {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') 
    .replace(/[^a-z0-9-]/g, '') // 
    .substring(0, 20);
};

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use('/', routes);

async function createTunnel(attempt = 1) {
  const maxAttempts = 3;
  const baseName = 'WebMakers'; 
  const sanitizedName = sanitizeSubdomain(baseName);
  
  try {
    const tunnel = await localtunnel({
      port: port,
      subdomain: sanitizedName,
      local_host: 'localhost',
      allow_invalid_cert: true
    });

    console.log(`
${theme.divider('══════════════════════════════════════════════')}
${theme.header('     WebMakers - TÚNEL ATIVO  ')}
${theme.divider('══════════════════════════════════════════════')}
${theme.success(' Túnel Principal:')} ${theme.url(tunnel.url)}
${theme.local(' Acesso Local:    ')} ${theme.url(`http://localhost:${port}`)}
${theme.divider('══════════════════════════════════════════════')}
    `);

    tunnel.on('close', () => {
      console.log(theme.warning('\n     Conexão encerrada pelo servidor remoto'));
    });

    return tunnel;

  } catch (error) {
    if (attempt <= maxAttempts) {
      console.log(theme.warning(`\n   🔄  Tentativa ${attempt}/${maxAttempts}: Ajustando subdomínio...`));
      return createTunnel(attempt + 1);
    } else {
      console.log(theme.error('\n     Não foi possível estabelecer o túnel principal'));
      const fallbackTunnel = await localtunnel({ port });
      console.log(theme.warning('     URL Alternativa:'), theme.url(fallbackTunnel.url));
      return fallbackTunnel;
    }
  }
}

app.listen(port, '0.0.0.0', async () => {
  console.log(`
${theme.divider('════════════════════════════════════════════════')}
${theme.header('  SITE WEBMARKERS - BEM VINDO SENHOR(A) ')}
${theme.divider('═════════════════════════════════════════════════')}
  `);
  
  await createTunnel();
});