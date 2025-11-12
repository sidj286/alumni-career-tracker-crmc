const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
    try {
        console.log('Starting PDF generation...');
        
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Load the HTML file
        const htmlPath = path.join(__dirname, 'docs', 'dataflow-diagram.html');
        await page.goto(`file://${htmlPath}`, { 
            waitUntil: 'networkidle0' 
        });
        
        // Generate PDF
        const pdfPath = path.join(__dirname, 'Alumni-Tracking-System-Dataflow.pdf');
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });
        
        await browser.close();
        
        console.log(`PDF generated successfully: ${pdfPath}`);
        return pdfPath;
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    generatePDF()
        .then(path => console.log(`PDF saved to: ${path}`))
        .catch(error => console.error('Failed to generate PDF:', error));
}

module.exports = generatePDF;