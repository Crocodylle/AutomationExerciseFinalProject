/**
 * Script para gerar relatório consolidado Mochawesome
 * Executa após os testes rodar
 */

const { merge } = require('mochawesome-merge');
const marge = require('mochawesome-report-generator');
const fs = require('fs');
const path = require('path');

async function generateReport() {
  try {
    console.log('🔄 Generating consolidated Mochawesome report...');

    const reportDir = 'cypress/reports/mochawesome-report';

    // Mesclar todos os arquivos JSON
    const reportFiles = fs.readdirSync(reportDir)
      .filter(file => file.endsWith('.json'))
      .map(file => path.join(reportDir, file));

    if (reportFiles.length === 0) {
      console.log('⚠️  No JSON report files found');
      return;
    }

    console.log(`📊 Found ${reportFiles.length} report files`);

    // Mesclar relatórios
    const mergedReport = await merge({
      files: reportFiles,
    });

    // Salvar JSON mesclado
    const mergedJsonPath = path.join(reportDir, 'merged-report.json');
    fs.writeFileSync(mergedJsonPath, JSON.stringify(mergedReport, null, 2));

    // Gerar HTML usando marge.create
    await marge.create(mergedReport, {
      reportDir: reportDir,
      reportFilename: 'index.html',
      reportTitle: 'Automação Web - Test Execution Report',
      showPassed: true,
      inline: true,
    });

    console.log('✅ Report generated successfully!');
    console.log(`📁 Report location: ${path.resolve(reportDir)}/index.html`);
  } catch (error) {
    console.error('❌ Error generating report:', error);
    console.error('Stack:', error.stack);
    // Não falhar o processo se o relatório não for gerado
    console.log('⚠️  Continuing without consolidated report');
  }
}

// Executar ao chamar o script
if (require.main === module) {
  generateReport();
}

module.exports = generateReport;
