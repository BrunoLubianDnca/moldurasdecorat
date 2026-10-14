const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'public', 'catalogo', 'modelos');
const outDir = path.join(__dirname, 'public', 'catalogo', 'produtos');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
    const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.glb'));
    console.log(`Found ${files.length} GLB models to render.`);

    const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--allow-file-access-from-files'] 
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 500, height: 500, deviceScaleFactor: 2 });

    const htmlPath = path.join(__dirname, 'public', 'render_template.html');
    await page.goto(`file://${htmlPath}`);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const code = file.replace('.glb', '');
        console.log(`Rendering ${code}... (${i+1}/${files.length})`);

        await page.evaluate(async (code) => {
            document.body.innerHTML = '';
            await window.renderModel(`./catalogo/modelos/${code}.glb`);
        }, code);

        const screenshotBuffer = await page.screenshot({ type: 'webp', omitBackground: true, quality: 95 });
        fs.writeFileSync(path.join(outDir, `${code}.webp`), screenshotBuffer);
    }

    await browser.close();
    console.log('All WebP renders generated successfully!');
}

run().catch(console.error);
