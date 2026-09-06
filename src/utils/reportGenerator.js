// ============================================================
//  reportGenerator.js
//  Utility to generate a comprehensive printable Academic Report
//  with semester marks, grades, attendance, and analytics.
// ============================================================

export const downloadAcademicReport = (student) => {
  if (!student) return;

  const printWindow = window.open("", "_blank", "width=960,height=1000");
  if (!printWindow) {
    alert("Please allow popups to download and print the academic report.");
    return;
  }

  const subjects = student.subjects || [];
  const semTrends = student.semesterTrends || [];

  // Group subjects by semester
  const semGroups = {};
  subjects.forEach((sub) => {
    const sem = sub.semester || 1;
    if (!semGroups[sem]) semGroups[sem] = [];
    semGroups[sem].push(sub);
  });

  const sortedSemesters = Object.keys(semGroups).map(Number).sort((a, b) => a - b);
  const totalCredits = semTrends.reduce((sum, s) => sum + (Number(s.credits) || 0), 0) || student.totalCredits || 96;

  const semTableRows = semTrends.map((st) => `
    <tr>
      <td><strong>Semester ${st.semester}</strong></td>
      <td>${Number(st.sgpa).toFixed(2)}</td>
      <td>${Number(st.cgpa).toFixed(2)}</td>
      <td>${st.credits}</td>
      <td>${st.attendance}%</td>
      <td><span class="status-good">Satisfactory</span></td>
    </tr>
  `).join("");

  const subjectTables = sortedSemesters.map((sem) => {
    const rows = semGroups[sem].map((sub) => `
      <tr>
        <td><code>${sub.code}</code></td>
        <td><strong>${sub.name}</strong></td>
        <td>${sub.faculty}</td>
        <td>${sub.credits}</td>
        <td>${sub.marks} / 100</td>
        <td><span class="grade-pill">${sub.grade}</span></td>
        <td>${sub.attendance}%</td>
        <td>${sub.classAverage}%</td>
        <td class="${sub.status === 'Strong' ? 'status-strong' : sub.status === 'Needs Attention' ? 'status-attn' : 'status-good'}">${sub.status}</td>
      </tr>
    `).join("");

    return `
      <h4 style="font-size: 13.5px; margin: 18px 0 8px 0; color: #1e3a8a; border-left: 3px solid #3b82f6; padding-left: 8px;">
        Semester ${sem} Courses
      </h4>
      <table>
        <thead>
          <tr>
            <th style="width: 10%;">Code</th>
            <th style="width: 30%;">Subject Name</th>
            <th style="width: 18%;">Faculty</th>
            <th style="width: 6%;">Credits</th>
            <th style="width: 9%;">Marks</th>
            <th style="width: 7%;">Grade</th>
            <th style="width: 7%;">Attd.</th>
            <th style="width: 6%;">Avg</th>
            <th style="width: 7%;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }).join("");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Academic Report - ${student.name}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    body { background-color: #f8fafc; color: #1e293b; padding: 32px; font-size: 13px; }
    .report-card { max-width: 880px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.06); padding: 36px; border: 1px solid #e2e8f0; }
    .header-row { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #3b82f6; padding-bottom: 18px; margin-bottom: 20px; }
    .inst-name { font-size: 20px; font-weight: 800; color: #1e3a8a; letter-spacing: -0.5px; }
    .inst-sub { font-size: 12px; color: #64748b; margin-top: 4px; font-weight: 500; }
    .report-badge { background: #eff6ff; color: #1d4ed8; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 12px; border: 1px solid #bfdbfe; }
    
    .student-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; background: #f8fafc; padding: 16px; border-radius: 10px; margin-bottom: 24px; border: 1px solid #e2e8f0; }
    .grid-label { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600; }
    .grid-val { font-size: 13.5px; font-weight: 700; color: #0f172a; margin-top: 2px; }

    .summary-cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 26px; }
    .scard { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; text-align: center; }
    .scard-val { font-size: 20px; font-weight: 800; color: #2563eb; }
    .scard-lbl { font-size: 11px; color: #64748b; margin-top: 4px; font-weight: 600; }

    h3.section-title { font-size: 14.5px; font-weight: 700; color: #1e293b; margin: 20px 0 10px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
    
    table { width: 100%; border-collapse: collapse; margin-bottom: 18px; font-size: 12px; }
    th { background: #f1f5f9; color: #475569; font-weight: 700; text-align: left; padding: 8px 10px; border-bottom: 2px solid #cbd5e1; }
    td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; color: #334155; }
    tr:nth-child(even) { background-color: #fafbfc; }

    .grade-pill { display: inline-block; padding: 2px 7px; border-radius: 4px; font-weight: 700; font-size: 11px; background: #e0e7ff; color: #3730a3; }
    .status-strong { color: #15803d; font-weight: 700; }
    .status-attn { color: #b91c1c; font-weight: 700; }
    .status-good { color: #2563eb; font-weight: 600; }
    
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #cbd5e1; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b; }
    .print-actions { margin-bottom: 16px; text-align: right; }
    .btn { background: #2563eb; color: #ffffff; border: none; padding: 8px 18px; border-radius: 6px; font-weight: 600; cursor: pointer; }
    .btn:hover { background: #1d4ed8; }

    @media print {
      body { background: #ffffff; padding: 0; }
      .report-card { border: none; box-shadow: none; padding: 0; }
      .print-actions { display: none; }
    }
  </style>
</head>
<body>
  <div class="report-card">
    <div class="print-actions">
      <button class="btn" onclick="window.print()">Print / Save as PDF</button>
    </div>

    <div class="header-row">
      <div>
        <div class="inst-name">${student.institution || "ABC Institute of Technology"}</div>
        <div class="inst-sub">Office of the Academic Dean & Registrar &bull; Official Student Academic Dossier</div>
      </div>
      <div class="report-badge">OFFICIAL TRANSCRIPT DOSSIER</div>
    </div>

    <div class="student-grid">
      <div><span class="grid-label">Student Name</span><div class="grid-val">${student.name}</div></div>
      <div><span class="grid-label">Roll Number / ID</span><div class="grid-val">${student.id} (${student.rollNo || "N/A"})</div></div>
      <div><span class="grid-label">Degree / Branch</span><div class="grid-val">${student.program} - ${student.branch}</div></div>
      <div><span class="grid-label">Current Semester</span><div class="grid-val">Semester ${student.semester} (Batch ${student.batch})</div></div>
    </div>

    <div class="summary-cards">
      <div class="scard"><div class="scard-val">${student.currentCgpa}</div><div class="scard-lbl">Cumulative CGPA</div></div>
      <div class="scard"><div class="scard-val">${student.overallAttendance}%</div><div class="scard-lbl">Avg Attendance</div></div>
      <div class="scard"><div class="scard-val">${totalCredits}</div><div class="scard-lbl">Credits Earned</div></div>
      <div class="scard"><div class="scard-val">${student.backlogs ?? 0}</div><div class="scard-lbl">Active Backlogs</div></div>
      <div class="scard"><div class="scard-val">#${student.departmentRank || 1}</div><div class="scard-lbl">Dept Rank (${student.percentile || 80}%ile)</div></div>
    </div>

    <h3 class="section-title">Semester-wise Academic Progression</h3>
    <table>
      <thead>
        <tr>
          <th>Semester</th>
          <th>SGPA</th>
          <th>CGPA</th>
          <th>Credits</th>
          <th>Attendance</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${semTableRows}
      </tbody>
    </table>

    <h3 class="section-title">Course-wise Marks & Performance Breakdown (All Semesters)</h3>
    ${subjectTables}

    <div class="footer">
      <div>Generated on: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} &bull; InternSetu Academic Portal</div>
      <div>System Verified Electronic Report &bull; Page 1 of 1</div>
    </div>
  </div>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
};
