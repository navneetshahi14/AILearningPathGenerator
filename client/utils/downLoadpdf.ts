import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const downloadPDF = (jsonData: any[],name:string) => {
  if (!jsonData || jsonData.length === 0) {
    alert("No data to export");
    return;
  }

  // ❌ Fields to exclude from PDF
  const excludeFields = ['id', 'completedAt', '_id', '__v'];

  // ✅ Filtered headers
  const headers = Object.keys(jsonData[0])
    .filter(key => !excludeFields.includes(key))
    .map(key => key.toUpperCase());

  // ✅ Filtered row data
  const rows = jsonData.map(item =>
    headers.map(header => {
      const key = header.toLowerCase();
      const value = item[key];
      return Array.isArray(value) ? value.join(', ') : value;
    })
  );

  const doc = new jsPDF();
  doc.text('Learning Data', 14, 10);
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 20,
  });

  doc.save(`${name}-SKILLROUTE`);
};
