// Copia este código en tu Google Sheet:
// 1. Ve a Extensiones > Apps Script
// 2. Borra el código existente
// 3. Pega este código
// 4. Guarda como "RSVP API"
// 5. Haz clic en "Implementar" > "Nueva implementación"
// 6. Selecciona "Aplicación web"
// 7. En "Quién tiene acceso": "Cualquier persona"
// 8. Copia la URL que te dan

function doPost(e) {
  try {
    // Obtener la hoja activa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Obtener los datos del formulario
    const data = JSON.parse(e.postData.contents);
    
    // Fecha actual
    const fecha = new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    });
    
    // Agregar fila a la hoja
    sheet.appendRow([
      fecha,
      data.name || '',
      data.attendance || '',
      data.message || ''
    ]);
    
    // Responder con éxito
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Responder con error
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función opcional para probar el script
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: 'RSVP API funcionando correctamente' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
